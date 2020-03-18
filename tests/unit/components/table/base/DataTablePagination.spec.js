// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/table/base/DataTablePagination';

const localVue = ComponentSetup();

describe('DataTablePagination.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test start(), end() and pageCount()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        total: 101,
        size: 20
      }
    });

    expect(wrapper.vm.start).toBe(1);
    expect(wrapper.vm.end).toBe(20);
    expect(wrapper.vm.pageCount).toBe(6);
  });

  it('Should test start(), end() and pageCount() for second time', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        total: 0,
        size: 20
      }
    });

    expect(wrapper.vm.start).toBe(1);
    expect(wrapper.vm.end).toBe(0);
    expect(wrapper.vm.pageCount).toBe(1);
  });

  it('Should test pageChange()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        total: 101,
        size: 20
      }
    });

    wrapper.vm.pageChange(5);

    expect(wrapper.emitted('update:from')[0]).toEqual([ 80 ]);
    expect(wrapper.vm.page).toBe(5);
  });

  it('Should test sizeChange()', () => {
    const pageChangeSpy = jest.fn();
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        total: 101,
        size: 20
      },
      methods: { pageChange: pageChangeSpy }
    });

    wrapper.vm.sizeChange(50);

    expect(wrapper.emitted('update:size')[0]).toEqual([ 50 ]);
    expect(pageChangeSpy).toHaveBeenCalledWith(1);
  });
});