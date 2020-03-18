// test to verify using a `resource` works accross all levels of abstraction
// when a request is made for `resource`, these tests make sure axios is being called with the correct config

import RequestMixin from '@/mixins/RequestMixin'
import mockAxios from 'axios'
import { requestResource } from '@/services/RequestService'
import { createLocalVue } from '@vue/test-utils'
import { createTestVue } from '@/../tests/helpers/VueInstance'

let localVue = createLocalVue()
localVue.mixin(RequestMixin)
createTestVue(localVue)

// mock resources
jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))
jest.mock('axios')

// service
describe('resource:service', () => {

  beforeEach(jest.resetModules)

  it('base', () => {
    requestResource('example')
    expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })
  })

  it('with paramaters', () => {
    requestResource('example-with-params', { test: 'test' })
    expect(mockAxios).toHaveBeenCalledWith('example-with-params', { endpoint: 'example-with-params', params: { test: 'test' } })
  })
  
  it('with no auth', () => {
    requestResource('example-with-no-auth')
    expect(mockAxios).toHaveBeenCalledWith('example-with-no-auth', { endpoint: 'example-with-no-auth', headers: { authentication: false } })
  })

})