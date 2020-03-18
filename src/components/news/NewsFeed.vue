<template>
	<ul class="news-feed">
		<news-feed-item v-for="(post, index) in posts" :key="index" v-bind="post.data" />
	</ul>
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
}
</script>

<style lang="scss">
.news-feed {
	padding: 0 !important;
	margin: 0 !important;
	max-width: 90ch;
}
</style>
