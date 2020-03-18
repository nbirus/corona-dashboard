import Vue from 'vue';
import Mixin from '@/mixins/RequestMixin'
import ComponentSetup from '@/../tests/helpers/ComponentSetup'
import { shallowMount } from '@vue/test-utils'
const localVue = ComponentSetup()
localVue.mixin(Mixin)

const Component = Vue.component('Test', {
  name: 'Test',
  template: `<div></div>`
});

function props(keepResponseAlive = false) {
  return {
    propsData: {
      keepResponseAlive,
    }
  }
}

describe('RequestMixin', () => {

  it('$request', () => {
    const setStateSpy = jest.fn()
    const wrapper = shallowMount(Component, { localVue, ...props(), methods: { $setState: setStateSpy } })
    wrapper.vm.$request({})
    expect(setStateSpy).toHaveBeenCalled()
  })

  it('$getData & $getTotal', () => {
    const wrapper = shallowMount(Component, { localVue, ...props(), data: () => ({ dataKey: 'data_key', totalKey: 'total_key' }) })
    
    expect(wrapper.vm.$getData({ data_key: 'data value' })).toBe('data value')
    expect(wrapper.vm.$getTotal(100)).toBe(100)
  })

  it('$getData & $getTotal for second time', () => {
    const wrapper = shallowMount(Component, { localVue, ...props(), data: () => ({ dataKey: '', totalKey: '' }) })
    
    expect(wrapper.vm.$getData({ data_key: 'data value' })).toEqual({ data_key: 'data value' })
    expect(wrapper.vm.$getTotal([])).toBe(0)
  })

})