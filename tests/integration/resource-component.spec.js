// test to verify using a `resource` works accross all levels of abstraction
// when a request is made for `resource`, these tests make sure axios is being called with the correct config

import RequestMixin from '@/mixins/RequestMixin'
import DataWrapper from '@/components/data-wrapper/DataWrapper'
import mockAxios from 'axios'
import waitForExpect from 'wait-for-expect'
import { mount, createLocalVue } from '@vue/test-utils'
import { createTestVue } from '@/../tests/helpers/VueInstance'
import Vuex from 'vuex'
import MockStore from '@/../tests/helpers/MockStore'

import StateHandler from '@/components/state/StateHandler'

let localVue = createLocalVue()
localVue.mixin(RequestMixin)
localVue.use(Vuex)
createTestVue(localVue)


// mock resources
jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))

describe('resource-component', () => {
  let store
  
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    store = new Vuex.Store(MockStore())
  })
  afterEach(() => { 
    mockAxios.reset() 
  })

  // component
  it('base', async () => {
    mount(DataWrapper, { localVue,
      mocks: {
        $store: store
      },
      propsData: {
        resource: 'example',
      }
    })

    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })
    })
  })

  it('reactive', async () => {
    let wrapper = mount(DataWrapper, { localVue,
      mocks: {
        $store: store
      },
      propsData: {
        resource: 'fake'
      } 
    })

    // check for reactivity
    wrapper.setProps({
      resource: 'example'
    })

    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })  
    })
  })

  it('base failure', async () => {

    mockAxios.mockImplementationOnce(() => 
      Promise.reject(new Error())
    )

    let wrapper = mount(DataWrapper, { localVue, 
      mocks: {
        $store: store
      },
      propsData: {
        resource: 'example'
      }
    })

    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })  
      expect(wrapper.vm.$state.error).toBeTruthy()
      expect(wrapper.vm.$state.data).not.toBeTruthy()
      expect(wrapper.vm.$state.loading).not.toBeTruthy()
    })

  })

  it('with paramaters', async () => {
    
    mount(DataWrapper, { localVue, 
      mocks: {
        $store: store
      },
      propsData: {
        resource: 'example-with-params',
        params: {
          test: 'test',
        }
      }
    })

    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example-with-params', { endpoint: 'example-with-params', params: { test: 'test' }})
    })

  })

  // component with state-handler
  it('success', async () => {

    // mock response
    mockAxios.mockImplementationOnce(() => Promise.resolve({ data: { data: 'response' } }))

    let wrapper = mount(DataWrapper, { localVue,
      mocks: {
        $store: store
      },
      stubs: {
        'state-handler': StateHandler
      },
      scopedSlots: {
        default: `
          <state-handler v-bind="props._state">
          <div slot="error" id="error"></div>
          <div slot="loading" id="loading"></div>
            <div id="response"></div>
          </state-handler>
        `
      },
      propsData: {
        resource: 'example',
        dataKey: 'data',
      }
    })

    expect(wrapper.find('#loading').exists()).toBeTruthy()

    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })  
      expect(wrapper.find('#response').exists()).toBeTruthy()
    })

  })

  it('failure', async () => {

    // mock response
    mockAxios.mockImplementationOnce(() => Promise.reject('error'))

    let wrapper = mount(DataWrapper, { localVue,
      mocks: {
        $store: store
      },
      stubs: {
        'state-handler': StateHandler
      },
      scopedSlots: {
        default: `
          <state-handler v-bind="props._state">
            <div slot="error" id="error"></div>
            <div slot="loading" id="loading"></div>
            <div id="response"></div>
          </state-handler>
        `
      },
      propsData: {
        resource: 'example'
      }
    })

    // check for loading in between
    expect(wrapper.find('#loading').exists()).toBeTruthy()

    // resolve
    await waitForExpect(() => {
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })  
      expect(wrapper.find('#error').exists()).toBeTruthy()
    })

  })
})