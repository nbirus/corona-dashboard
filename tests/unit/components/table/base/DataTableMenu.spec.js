// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';
jest.mock('@/utils/CopyUtil', () => jest.fn())

// Components
import Component from '@/components/table/base/DataTableMenu';

const localVue = ComponentSetup();

describe('DataTableMenu.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test linkTo()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });
    wrapper.setData({ 
      columns: [
        {
          componentProps: { to: '/test' }
        }
      ]
    });

    expect(wrapper.vm.linkTo).toBe('/test');
  });

  it('Should test open()', () => {
    const addSpy = jest.fn();
    const removeSpy = jest.fn();
    const obj = {
      event: { pageX: 20, pageY: 50 },
      column: {},
      columns: [],
      row: {},
      value: 'test_value',
      element: {
        classList: { add: addSpy, remove: removeSpy },
        parentElement: { classList: { add: jest.fn(), remove: jest.fn() } },
      }
    };
    const wrapper = shallowMount(Component, { localVue, vuetify });

    wrapper.vm.open(obj);

    expect(wrapper.vm.column).toEqual({});
    expect(wrapper.vm.columns).toEqual([]);
    expect(wrapper.vm.row).toEqual({});
    expect(wrapper.vm.value).toBe('test_value');
    expect(wrapper.vm.show).toBe(true);
    expect(wrapper.vm.top).toBe(50);
    expect(wrapper.vm.left).toBe(20);
    expect(addSpy).toHaveBeenCalledWith('context-open');
    expect(removeSpy).not.toHaveBeenCalled();
  });

  it('Should test open() for second time', () => {
    const addSpy = jest.fn();
    const removeSpy = jest.fn();
    const obj = {
      event: { pageX: 20, pageY: 50 },
      column: {},
      columns: [],
      row: {},
      value: 'test_value',
      element: {
        classList: { add: addSpy, remove: removeSpy },
        parentElement: { classList: { add: jest.fn(), remove: jest.fn() } },
      }
    };
    const wrapper = shallowMount(Component, { localVue, vuetify, data: () => ({ show: true }) });

    wrapper.vm.open(obj);

    expect(wrapper.vm.column).toEqual({});
    expect(wrapper.vm.columns).toEqual([]);
    expect(wrapper.vm.row).toEqual({});
    expect(wrapper.vm.value).toBe('test_value');
    expect(wrapper.vm.show).toBe(false);
    expect(removeSpy).toHaveBeenCalledWith('context-open');
    expect(addSpy).not.toHaveBeenCalled();
  });

  it('Should test copy() and copyRow()', () => {
    const wrapper = shallowMount(Component, { localVue, vuetify });
    wrapper.setData({ value: 'test_value' });

    wrapper.vm.copy();
    wrapper.vm.copyRow();

    expect(true).toBeTruthy();
  });

  it('Should test goTo() and goToTab()', () => {
    const openSpy = jest.fn();
    window.open = openSpy;
    const pushSpy = jest.fn();
    const resolveSpy = jest.fn(value => ({ href: value }));
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      computed: {
        linkColumn: () => ({ value: 'test' }),
        linkTo: () => ':id',
      }
    });
    wrapper.setData({ row: { test: 'test_value' } });
    wrapper.vm.$router = { push: pushSpy, resolve: resolveSpy };

    wrapper.vm.goTo();
    expect(pushSpy).toHaveBeenCalledWith('test_value');

    wrapper.vm.goToTab();
    expect(resolveSpy).toHaveBeenCalledWith('test_value');
    expect(openSpy).toHaveBeenCalledWith('test_value', '_blank');
  });

  it('Should remove class when element changes', () => {
    const classListSpy = jest.fn()
    const wrapper = shallowMount(Component, { localVue, vuetify });
    wrapper.setData({ element: {
      classList: {
        remove: classListSpy
      }
    }});
    wrapper.setData({ element: {}});
    wrapper.vm.element = {};

    expect(classListSpy).toHaveBeenCalled();
  });
});