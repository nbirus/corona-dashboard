<template>
	<div class="world-map">
		<l-map ref="map" class="world-map__map" :options="options">
			<l-geo-json
				v-if="$h.exists(countryGeojson)"
				ref="geo"
				:geojson="countryGeojson"
				:optionsStyle="geoStyle"
				:options="geoOptions"
			/>
			<l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />
			<l-tile-layer
				:visible="true"
				:zIndex="999"
				url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
			/>
		</l-map>
		<v-card class="world-map__legend" :style="hoverStyle" v-if="$h.exists(hoverCountry)">
			<h4 v-text="hoverCountry.name"></h4>
			<span class="body-2 mr-1">{{ $h.get(hoverCountry, 'totals.confirmed') | localeString }}</span>
		</v-card>
	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
import Countries from '@/assets/Countries.json'

export default {
	name: 'world-map',
	components: { LMap, LTileLayer, LGeoJson },
	props: ['value'],
	data() {
		return {
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
			options: {
				trackResize: false,
				zoom: 2,
			},
			hoverCountry: {},
			hoverStyle: {
				top: 0,
				left: 0,
			},
		}
	},
	computed: {
		countryGeojson() {
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
			let color = ''
			let fillColor = ''
			let fillOpacity = 0.4
			fillColor = getColor(this.$h.get(feature, 'properties.totals.confirmed', 0))
			return {
				weight: 1,
				color,
				fillColor,
				fillOpacity,
			}
		},

		// map events
		highlightFeature(e) {
			let country = e.target
			country.setStyle({
				fillOpacity: 0.75,
			})
			this.hoverCountry = country.feature.properties
		},
		resetHighlight(e) {
			e.target.setStyle({
				fillOpacity: 0.4,
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

function getColor(d = 0) {
	if (d === 0) {
		return ''
	}

	return d > 300000
		? '#800026'
		: d > 300000
		? '#BD0026'
		: d > 50000
		? '#E31A1C'
		: d > 1000
		? '#FC4E2A'
		: d > 500
		? '#FD8D3C'
		: d > 100
		? '#FEB24C'
		: d > 0
		? '#FED976'
		: '#FFEDA0'
}
</script>

<style lang="scss" scoped>
.world-map {
	position: relative;

	&__map {
		height: 500px;

		img {
			max-height: none;
		}
	}
	&__legend {
		position: fixed;
		width: auto;
		height: auto;
		z-index: 999;
		pointer-events: none;
		padding: 0.75rem;
	}
}
</style>
