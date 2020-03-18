// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/form/fields/DatePickerField';

const localVue = ComponentSetup();

describe('DatePickerField.vue', () => {
  let vuetify;
  
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test data()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });

    expect(wrapper.vm.menu).toBe(false);
  });
});