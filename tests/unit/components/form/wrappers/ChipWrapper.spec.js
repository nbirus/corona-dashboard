// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/form/wrappers/ChipWrapper';

const localVue = ComponentSetup();

describe('ChipWrapper.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('method: clear()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        fieldId: 'test field id',
        resetField: value => value
      }
    });

    wrapper.setData({ open: true });

    wrapper.vm.clear();

    expect(wrapper.vm.open).toBe(false);
  });
});