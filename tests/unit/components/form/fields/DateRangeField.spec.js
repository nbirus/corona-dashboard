// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/form/fields/DateRangeField';

const localVue = ComponentSetup();

describe('DateRangeField.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test from() and to()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        value: [ '2019-11-01', '2019-11-04' ]
      }
    });

    expect(wrapper.vm.from).toBe('Nov 1, 2019');
    expect(wrapper.vm.to).toBe('Nov 4, 2019');

    wrapper.vm.from = '2019-11-02';
    wrapper.vm.to = '2019-11-03';

    expect(wrapper.vm.$value[0]).toBe('2019-11-02');
    expect(wrapper.vm.$value[1]).toBe('2019-11-03');
  });
});