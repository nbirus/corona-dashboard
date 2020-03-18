// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/table/cells/DateCell';

const localVue = ComponentSetup();

describe('DateCell.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test created()', () => {
    const propsData = {
      value: '2019-11-07'
    };
    const wrapper = shallowMount(Component, { localVue, vuetify, propsData });

    expect(wrapper.vm.date).toBe('November 07, 2019 ');
    expect(wrapper.vm.time).toBe(' 12:00 AM');
  });
});