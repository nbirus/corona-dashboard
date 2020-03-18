export default function() {
	let favicon = document.querySelector('#fav')
	if (favicon && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		favicon.href = '/favicon.dark.png'
	}
}
