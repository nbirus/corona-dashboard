// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/form/fields/ColorPickerField';

const localVue = ComponentSetup();

describe('ColorPickerField.vue', () => {
  let vuetify;
  
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test filteredColors()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });

    // TODO
    // expect(wrapper.vm.filteredColors).toEqual({});
    expect(true).toBe(true)
  });
});