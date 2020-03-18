// setup
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import ComponentSetup from '@/../tests/helpers/ComponentSetup'
import Component from '@/components/form/FormBuilder'

// create component
const localVue = ComponentSetup()

describe('form-builder', () => {

  const propsData = {
    id: 'form-builder-test',
    form: {
      model: { scenario_id: '' },
      schema: [
        {
          id: 'test_id',
          type: 'text',
          wrapperProps: {
            chipLabel: 'Test'
          },
          props: {
            placeholder: 'Filter by Test Id',
            outlined: true,
            clearable: true,
            hideDetails: true,
            maxLength: 30
          }
        }
      ]
    }
  }

  // mock vuetify
  let vuetify
  beforeEach(() => { 
    vuetify = new Vuetify() 
  })

  it('default wrapper', () => {
    const wrapper = mount(Component, { localVue, vuetify, propsData })
    expect(wrapper.vm.schema).toEqual([
      {
        id: 'test_id',
        type: 'text',
        wrapperProps: {
          chipLabel: 'Test'
        },
        props: {
          placeholder: 'Filter by Test Id',
          outlined: true,
          clearable: true,
          hideDetails: true,
          maxLength: 30
        }
      }
    ])
  })

})