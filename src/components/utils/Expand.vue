<template>
	<div>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'expand',
	props: {
		value: Boolean,
		width: [Number, String],
		offsetTop: [Number, String],
		paddingRight: [Number, String],
		dialogClass: String,
	},
	data() {
		return {
			el: undefined,
			rootEl: undefined,
			dialogEl: undefined,
			dialogContainerEl: undefined,
			parentEl: undefined,
			clonedEl: undefined,
			overlayEl: undefined,
			expanded: false,
		}
	},
	mounted() {
		this.el = this.$h.get(this.$slots, 'default.0.elm')
		this.parentEl = this.$el
		this.rootEl = this.$root.$el
	},
	methods: {
		toggleExpand(expand) {
			if (expand) {
				this.appendDialog()
				this.preventScroll()
				this.appendOverlay()
				this.appendClone()
				this.appendElToDialog()
			} else {
				this.removeDialog()
				this.enableScroll()
				this.removeOverlay()
				this.removeClone()
				this.appendElToParent()
			}
			this.expanded = expand
		},

		// take root element and place it inside of the dialog
		appendElToDialog() {
			this.el.classList.add('v-expand--active')
			this.dialogContainerEl.prepend(this.el)
		},
		appendElToParent() {
			this.el.classList.remove('v-expand--active')
			this.parentEl.prepend(this.el)
		},

		// add dialog to the dom
		appendDialog() {
			let { dialog, dialogContainer } = generateDialog(this.offsetTop, this.dialogClass)
			this.dialogEl = dialog
			this.dialogContainerEl = dialogContainer
			this.rootEl.prepend(this.dialogEl)
		},
		removeDialog() {
			if (this.dialogEl && this.rootEl) {
				this.rootEl.removeChild(this.dialogEl)
				this.dialogEl = undefined
				this.dialogContainerEl = undefined
			}
		},

		// clone element to fill in space
		appendClone() {
			this.clonedEl = this.el.cloneNode(true)
			this.parentEl.appendChild(this.clonedEl)
		},
		removeClone() {
			if (this.clonedEl) {
				this.parentEl.removeChild(this.clonedEl)
				this.clonedEl = undefined
			}
		},

		// append overlay element to root
		appendOverlay() {
			this.overlayEl = generateOverlay()
			this.overlayEl.addEventListener('click', () => {
				this.$emit('input', false)
			})
			this.rootEl.prepend(this.overlayEl)
		},
		removeOverlay() {
			if (this.overlayEl && this.rootEl) {
				this.rootEl.removeChild(this.overlayEl)
				this.overlayEl = undefined
			}
		},

		// page scroll
		preventScroll() {
			document.getElementsByTagName('html')[0].classList.add('no-scroll')
		},
		enableScroll() {
			document.getElementsByTagName('html')[0].classList.remove('no-scroll')
		},
	},
	watch: {
		value: 'toggleExpand',
		paddingRight(paddingRight) {
			let dialog = document.getElementById('dialog')
			if (dialog) {
				dialog.style.paddingRight = paddingRight ? `${paddingRight + 32}px` : '2rem'
			}
		},
	},
	beforeDestroy() {
		if (this.expanded) {
			this.toggleExpand(false)
		}
	},
}

function generateOverlay() {
	let overlay = document.createElement('div')
	overlay.className = 'v-overlay v-overlay--active'
	overlay.style = 'z-index: 201'

	let overlayScrim = document.createElement('div')
	overlayScrim.className = 'v-overlay__scrim v-expand-overlay pointer-events-none'
	overlayScrim.style =
		'opacity: 0.46; background-color: rgb(33, 33, 33); border-color: rgb(33, 33, 33);'
	overlay.appendChild(overlayScrim)

	return overlay
}
function generateDialog(offsetTop = 0, dialogClass = '') {
	// create dialog
	let dialog = document.createElement('div')
	dialog.className = `v-dialog__content v-dialog__content--active ${dialogClass}`
	dialog.style = `z-index: 202; padding: ${offsetTop ? `1.5rem` : '0'} 2rem;`
	dialog.role = 'document'
	dialog.id = 'dialog'
	dialog.tabIndex = 0

	// create dialog element container
	let dialogContainer = document.createElement('div')
	dialogContainer.className = 'v-dialog v-dialog--active'
	dialogContainer.style = `
    margin: 0%; 
    width: 100%; 
    height: ${offsetTop ? `calc(100% - ${offsetTop}px)` : '100%'};
    transform: translateY(${offsetTop / 2}px);
  `
	dialog.appendChild(dialogContainer)

	return { dialog, dialogContainer }
}
</script>

<style lang="scss">
.v-application .v-expand--active {
	margin-top: 0 !important;
}
.pointer-events-none {
	pointer-events: none;
}
.v-expand-overlay {
	animation: overlay 0.5s ease;
}
.v-dialog__content {
	transition: padding 0.45s cubic-bezier(0.78, 0.02, 0.33, 1);
}
@keyframes overlay {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0.46;
	}
}
.v-dialog--active {
	transition: none;
}
</style>
