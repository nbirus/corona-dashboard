import Vue from 'vue'

import DataWrapper from '@/components/data-wrapper/DataWrapper.vue'
import StateHandler from '@/components/state/StateHandler'
import Spinner from '@/components/utils/Spinner'

Vue.component('StateHandler', StateHandler)
Vue.component('DataWrapper', DataWrapper)
Vue.component('Spinner', Spinner)

// export for testing
export default {
	DataWrapper,
	StateHandler,
	Spinner,
}
