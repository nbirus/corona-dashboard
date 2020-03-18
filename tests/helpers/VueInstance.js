import * as Filters from '@/services/FilterService'
import Helpers from '@/helpers'
import GlobalComponents from '@/global'

export function createTestVue(localVue) {

  // global
  for (const component in GlobalComponents) {
    localVue.component(component, GlobalComponents[component])
  }

  // filters
  for (const filter in Filters) {
    localVue.filter(filter, Filters[filter])
  }
  
  // helpers
  localVue.use({ install() { localVue.prototype.$h = Helpers } })
  

  // disable logging
  localVue.config.logModifiedComponents = () => {}
  
}
