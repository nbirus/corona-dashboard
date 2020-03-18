// definition
import Component from '@/components/data-wrapper/LocalDataWrapper'
import ComponentSetup from '@/../tests/helpers/ComponentSetup'
import { shallowMount } from '@vue/test-utils'
const localVue = ComponentSetup()

// helpers
import waitForExpect from 'wait-for-expect'

const defaultData = [
  { id: 1, property: 'test-1' },
  { id: 2, property: 'test-2' },
  { id: 3, property: 'test-3' },
]

function props(params = {}, data = defaultData) {
  return {
    propsData: {
      data,
      params,
    }
  }
}

describe('LocalDataWrapper', () => {

  it('default data, no params', () => {
    const wrapper = shallowMount(Component, { localVue, ...props() })
    expect(wrapper.vm.returnData).toEqual(defaultData)
  })

  it('activeData', () => {
    const wrapper = shallowMount(Component, { localVue, propsData: {
      data: {
        test: ['data']
      },
    }})
    expect(wrapper.vm.activeData).toEqual({
      test: ['data']
    })
    wrapper.setProps({
      dataKey: 'test'
    })
    expect(wrapper.vm.activeData).toEqual(['data'])
  })

  it('request', () => {
    const onResolveSpy = jest.fn();
    const wrapper = shallowMount(Component, { localVue, ...props() })
    wrapper.vm._request({
      id: 1,
    })
    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.vm.error).toBe(undefined)
    
    waitForExpect(() => {
      expect(onResolveSpy).toHaveBeenCalled()
    })
  })

  it('onResolve', () => {
    const wrapper = shallowMount(Component, { localVue, ...props() })
    wrapper.vm.onResolve({
      data: 'data', total: 10
    })
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).toBe(undefined)
    expect(wrapper.vm.returnData).toBe('data')
    expect(wrapper.vm.total).toBe(10)
  })

  it('error', () => {
    const wrapper = shallowMount(Component, { localVue, ...props() })
    wrapper.vm.onError('test')
    expect(wrapper.vm.error).toBe('test')
  })

  it('mounted()', () => {
    const makeRequestSpy = jest.fn();
    shallowMount(Component, { 
      localVue,
      propsData: { noCallOnMount: true, data: defaultData },
      methods: { makeRequest: makeRequestSpy }
    });
    
    expect(makeRequestSpy).not.toHaveBeenCalled();
  })

  it('makeRequest', () => {
    const wrapper = shallowMount(Component, { localVue, ...props() })
    wrapper.setProps({ disabled: true })
    
    expect(wrapper.vm.makeRequest()).toBe(undefined)
  })

})