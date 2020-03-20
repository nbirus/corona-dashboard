// import chroma from 'chroma-js'

// spawn web worker to format data coming into the chart
export function formatChartData(data, type) {
	return new Promise(resolve => {
		const chartWorker = new Worker('../workers/chart.js', { type: 'module' })
		chartWorker.postMessage({ data, type })
		chartWorker.onmessage = e => resolve(e.data)
	})
}

// default options for all charts
export const defaults = {
	textStyle(type = 'default') {
		switch (type) {
			case 'title': {
				return {
					lineHeight: 14,
					fontSize: 20,
				}
			}
			case 'subtitle': {
				return {
					lineHeight: 10,
					fontSize: 14,
				}
			}
			case 'default': {
				return {
					fontSize: 16,
				}
			}
		}
	},
}

// extra chart colors
export const chartColors = {
	ytb: {
		from: 'aqua',
		to: 'orange',
	},
	ytp: {
		from: 'yellow',
		to: 'purple',
	},
	atb: {
		from: 'aqua',
		to: 'blue',
	},
	btr: {
		from: 'blue',
		to: 'red',
	},
}

const colors = []

// generate color step range
export function getColors(colorName, numberOfSteps) {
	let colorScale = !Object.keys(chartColors).includes(colorName)
		? getDefaultColors(colorName, numberOfSteps)
		: getSpecialColors(colorName, numberOfSteps)

	return colorScale.colors(numberOfSteps)
}
function getDefaultColors(colorName, numberOfSteps) {
	let color = colors[colorName].base
	let colorLight = colors[colorName].lighten3
	let colorDark = colors[colorName].darken3

	if (numberOfSteps < 5) {
		colorLight = colors[colorName].lighten1
		colorDark = colors[colorName].darken1
	} else if (numberOfSteps < 10) {
		colorLight = colors[colorName].lighten2
		colorDark = colors[colorName].darken2
	}

	// return chroma.scale([colorLight, color, colorDark])
}
function getSpecialColors(colorName) {
	// return chroma.scale([chartColors[colorName].from, chartColors[colorName].to])
}
