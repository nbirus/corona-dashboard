<template>
	<div class="spread-map">
		<l-map ref="map" class="spread-map__map" :options="options">
			<!-- world map -->
			<l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />
			<!-- <l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" /> -->

			<!-- overlay -->
			<l-geo-json
				v-if="$h.exists(countryGeojson)"
				ref="geo"
				:geojson="countryGeojson"
				:optionsStyle="geoStyle"
				:options="geoOptions"
			/>
		</l-map>

		<!-- popover -->
		<v-card class="spread-map__popover" :style="hoverStyle" v-if="$h.exists(hoverCountry)">
			<h4 v-text="hoverCountry.name"></h4>
			<span class="body-2 mr-1">{{ $h.get(hoverCountry, 'cases', 0) | localeString }}</span>
		</v-card>
	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
import Countries from '@/assets/Countries.json'

export default {
	name: 'spread-map',
	components: { LMap, LTileLayer, LGeoJson },
	props: {
		value: Object,
		by: {
			type: String,
			default: 'cases',
		},
	},
	data() {
		return {
			options: {
				trackResize: false,
				zoom: 2,
			},
			labelOptions: {
				zIndex: 650,
				pointerEvents: 'none',
			},
			geoOptions: {
				onEachFeature: (feature, layer) => {
					layer.on({
						mouseover: this.highlightFeature,
						mouseout: this.resetHighlight,
						mousemove: this.setBox,
						click: this.zoomToFeature,
					})
				},
			},
			hoverStyle: {
				top: 0,
				left: 0,
			},
			hoverCountry: {},
		}
	},
	computed: {
		countryGeojson() {
			return {
				type: 'FeatureCollection',
				features: Countries.features.map(feature => {
					let country = this.value.list[feature.properties.name]
					if (country !== undefined) {
						feature.properties = {
							...country,
							...feature.properties,
						}
					}
					return feature
				}),
			}
		},
	},
	methods: {
		// style country overlay
		geoStyle(feature) {
			let fillColor = getColor(
				this.$h.get(feature, `properties.${this.by}`, 0),
				this.$h.get(this.value, `max.${this.by}`)
			)

			return {
				color: '#fff',
				weight: 1,
				fillOpacity: 0.9,
				fillColor,
			}
		},

		// map events
		highlightFeature(e) {
			let country = e.target
			country.setStyle({
				fillOpacity: 1,
			})
			this.hoverCountry = country.feature.properties
		},
		resetHighlight(e) {
			e.target.setStyle({
				fillOpacity: 0.9,
			})
			this.hoverCountry = {}
		},
		zoomToFeature(e) {
			this.$refs.map.mapObject.fitBounds(e.target.getBounds())
		},
		setBox(e) {
			this.hoverStyle.left = `${e.originalEvent.x + 16}px`
			this.hoverStyle.top = `${e.originalEvent.y + 16}px`
		},
	},
}

let colors = [
	'rgba(0,0,0,0)',
	'#8ac5ff',
	'#7cb7f7',
	'#6fa9ee',
	'#629be4',
	'#558eda',
	'#4981cf',
	'#3e74c3',
	'#3367b7',
	'#295aab',
	'#204d9e',
	'#164190',
	'#0e3583',
	'#052a75',
	'#001e67',
]
let scale = [0, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000, 25000, 50000, 75000, 100000]
function getColor(d = 0) {
	if (d <= scale[0]) {
		return colors[0]
	} else if (d <= scale[1]) {
		return colors[1]
	} else if (d <= scale[2]) {
		return colors[2]
	} else if (d <= scale[3]) {
		return colors[3]
	} else if (d <= scale[4]) {
		return colors[4]
	} else if (d <= scale[5]) {
		return colors[5]
	} else if (d <= scale[6]) {
		return colors[6]
	} else if (d <= scale[7]) {
		return colors[7]
	} else if (d <= scale[8]) {
		return colors[8]
	} else if (d <= scale[9]) {
		return colors[9]
	} else if (d <= scale[10]) {
		return colors[10]
	} else if (d <= scale[11]) {
		return colors[11]
	} else if (d <= scale[12]) {
		return colors[12]
	} else if (d <= scale[13]) {
		return colors[13]
	} else if (d <= scale[14]) {
		return colors[14]
	} else if (d <= scale[15]) {
		return colors[15]
	}
}
</script>

<style lang="scss" scoped>
.spread-map {
	&__map {
		height: 500px;
	}
	&__popover {
		position: fixed;
		width: auto;
		height: auto;
		z-index: 999;
		pointer-events: none;
		padding: 0.75rem;
	}
}
</style>