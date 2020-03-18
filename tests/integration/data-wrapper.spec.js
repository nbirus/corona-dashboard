import DataWrapper from '@/components/data-wrapper/DataWrapper'
import LocalDataWrapper from '@/components/data-wrapper/LocalDataWrapper'
import AsyncDataWrapper from '@/components/data-wrapper/AsyncDataWrapper'
import mockAxios from 'axios'
import waitForExpect from 'wait-for-expect'
import { mount, createLocalVue } from '@vue/test-utils'
import { createTestVue } from '@/../tests/helpers/VueInstance'
import Vuex from 'vuex'
import MockStore from '@/../tests/helpers/MockStore'

let localVue = createLocalVue()
createTestVue(localVue)
localVue.use(Vuex)

jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))
jest.mock('axios')

// service
describe('data-wrapper', () => {
  let store

  beforeEach(() => { 
    jest.resetModules() 
    store = new Vuex.Store(MockStore()) 
  })

  it('async data wrapper created', async () => {
    let wrapper = mount(DataWrapper, { localVue, 
      mocks: {
        $store: store
      },
      propsData: {
        resource: 'example',
        data: [],
      }
    })

    await waitForExpect(() => {
      expect(wrapper.find(AsyncDataWrapper).exists()).toBe(true)
      expect(mockAxios).toHaveBeenCalledWith('example', { endpoint: 'example' })  
    })
  })

  it('local data wrapper created', () => {
    let wrapper = mount(DataWrapper, { localVue, 
      mocks: {
        $store: store
      },
      propsData: {
        data: [],
      }
    })

    expect(wrapper.find(LocalDataWrapper).exists()).toBe(true)
  })

})