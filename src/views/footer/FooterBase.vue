<template>
	<v-footer class="footerContainer-lg" :class="{ sidebar: $route.name !== 'login' }">
		<div class="limited-width-lg">
			<div class="row d-flex">
				<div class="v-card v-sheet v-sheet--tile pa-3 mr-auto elevation-0">
					<span class="footer-text-badc-lg">
						Biomedical Applications Development Center
						<br />
						<span class="footer-text-badc-reg">at the National Cancer Institute</span>
					</span>
				</div>
				<div class="v-card v-sheet v-sheet--tile pa-3 footerPolicies elevation-0">
					<h5 class="footerHeading">Policies</h5>
					<ul class="footer-list" id="Policies">
						<li>
							<a href="https://www.cancer.gov/policies/accessibility" target="_blank"
								>Accessibility</a
							>
						</li>
						<li>
							<a href="https://www.cancer.gov/policies/disclaimer" target="_blank">Disclaimer</a>
						</li>
						<li>
							<a href="https://www.cancer.gov/policies/foia" target="_blank">FOIA</a>
						</li>
						<li>
							<a href="https://www.cancer.gov/policies/privacy-security" target="_blank"
								>Privacy & Security</a
							>
						</li>
					</ul>
				</div>
				<div class="v-card v-sheet v-sheet--tile pa-3 elevation-0">
					<h5 class="footerHeading">Help and Support</h5>
					<ul class="footer-list" id="Help&Support">
						<li>
							<a href="mailto:ctrp_support@mail.nih.gov">ctrp_support@mail.nih.gov</a>
						</li>
						<li class="buildInfo mb-1">
							<span>LAST BUILD</span>
						</li>
						<li>
							<v-chip class="px-2" color="grey lighten-3" small label>
								<span class="body-2 text-secondary">{{ buildTime }}</span>
							</v-chip>
						</li>
						<li>
							<a href="#" @click.prevent="$router.push('/doc')" target="_blank"
								>API Build Details</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="row footerAgencies mt-3">
				<div class="v-card v-sheet v-sheet--tile pa-3 elevation-0">
					<h5 class="footerHeading d-none">Agencies</h5>
					<ul class="footer-list list-horizontal" id="Agencies">
						<li>
							<a href="https://www.hhs.gov/" target="_blank"
								>U.S. Department of Health and Human Services</a
							>
						</li>
						&nbsp;&nbsp; | &nbsp;&nbsp;
						<li>
							<a href="https://www.nih.gov/" target="_blank">National Institutes of Health</a>
						</li>
						&nbsp;&nbsp; | &nbsp;&nbsp;
						<li>
							<a href="https://www.cancer.gov/" target="_blank">National Cancer Institute</a>
						</li>
						&nbsp;&nbsp; | &nbsp;&nbsp;
						<li>
							<a href="https://www.usa.gov/" target="_blank">USA.gov</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</v-footer>
</template>

<script>
export default {
	name: 'footer-base',
	data() {
		return {
			buildTime: '',
		}
	},
	mounted() {
		this.buildTime = process.env.VUE_APP_BUILD_TIME
	},
}
</script>

<style scoped lang="scss">
.limited-width-lg {
	width: 100%;
}
.footerContainer-lg {
	padding: 18px 50px;
	background: #f5f5f5;
	border-top: 1px solid #bfc1c4;

	&.sidebar {
		margin-left: 4rem;
	}
}
.footerContainer-lg .footer-text-badc-lg {
	font-size: 18px;
	font-weight: bold;
}
.footerContainer-lg .footer-text-badc-lg .footer-text-badc-reg {
	font-weight: normal;
	font-size: 16px;
}
.footerContainer-lg h5.footerHeading {
	text-transform: uppercase;
	margin: 0;
	font-size: 14px;
	font-weight: normal;
}
.footerContainer-lg .footer-list {
	list-style: none;
	padding-left: 0;
	margin-top: 6px;
	font-size: 14px;
}
.footerContainer-lg .footer-list li {
	padding-bottom: 6px;
}
.footerContainer-lg .footer-list li.buildInfo {
	padding-top: 18px;
}
.footerContainer-lg .footer-list.list-horizontal {
	margin-top: 6px;
}
.footerContainer-lg .footer-list.list-horizontal li {
	display: inline-block;
}
.footerContainer-lg .footerPolicies {
	margin-right: 6rem;
}
.footerContainer-lg .footerAgencies .v-card {
	margin: 0 auto;
	padding-top: 0 !important;
}
</style>
