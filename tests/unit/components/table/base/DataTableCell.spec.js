// Libraries
import Vuetify from 'vuetify';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';
import { date } from '@/services/FilterService'

// Components
import Component from '@/components/table/base/DataTableCell';

const localVue = ComponentSetup();

describe('DataTableCell.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should test beforeDestroy()', () => {
    const addEventListenerSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();

    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        value: '2019-11-06',
        column: { 
          text: 'Submission Date', 
          value: 'submission_date', 
          filter: date,
          width: 175
        }
      },
      methods: { onContext: () => {} }
    });

    wrapper.vm.$el = {
      parentElement: {
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy
      }
    };

    wrapper.destroy();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('contextmenu', wrapper.vm.onContext, false);
  });

  it('Should test beforeDestroy() for second time', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        value: '2019-11-06',
        column: { 
          text: 'Submission Date', 
          value: 'submission_date', 
          filter: date,
          width: 175
        }
      },
      methods: { onContext: () => {} }
    });

    wrapper.vm.$el = {};

    wrapper.destroy();
  });

  it('Should test cellValue()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        value: 'EAY131',
        column: { 
          text: 'Study Id', 
          value: 'study_id', 
          width: 100
        }
      }
    });

    expect(wrapper.vm.cellValue).toBe('EAY131');
  });

  it('Should test onContext()', () => {
    const preventDefaultSpy = jest.fn();
    const addEventListenerSpy = jest.fn();
    const removeEventListenerSpy = jest.fn();
    const event = {
      preventDefault: preventDefaultSpy
    };

    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      propsData: {
        value: '2019-11-06',
        column: { 
          text: 'Submission Date', 
          value: 'submission_date', 
          filter: date,
          width: 175
        }
      }
    });
    wrapper.vm.$el = {
      parentElement: {
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy
      }
    };

    wrapper.vm.onContext(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(wrapper.emitted().context[0]).toEqual([ {
      event,
      column: { 
        text: 'Submission Date', 
        value: 'submission_date', 
        filter: date,
        width: 175
      },
      columns: undefined,
      row: undefined,
      value: 'November 06, 2019 12:00 AM',
      element: {
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy
      }
    } ]);
  });
});