// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';
import ExampleColumns from '@/data/columns/ExampleColumns'

// Components
import Component from '@/components/table/base/DataTable';

const localVue = ComponentSetup();

describe('DataTable', () => {
  let vuetify;
  const consoleWarnSpy = jest.spyOn(console, 'warn');

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    consoleWarnSpy.mockReset();
  });

  it('Should test columnsData()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });

    expect(wrapper.vm.columnsData.length).toBe(0);

    wrapper.setProps({ columns: ExampleColumns });

    expect(wrapper.vm.columnsData.length).toBe(4);
  });

  it('Should test columnsData() for second time', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        visibleColumns: [ 'name', 'iron' ],
        columns: ExampleColumns
      }
    });

    expect(wrapper.vm.columnsData.length).toBe(2);
  });

});