<template>
	<data-wrapper resource="news" :params="params" persist-data v-slot="{ _state }">
		<div class="page page-news">
			<news-feed v-bind="{ _state }" :posts="_state.data" />
		</div>
	</data-wrapper>
</template>

<script>
import NewsFeed from '@/components/news/NewsFeed'
export default {
	name: 'news-page',
	components: { NewsFeed },
	data() {
		return {
			params: {
				size: 10,
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.news-dashboard {
}
</style>
