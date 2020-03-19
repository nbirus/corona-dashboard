<template>
	<l-map ref="map" class="map" :options="options">
		<l-geo-json :geojson="geojson" :optionsStyle="geoStyle" />
		<l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />
		<l-tile-layer
			:visible="true"
			:zIndex="999"
			url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
		/>
	</l-map>
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
			geojson: Countries,
			labelOptions: {
				zIndex: 650,
				pointerEvents: 'none',
			},
			options: {
				trackResize: false,
				zoom: 2,
			},
		}
	},
	methods: {
		geoStyle(feature) {
			let country = this.value.find(c => c.country === feature.properties.name)
			let color = '#3388ff'
			let fillColor = '#3388ff'
			let fillOpacity = 0.1

			// if (this.$h.exists(country)) {

			// }
			return {
				weight: 1,
				color,
				fillColor,
				fillOpacity,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.map {
	height: calc(100vh - 75px);

	img {
		max-height: none;
	}
}
</style>
