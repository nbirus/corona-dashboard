// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/table/wrappers/TableList';

const localVue = ComponentSetup();

describe('TableList.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test filteredItems()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });

    expect(wrapper.vm.filteredItems).toEqual([]);

    wrapper.setProps({
      items: [
        { label: 'Test Label', value: 'test value' },
        { label: 'Test Label 2' }
      ]
    });
    expect(wrapper.vm.filteredItems).toEqual([ { label: 'Test Label', value: 'test value' } ]);
  });
});