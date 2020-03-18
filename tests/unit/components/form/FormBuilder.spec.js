// Libraries
import Vuetify from 'vuetify';
import Vuex from 'vuex';

// Utilities
import { shallowMount } from '@vue/test-utils';
import ComponentSetup from '@/../tests/helpers/ComponentSetup';

// Components
import Component from '@/components/form/FormBuilder';
import form from '@/store/modules/form';


const localVue = ComponentSetup();
localVue.use(Vuex);

const defaultProps = {
  id: 'scenarios-filter',
  form: {
    model: { scenario_id: '' },
    schema: [
      {
        id: 'scenario_id',
        type: 'text',
        wrapperProps: {
          chipLabel: 'Scenario'
        },
        props: {
          placeholder: 'Filter by Scenario ID',
          outlined: true,
          clearable: true,
          hideDetails: true,
          maxLength: 30
        }
      }
    ]
  }
};

describe('FormBuilder.vue', () => {
  let vuetify;
  let store, formActions;
  const consoleWarnSpy = jest.spyOn(console, 'warn');

  beforeEach(() => {
    vuetify = new Vuetify();

    formActions = {
      setModel: jest.fn(),
      clearForms: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        form: { ...form, actions: formActions }
      }
    });
  });

  afterEach(() => {
    consoleWarnSpy.mockReset();
  });

  it('Should pass in an invalid format of form', () => {
    expect(Component.props.form.validator({ model: { scenario_id: '' } })).toBe(false);
    expect(consoleWarnSpy).toHaveBeenCalledWith(`The form must include both a model and a schema`);
  });

  it('Should test created()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      scopedSlots: {
        default: `<div></div>`
      },
      propsData: {
        id: 'scenarios-filter',
        form: {
          model: { scenario_id: '' },
          schema: [
            {
              id: 'scenario_id',
              type: 'text',
              show: false,
              wrapperProps: {
                chipLabel: 'Scenario'
              },
              props: {
                placeholder: 'Filter by Scenario ID',
                outlined: true,
                clearable: true,
                hideDetails: true,
                maxLength: 30
              }
            }
          ]
        },
        persist: true
      },
      data() {
        return { dChange: () => {} }
      }
    });

    expect(wrapper.vm.model).toEqual({ scenario_id: '' });
  });


  it('Should test submit()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: defaultProps,
      data() {
        return { dChange: () => {} }
      }
    });
    wrapper.vm.$refs = {
      form: {
        validate: () => true
      }
    };
    wrapper.vm.triggerSubmit();
    expect(wrapper.emitted().submit[0]).toEqual([ { scenario_id: '' } ]);
  });

  it('Should test reset()', () => {
    const resetValidationSpy = jest.fn();
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: defaultProps,
      data() {
        return { dChange: () => {} }
      }
    });

    wrapper.vm.$refs = {
      form: { resetValidation: resetValidationSpy }
    };
    wrapper.vm.reset();

    expect(resetValidationSpy).toHaveBeenCalled();
    expect(wrapper.vm.model).toEqual({ scenario_id: '' });
  });

  it('Should test change()', () => {
    const checkActiveFieldsSpy = jest.fn();
    const submitSpy = jest.fn();
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      scopedSlots: {
        default: `<div></div>`
      },
      propsData: defaultProps,
      data() {
        return { dChange: () => {} }
      },
      methods: { 
        checkActiveFields: checkActiveFieldsSpy,
        submit: submitSpy
      }
    });
    wrapper.vm.$refs = {
      form: {
        validate: () => true
      }
    };
    wrapper.vm.triggerChange({ scenario_id: 'test_scenario_id' });

    expect(wrapper.emitted().change[0]).toEqual([ { scenario_id: 'test_scenario_id' } ]);
    expect(checkActiveFieldsSpy).toHaveBeenCalled();
  });

  it('Should test resetField()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: defaultProps,
      data() {
        return { dChange: () => {} }
      }
    });

    wrapper.vm.resetField('scenario_id');

    expect(wrapper.vm.model.scenario_id).toBe('');
    expect(wrapper.vm.resetField('test_id')).toBe(undefined);
  });

  it('Should test checkActiveFields()', () => {
    const bindHookSpy = jest.fn();
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: defaultProps,
      data() {
        return { dChange: () => {} }
      },
      methods: { bindHook: bindHookSpy }
    });

    wrapper.vm.checkActiveFields();

    expect(bindHookSpy).not.toHaveBeenCalled();
    expect(wrapper.emitted('update:activeFields')[0]).toEqual([ [] ]);
  });

  it('Should test checkActiveFields() for second time', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: {
        id: 'scenarios-filter',
        form: {
          model: { scenario_id: '' },
          schema: [
            {
              id: 'scenario_id',
              isActive: () => true,
              type: 'text',
              wrapperProps: {
                chipLabel: 'Scenario'
              },
              props: {
                placeholder: 'Filter by Scenario ID',
                outlined: true,
                clearable: true,
                hideDetails: true,
                maxLength: 30
              }
            }
          ]
        }
      },
      data() {
        return { dChange: () => {} }
      }
    });

    wrapper.vm.checkActiveFields();

    expect(wrapper.emitted('update:activeFields')[0]).toEqual([ [ 'scenario_id' ] ]);
  });

  it('Should test getField()', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: { ...defaultProps, value: { scenario_id: '' } },
      data() {
        return { dChange: () => {} }
      }
    });

    expect(wrapper.vm.getField('study_id')).toEqual({});
  });

  it('Should watch value', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      vuetify,
      store,
      propsData: { ...defaultProps, value: { scenario_id: 'test scenario id' } },
      data() {
        return { dChange: () => {}, model: {} }
      }
    });

    wrapper.setProps({ value: { scenario_id: 'test' } });
    expect(wrapper.vm.model).toEqual({ scenario_id: 'test' });

    wrapper.setProps({ value: { scenario_id: '' } });
    expect(wrapper.vm.model).toEqual({ scenario_id: '' });

    wrapper.setProps({ value: { scenario_id: '' } });
    expect(wrapper.vm.model).toEqual({ scenario_id: '' });
  });
});