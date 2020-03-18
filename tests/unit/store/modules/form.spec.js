import form from '@/store/modules/form';

describe('store/modules/form', () => {
  const state = {
    forms: {
      testId: 'testBase'
    }
  };

  // getters
  it('getters', () => {
    expect(form.getters.getModel(state)('testId', 'defaultBase')).toBe('testBase');
  });

  // mutations
  it('mutations', () => {
    form.mutations.setModel(state, { id: 'testId', model: [] });
    expect(form.getters.getModel(state)('testId', [])).toEqual([]);

    form.mutations.setForms(state, { test: [ 'test' ] });
    expect(form.getters.getModel(state)('test', [ 'test' ])).toEqual([ 'test' ]);
  });

  // actions
  it('actions', () => {
    const commitSpy = jest.fn();
    const commit = commitSpy;

    form.actions.setModel({ commit }, { id: 'testId', model: [] });
    expect(commitSpy).toHaveBeenCalledWith('setModel', { id: 'testId', model: [] });

    form.actions.clearForms({ commit });
    expect(commitSpy).toHaveBeenCalledWith('setForms', {});
  });
});