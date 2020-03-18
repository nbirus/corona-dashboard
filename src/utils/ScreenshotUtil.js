let getPackage = () => import('html2canvas')

export default function(el, options) {
	return new Promise(async (resolve, reject) => {
		try {
			// get canvas package
			let html2canvas = (await getPackage()).default
			let canvasOptions = {}

			html2canvas(el, canvasOptions).then(canvas => {
				downloadCanvas(canvas, options)
				resolve()
			})
		} catch (e) {
			reject(e)
		}
	})
}

function downloadCanvas(canvas, options) {
	var link = document.getElementById('screenshot-link')
	link.setAttribute('download', `${options.filename}.png`)
	link.setAttribute(
		'href',
		canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
	)
	link.click()
}
