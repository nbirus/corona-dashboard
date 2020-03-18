
// test state handler in conjunction with data wrapper
import { mount, createLocalVue } from '@vue/test-utils';
import { createTestVue } from '@/../tests/helpers/VueInstance'

import StateHandler from '@/components/state/StateHandler'
import Loading from '@/components/state/Loading'
import Error from '@/components/state/Error'

import isEqual from 'lodash/isEqual'

let localVue = createLocalVue();
createTestVue(localVue);

// props
const defaultProps = {
  data: undefined,
  loading: true,
  error: undefined,
  noTransition: true
}
const responseProps = {
  data: ['test'],
  loading: false,
  error: undefined,
}
const loadingProps = {
  data: undefined,
  loading: true,
  error: undefined,
}
const errorProps = {
  data: undefined,
  loading: false,
  error: 'Something went wrong',
}

// slots
const defaultSlots = {
  default: `<div id="responseSlot"></div>`,
}
const loadingSlots = {
  default: `<div id="responseSlot"></div>`,
  loading: `<div id="loadingSlot"></div>`,
}
const allSlots = {
  default: `<div id="responseSlot"></div>`,
  loading: `<div id="loadingSlot"></div>`,
  error: `<div id="errorSlot"></div>`,
}

function createStateHanlder(propsData = defaultProps, slots = defaultSlots) {
  return mount(StateHandler, { localVue, propsData, slots, listeners: { update: () => {} } });
}
function checkState(wrapper, state) {
  const currentState = {
    loadingDefault: wrapper.contains(Loading),
    errorDefault: wrapper.contains(Error),
    loadingSlot: wrapper.find('#loadingSlot').exists(),
    errorSlot: wrapper.find('#errorSlot').exists(),
    responseSlot: wrapper.find('#responseSlot').exists(),
  }

  return isEqual(currentState, state)
}

describe('state-handler', () => {

  it('Default Slots', () => {

    // default
    expect(checkState(createStateHanlder(), {
      loadingDefault: true,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);

    // response
    expect(checkState(createStateHanlder(responseProps), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: true,
    })).toBe(true);
 
    // loading
    expect(checkState(createStateHanlder(loadingProps), {
      loadingDefault: true,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);
 
    // error
    expect(checkState(createStateHanlder(errorProps), {
      loadingDefault: false,
      errorDefault: true,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);

  })

  it('Loading Slots', () => {

    // default
    expect(checkState(createStateHanlder(defaultProps, loadingSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: true,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);

    // response
    expect(checkState(createStateHanlder(responseProps, loadingSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: true,
    })).toBe(true);
 
    // loading
    expect(checkState(createStateHanlder(loadingProps, loadingSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: true,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);
 
    // error
    expect(checkState(createStateHanlder(errorProps, loadingSlots), {
      loadingDefault: false,
      errorDefault: true,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);

  })

  it('All Slots', () => {

    // default
    expect(checkState(createStateHanlder(defaultProps, allSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: true,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);

    // response
    expect(checkState(createStateHanlder(responseProps, allSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: false,
      responseSlot: true,
    })).toBe(true);
 
    // loading
    expect(checkState(createStateHanlder(loadingProps, allSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: true,
      errorSlot: false,
      responseSlot: false,
    })).toBe(true);
 
    // error
    expect(checkState(createStateHanlder(errorProps, allSlots), {
      loadingDefault: false,
      errorDefault: false,
      loadingSlot: false,
      errorSlot: true,
      responseSlot: false,
    })).toBe(true);

  })

})
