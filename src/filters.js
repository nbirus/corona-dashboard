import Vue from 'vue'
import * as Filters from '@/services/FilterService'

for (const filter in Filters) {
	Vue.filter(filter, Filters[filter])
}
