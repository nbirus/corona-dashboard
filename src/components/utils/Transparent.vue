<script>
export default {
	name: 'transparent',
	functional: true,
	render(c, { slots }) {
		return slots().default
	},
}
</script>
