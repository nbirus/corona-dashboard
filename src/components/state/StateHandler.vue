<script>
import DefaultLoading from './Loading'
import DefaultError from './Error'
import { exists } from '@/services/UtilsService'

export default {
	name: 'state-handler',
	functional: true,
	inheritAttrs: false,
	props: {
		data: [Object, Array, String, Number],
		loading: Boolean,
		error: [String, Error, Object],
		refresh: Function,
		ignoreLoading: Boolean,
		ignoreError: Boolean,
		keepAlive: Boolean,
		noTransition: Boolean,
		transition: {
			type: String,
			default: 'fade',
		},
	},
	render(createElement, { props, slots, listeners }) {
		// call listeners
		if (listeners.hasOwnProperty('change')) {
			listeners.change()
		}

		let child = slots().default

		// loading
		if (!props.ignoreLoading && !(props.keepAlive && exists(props.data)) && props.loading) {
			child = slots().loading || createElement(DefaultLoading, { props: { key: 'loading' } })
		}
		// error
		else if (!props.ignoreError && exists(props.error)) {
			child =
				slots().error ||
				createElement(DefaultError, {
					props: { key: 'error', error: props.error, refresh: props.refresh },
				})
		}

		return createElement(
			'transition',
			{
				props: {
					name: props.noTransition ? '' : props.transition,
					appear: !props.noTransition,
					mode: 'out-in',
				},
			},
			[child]
		)
	},
}
</script>

// ignore-coverage
