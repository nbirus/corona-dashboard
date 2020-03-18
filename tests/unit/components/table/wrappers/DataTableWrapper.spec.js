// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/table/wrappers/DataTableWrapper';

const localVue = ComponentSetup();

describe('DataTableWrapper', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('updates bindings correclty', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });    
    wrapper.vm.update({
      total: 10,
      loading: false,
      data: 'data',
    });
    expect(wrapper.emitted('update:bindTotal')[0][0]).toBe(10)
    expect(wrapper.emitted('update:bindLoading')[0][0]).toBe(false)
    expect(wrapper.emitted('update:bindData')[0][0]).toBe('data')
  });

  it('Should test data()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify, propsData: { noPagination: true } });    
    
    expect(wrapper.vm.wrapperPagination).toEqual({ size: 100000, from: 0 });
  });


  it('watchers', () => {
    const updateSortSpy = jest.fn();
    const updatePaginationSpy = jest.fn();
    const updateDenseSpy = jest.fn();
    const wrapper = shallowMount(Component, { localVue, vuetify, propsData: {
      updateSort: updateSortSpy,
      updatePagination: updatePaginationSpy,
      updateDense: updateDenseSpy,
    } });

    wrapper.vm.wrapperSort = 'sort'
    expect(updateSortSpy).toHaveBeenCalledWith('sort');

    wrapper.vm.wrapperPagination = 'paginate'
    expect(updatePaginationSpy).toHaveBeenCalledWith('paginate');

    wrapper.setProps({ dense: true })
    expect(updateDenseSpy).toHaveBeenCalledWith(true);

  });


  it('Should test paramsUpdate()', () => {
    const pageChangeSpy = jest.fn();
    const wrapper = shallowMount(Component, { localVue, vuetify });
    wrapper.vm.$refs = {
      pagination: { pageChange: pageChangeSpy }
    };
    
    wrapper.vm.paramsUpdate();
    expect(pageChangeSpy).toHaveBeenCalledWith(1);
  });

  it('Should test paramsUpdate() for second time', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });
    wrapper.vm.$refs = {};
    
    expect(wrapper.vm.paramsUpdate()).toBe(undefined);
  });

});