import { createTestVue } from '@/../tests/helpers/VueInstance'
import { createLocalVue } from '@vue/test-utils'

export default function () {
  let localVue = createLocalVue()
  createTestVue(localVue)
  return localVue
}