// test to verify using a `resource` works accross all levels of abstraction
// when a request is made for `resource`, these tests make sure axios is being called with the correct config

import Vue from 'vue';
import RequestMixin from '@/mixins/RequestMixin'
import mockAxios from 'axios'
import waitForExpect from 'wait-for-expect'
import { mount, createLocalVue } from '@vue/test-utils'
import { createTestVue } from '@/../tests/helpers/VueInstance'

let localVue = createLocalVue()
localVue.mixin(RequestMixin)
createTestVue(localVue)

// mock resources
jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))
jest.mock('axios')

// base test component
const Test = Vue.component('Test', {
  name: 'Test',
  template: `<div></div>`
});

// mixin
describe('resource:mixin', () => {

  beforeEach(jest.resetModules)

  it('base', async () => {
    const wrapper = mount(Test, { localVue })
    wrapper.vm.$requestResource('example')
    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })
    })
  })

  it('with paramaters', async () => {
    const wrapper = mount(Test, { localVue })
    wrapper.vm.$requestResource('example-with-params', { test: 1 })
    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example-with-params', { endpoint: 'example-with-params', params: { test: 1 } })
    })
  })

  it('with no auth', async () => {
    const wrapper = mount(Test, { localVue })
    wrapper.vm.$requestResource('example-with-no-auth')
    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example-with-no-auth', { endpoint: 'example-with-no-auth', headers: { authentication: false } })
    })
  })

})
