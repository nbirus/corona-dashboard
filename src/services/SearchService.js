export function search(data, params) {
	return new Promise(resolve => {
		const searchWorker = new Worker('../workers/search.js', {
			type: 'module',
		})
		searchWorker.postMessage({
			data,
			params,
		})
		searchWorker.onmessage = e => {
			resolve(e.data)
			searchWorker.terminate()
		}
	})
}

export function sort(data, params) {
	return new Promise(resolve => {
		const sortWorker = new Worker('../workers/sort.js', {
			type: 'module',
		})
		sortWorker.postMessage({
			data,
			params,
		})
		sortWorker.onmessage = e => {
			resolve(e.data)
			sortWorker.terminate()
		}
	})
}

export function paginate(data, params) {
	return new Promise(resolve => {
		const paginateWorker = new Worker('../workers/paginate.js', {
			type: 'module',
		})
		paginateWorker.postMessage({
			data,
			params,
		})
		paginateWorker.onmessage = e => {
			resolve(e.data)
			paginateWorker.terminate()
		}
	})
}
