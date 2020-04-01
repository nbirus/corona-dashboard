<template>
	<div class="news-feed-container">
		<data-wrapper resource="news" :params="params" v-slot="{ _state }">
			<state-handler v-bind="_state">
				<ul class="news-feed">
					<news-feed-item v-for="(post, index) in _state.data" :key="index" v-bind="post.data" />
				</ul>
			</state-handler>
		</data-wrapper>
	</div>
</template>

<script>
import NewsFeedItem from '@/components/news/NewsFeedItem'

export default {
	name: 'news-feed',
	components: { NewsFeedItem },
	props: {
		loading: Boolean,
		posts: Array,
	},
	data() {
		return {
			params: {
				size: 10,
			},
		}
	},
}
</script>

<style lang="scss">
.news-feed-container {
	min-height: 300px;
	position: relative;

	padding: 0.5rem 0;
}
.news-feed {
	padding: 0 !important;
	margin: 0 !important;
}
</style>
