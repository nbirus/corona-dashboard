<template>
	<li class="news-feed-item">
		<a :href="data.url" target="_blank">
			<div class="news-feed-item__thumbnail">
				<img class="news-feed-item__img" :src="data.thumbnail" />
			</div>
			<span class="news-feed-item__info">
				<span class="news-feed-item__title body-1">{{ data.title | abbreviate(90) }}</span>
				<span class="news-feed-item__date body-2 text-secondary">
					{{ data.date | date('MMMM D, YYYY') }}
				</span>
			</span>
		</a>
	</li>
</template>

<script>
export default {
	name: 'news-feed-item',
	props: ['subreddit', 'selftext', 'title', 'selftext_html', 'preview', 'url', 'created'],
	computed: {
		data() {
			let d = new Date(0)
			let images = this.$h.get(this.preview, 'images', [])
			return {
				title: this.title,
				thumbnail: this.$h.get(images, `${images.length - 1}.source.url`),
				url: this.url,
				date: d.setUTCSeconds(this.created),
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.news-feed-item {
	display: block;
	margin: 0;
	padding: 0.5rem;

	a {
		display: flex;
		align-items: flex-start;
		text-decoration: none !important;

		border-radius: 0.75rem;
		transition: box-shadow 0.25s ease;
		padding: 0.25rem 0.75rem;

		&:hover {
			box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
			background-color: #fff;
		}
		&:active {
			box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
		}
	}

	&__thumbnail {
		position: relative;
		width: 45px;
		height: 45px;
		min-width: 45px;
		height: 45px;
		overflow: hidden;
		margin-right: 1rem;
		border-radius: 0.75rem;
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
		margin-bottom: 0.2rem;
		font-weight: $bold;
		line-height: 1.3;
	}
	&__date {
	}
}
</style>
