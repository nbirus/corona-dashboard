<template>
	<li class="news-feed-item">
		<a :href="data.url" target="_blank">
			<div class="news-feed-item__thumbnail">
				<img class="news-feed-item__img" :src="data.thumbnail" />
			</div>
			<span class="news-feed-item__info">
				<span class="news-feed-item__title body-1" v-html="data.title"></span>
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

function convertUTCDateToLocalDate(date) {
	var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

	var offset = date.getTimezoneOffset() / 60
	var hours = date.getHours()

	newDate.setHours(hours - offset)

	return newDate
}
</script>

<style lang="scss" scoped>
.news-feed-item {
	display: block;
	margin: 0 0 0 -1rem;
	padding: 0.5rem 1.5rem 0.5rem 1rem;

	a {
		display: flex;
		align-items: flex-start;
		text-decoration: none !important;

		border-radius: 4px;
		transition: box-shadow 0.25s ease;
		padding: 0.5rem 1rem;

		&:hover {
			box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
			background-color: #fff;
		}
		&:active {
			box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
		}
	}

	&__thumbnail {
		position: relative;
		width: 70px;
		height: 70px;
		min-width: 70px;
		height: 70px;
		overflow: hidden;
		margin-right: 1.25rem;
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
		padding-top: 0.25rem;
	}
	&__title {
		margin-bottom: 0.25rem;
		font-weight: $bold;
		line-height: 1.3;
	}
	&__date {
	}
}
</style>
