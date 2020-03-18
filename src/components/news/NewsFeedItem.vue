<template>
	<li class="news-feed-item">
		<a :href="data.url">
			<div class="news-feed-item__thumbnail">
				<img class="news-feed-item__img" :src="data.thumbnail" />
			</div>
			<span class="news-feed-item__info">
				<span class="news-feed-item__title body-1" v-html="data.title"></span>
				<span class="news-feed-item__date body-2 text-secondary">{{ data.date | date }}</span>
			</span>
		</a>
	</li>
</template>

<script>
export default {
	name: 'news-feed-item',
	inheritAttrs: false,
	props: ['subreddit', 'selftext', 'title', 'selftext_html', 'preview', 'url', 'created_utc'],
	computed: {
		data() {
			let images = this.$h.get(this.preview, 'images', [])
			return {
				title: this.title,
				thumbnail: this.$h.get(images, `${images.length - 1}.source.url`),
				url: this.url,
				date: this.created_utc,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.news-feed-item {
	display: block;
	padding: 0;
	margin: 0 0 0.5rem -1rem;

	a {
		display: flex;
		align-items: flex-start;
		text-decoration: none !important;
		padding: 1rem;
		border-radius: 4px;
		transition: box-shadow 0.25s ease;

		&:hover {
			box-shadow: 0 2px 6px fade-out(black, 0.75);
		}
		&:active {
			box-shadow: 0 1px 4px fade-out(black, 0.85);
		}
	}

	&__thumbnail {
		position: relative;
		width: 80px;
		height: 80px;
		min-width: 80px;
		height: 80px;
		overflow: hidden;
		margin-right: 1.5rem;
		border-radius: 3px;
		border: solid thin fade-out(black, 0.9);
		background-color: fade-out(black, 0.95);
	}
	&__img {
		position: absolute;
		left: 50%;
		top: 50%;
		height: 100%;
		width: auto;
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
	&__info {
		display: flex;
		flex-direction: column;
	}
	&__title {
		margin-bottom: 0.35rem;
	}
	&__date {
	}
}
</style>
