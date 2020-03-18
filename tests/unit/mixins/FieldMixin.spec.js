import Vue from 'vue';
import Mixin from '@/mixins/FieldMixin';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';
import { shallowMount } from '@vue/test-utils';

const localVue = ComponentSetup();
localVue.mixin(Mixin);

const Component = Vue.component('Test', {
  name: 'Test',
  template: `<div></div>`
});

describe('FieldMixin', () => {

  it('$value', () => {
    const wrapper = shallowMount(Component, { localVue, propsData: { value: 'prop value' } });
    expect(wrapper.vm.$value).toBe('prop value');

    wrapper.vm.$value = 'test prop value';
    expect(wrapper.emitted().input[0]).toEqual([ 'test prop value' ]);
  });

});