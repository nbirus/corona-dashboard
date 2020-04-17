<template>
	<div class="spread-map">
		<l-map ref="map" class="spread-map__map" :options="options" :center="[20, 16]">
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
				:key="`${dDateIndex}-${type}`"
			/>
		</l-map>

		<!-- popover -->
		<v-card class="spread-map__popover" :style="hoverStyle" v-if="$h.exists(hoverCountry)">
			<span class="body-2" v-text="hoverCountry.name"></span>
			&nbsp;
			<strong :key="`${dDateIndex}-${type}`" class="bold">
				{{ $h.get(hoverCountry, `timeline.${type}.${dDateIndex}`, 0) | localeString }}
			</strong>
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
		dateIndex: Number,
		loading: Boolean,
		type: {
			type: String,
			default: 'cases',
		},
	},
	data() {
		return {
			dDateIndex: this.dateIndex,
			options: {
				trackResize: true,
				zoom: 1.15,
				maxZoom: 5,
				minZoom: 2,
				maxBounds: [
					[120, -250],
					[-80, 250],
				],
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
			if (this.loading) {
				return {}
			}
			return {
				type: 'FeatureCollection',
				features: Countries.features.map(feature => {
					let country = this.value[feature.code]
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
				this.$h.get(feature, `properties.timeline.${this.type}.${this.dDateIndex}`, 0),
				this.type
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
			this.hoverCountry = country.feature.properties
			// country.setStyle({
			// 	fillOpacity: 1,
			// })
		},
		resetHighlight(e) {
			// e.target.setStyle({
			// 	fillOpacity: 0.9,
			// })
			this.hoverCountry = {}
		},
		zoomToFeature(e) {
			this.$store.dispatch('data/setKey', e.target.feature.code)
		},
		setBox(e) {
			this.hoverStyle.left = `${e.originalEvent.x + 16}px`
			this.hoverStyle.top = `${e.originalEvent.y + 16}px`
		},
		setIndex(index) {
			this.dDateIndex = index
		},
	},
	watch: {
		dateIndex: 'setIndex',
	},
}

let colors = {
	cases: [
		'rgba(25, 118, 210, 0.05)',
		'rgba(25, 118, 210, 0.15)',
		'rgba(25, 118, 210, 0.2)',
		'rgba(25, 118, 210, 0.3)',
		'rgba(25, 118, 210, 0.4)',
		'rgba(25, 118, 210, 0.5)',
		'rgba(25, 118, 210, 0.6)',
		'rgba(25, 118, 210, 0.7)',
		'rgba(25, 118, 210, 0.8)',
		'rgba(25, 118, 210, 0.9)',
		'rgba(25, 118, 210, 1)',
		'#4f79bf',
		'#476db4',
		'#3f61a8',
		'#37559d',
		'#2e4a92',
		'#253e87',
		'#1b337c',
		'#0f2872',
		'#001e67',
	],
	deaths: [
		'rgba(0,0,0,0)',
		'rgba(244, 67, 53, 0.1)',
		'rgba(244, 67, 53, 0.2)',
		'rgba(244, 67, 53, 0.3)',
		'rgba(244, 67, 53, 0.4)',
		'rgba(244, 67, 53, 0.5)',
		'rgba(244, 67, 53, 0.6)',
		'rgba(244, 67, 53, 0.7)',
		'rgba(244, 67, 53, 0.8)',
		'rgba(244, 67, 53, 0.9)',
		'rgba(244, 67, 53, 1)',
		'#ff5252',
		'#ee4948',
		'#de3f3d',
		'#ce3633',
		'#be2c29',
		'#ae2320',
		'#9e1916',
		'#8f0d0c',
		'#800000',
	],
}
let scale = [
	1,
	10,
	25,
	50,
	100,
	500,
	750,
	1000,
	1250,
	1500,
	2000,
	5000,
	7500,
	10000,
	25000,
	50000,
	75000,
	80000,
	100000,
]
function getColor(d = 0, type) {
	let color = ''
	scale.forEach((scaleValue, i) => {
		if (scaleValue <= d) {
			color = colors[type][i]
		}
	})
	return color
}
</script>

<style lang="scss" scoped>
.spread-map {
	&__map {
		height: 650px;
	}
	&__popover {
		position: fixed;
		width: auto;
		height: auto;
		z-index: 999;
		pointer-events: none;
		padding: 0.25rem 0.5rem;
		background-color: fade-out(black, 0.2);
		color: white;
	}
}
</style>
