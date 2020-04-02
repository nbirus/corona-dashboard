<template>
	<div class="spread-country-map">
		<l-map ref="map" class="spread-country-map__map" :options="options">
			<!-- world map -->
			<l-tile-layer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png" />

			<!-- overlay -->
			<!-- <l-geo-json
				v-if="$h.exists(countryGeojson)"
				ref="geo"
				:geojson="countryGeojson"
				:optionsStyle="geoStyle"
				:options="geoOptions"
				:key="`${dDateIndex}-${type}`"
			/>-->

			<l-marker
				v-for="(marker, i) in markers"
				:key="i"
				:name="marker.name"
				:attribution="marker.attribution"
				:options="marker.options"
				:lat-lng="marker.latLng"
				@mouseenter="mouseEnter"
				@mouseleave="mouseLeave"
			/>
		</l-map>

		<!-- popover -->
		<v-card class="spread-country-map__popover" :style="hoverStyle" v-if="$h.exists(hoverProps)">
			<span class="body-2" v-text="hoverProps.name"></span>
			&nbsp;
			<strong :key="`${type}`" class="bold">{{
				$h.get(hoverProps, `totals.${type}`, 0) | localeString
			}}</strong>
		</v-card>
	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LGeoJson, LMarker } from 'vue2-leaflet'
import Countries from '@/assets/Countries.json'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})
export default {
	name: 'spread-country-map',
	components: { LMap, LTileLayer, LGeoJson, LMarker },
	props: {
		value: Object,
		loading: Boolean,
		type: {
			type: String,
			default: 'cases',
		},
	},
	data() {
		return {
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
			hoverStyle: {
				top: 0,
				left: 0,
			},
			hoverProps: {},
		}
	},
	computed: {
		key() {
			return this.$store.getters['data/key']
		},
		markers() {
			if (!this.$h.exists(this.value)) {
				return []
			}
			return Object.values(this.value)
				.filter(country => {
					return this.$h.get(country, 'coordinates.latitude') !== '0.0'
				})
				.map(country => {
					return {
						latLng: [
							this.$h.get(country, 'coordinates.latitude'),
							this.$h.get(country, 'coordinates.longitude'),
						],
						options: {
							name: country.province,
							totals: country.stats,
						},
					}
				})
		},
	},
	methods: {
		setBounds() {
			this.$nextTick(() => {
				this.$refs.map.mapObject.fitBounds(this.markers.map(marker => marker.latLng))
			})
		},
		geoStyle(feature) {
			let fillColor = getColor(
				this.$h.get(feature, `properties.timeline.${this.type}`, 0),
				this.type
			)
			return {
				color: '#fff',
				weight: 1,
				fillOpacity: 0.9,
				fillColor,
			}
		},
		mouseEnter(e) {
			this.hoverStyle.left = `${e.originalEvent.x + 16}px`
			this.hoverStyle.top = `${e.originalEvent.y + 16}px`
			let totals = this.$h.get(e, 'target.options.totals', {})
			this.hoverProps = {
				totals,
				name: this.$h.get(e, 'target.options.name', 'Other'),
			}
		},
		mouseLeave() {
			this.hoverProps = {}
		},
	},
	watch: {
		loading: {
			handler(loading) {
				if (!loading) {
					this.setBounds()
				}
			},
			immediate: true,
		},
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
.spread-country-map {
	&__map {
		height: 725px;
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
