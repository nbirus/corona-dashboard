import store from '@/store'

/**
 * Download a json object
 * @param {object} exportObj
 * @param {string} exportName
 */
export function downloadObjectAsJson(exportObj, exportName) {
	let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
	let downloadAnchorNode = document.createElement('a')
	downloadAnchorNode.setAttribute('href', dataStr)
	downloadAnchorNode.setAttribute('download', exportName + '.json')
	document.body.appendChild(downloadAnchorNode) // required for firefox
	downloadAnchorNode.click()
	downloadAnchorNode.remove()

	// set snackbar
	store.dispatch('snackbar/open', {
		message: `"<b>${exportName}</b>" was downloaded successfully!`,
	})
}
