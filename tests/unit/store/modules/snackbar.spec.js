import snackbar from '@/store/modules/snackbar';

describe('store/modules/search', () => {
  const state = {
    options: {
      message: 'test message',
      timeout: 5000,
      persist: false,
      position: 'left',
      color: 'green'
    }
  }
  const defaultState = {
    message: '',
    color: undefined,
    timeout: 4000,
    persist: false,
    multiLine: false,
    vertical: false,
    textButton: false,
    position: 'bottom right',
  }

  // state
  it('state', () => {
    expect(snackbar.state().options).toEqual(defaultState);
  });

  // getters
  it('getters', () => {
    expect(snackbar.getters.options(state)).toEqual({
      message: 'test message',
      timeout: 5000,
      persist: false,
      position: 'left',
      color: 'green'
    });
  });

  // mutations
  it('mutations', () => {
    snackbar.mutations.SET(state, state.options);
    expect(snackbar.getters.options(state)).toEqual({ 
      message: 'test message',
      color: 'green',
      timeout: 5000,
      persist: false,
      multiLine: false,
      vertical: false,
      textButton: false,
      position: 'left',
    });
  });

  // actions
  it('actions', () => {
    const commitSpy = jest.fn();
    const commit = commitSpy;

    snackbar.actions.open({ commit }, { message: 'test' });
    expect(commitSpy).toHaveBeenCalledWith('SET', { message: 'test' });

    snackbar.actions.clear({ commit });
    expect(commitSpy).toHaveBeenCalledWith('SET');
  });
});