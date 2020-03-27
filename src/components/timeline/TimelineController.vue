<template>
	<div class="controller">
		<div class="controller__timeline">
			<v-slider
				:value="timelineIndex"
				:tick-labels="timelineDates"
				tick-size="3"
				@change="set"
				:min="0"
				:max="timelineDates.length - 1"
			/>
		</div>
		<div class="controller__play-pause">
			<v-btn large icon @click="toggle">
				<v-icon>mdi-{{ timelinePlaying ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'timeline-controller',
	computed: mapGetters('timeline', ['timelinePlaying', 'timelineIndex', 'timelineDates']),
	methods: mapActions('timeline', ['toggle', 'set']),
}
</script>

<style lang="scss">
.controller {
	display: flex;
	align-items: center;
	width: 100%;

	&__timeline {
		flex: 0 1 100%;
	}
	&__play-pause {
		flex: 0 0 auto;
		margin-left: 1rem;
	}
}

.controller {
	.v-slider {
		transform: translateY(0.25rem);
		&__tick-label {
			display: none;
			transform: translateY(0.5rem);
		}
	}
}
@media screen and (min-width: 1401px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:last-child,
			&:nth-child(4n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (min-width: 950px) and (max-width: 1400px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(10n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (min-width: 480px) and (max-width: 950px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(30n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (max-width: 480px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:last-child {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
</style>
