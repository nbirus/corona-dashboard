<script>
export default {
	name: 'default-wrapper',
	functional: true,
	render: (c, { slots }) => slots().default,
}
</script>
