// definition
import Component from '@/components/data-wrapper/AsyncDataWrapper'
import ComponentSetup from '@/../tests/helpers/ComponentSetup'
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import MockStore from '@/../tests/helpers/MockStore'

const localVue = ComponentSetup()
localVue.use(Vuex)

function props(params = {}) {
  return {
    propsData: {
      params,
    }
  }
}

describe('AsyncDataWrapper', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store(MockStore())
  })

  it('expect params to be emmitted', () => {
    const wrapper = shallowMount(Component, { localVue, ...props({ test: '' }), children: [], 
    mocks: {
      $store: store
    }})
    wrapper.setProps({
      params: {
        test: 'test'
      }
    })
    expect(wrapper.emitted().params).toBeTruthy()
  })

  it('mounted()', () => {
    const makeRequestSpy = jest.fn();
    shallowMount(Component, { 
      localVue,
      mocks: { $store: store },
      propsData: { noCallOnMount: true },
      methods: { makeRequest: makeRequestSpy }
    });
    
    expect(makeRequestSpy).not.toHaveBeenCalled();
  })

  it('makeRequest()', () => {
    const wrapper = shallowMount(Component, { localVue, ...props({ test: '' }), children: [], mocks: { $store: store }, })
    wrapper.setProps({
      params: {
        test: 'test'
      },
      disabled: true
    })
    expect(wrapper.vm.makeRequest()).toBe(undefined)
  })

  it('Watches params', () => {
    const emitSpy = jest.fn()
    const wrapper = shallowMount(Component, { localVue, ...props({ test: '' }), children: [], mocks: { $store: store }, })
    wrapper.vm.$emit = emitSpy
    wrapper.setProps({
      params: {
        test: ''
      }
    })
    expect(emitSpy).not.toHaveBeenCalled()
  })

})