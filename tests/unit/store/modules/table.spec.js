import table from '@/store/modules/table';

describe('store/modules/table', () => {
  const state = {
    test: {
      visibleColumns: [],
      dense: false,
      sort: {
        key: undefined,
        desc: undefined,
      },
      pagination: {
        from: 0,
        size: 20,
      },
    },
  };

  // getters
  it('getters', () => {
    expect(table.getters.getTable(state)('test')).toEqual(state.test);
  });

  // // mutations
  it('mutations', () => {
    table.mutations.SET_TABLE(state, {
      id: 'test',
      key: 'dense',
      data: true,
    });
    expect(table.getters.getTable(state)('test')).toEqual({
      visibleColumns: [],
      dense: true,
      sort: {
        key: undefined,
        desc: undefined,
      },
      pagination: {
        from: 0,
        size: 20,
      },
    });
  });

  // actions
  it('actions', () => {
    const commitSpy = jest.fn();
    const commit = commitSpy;

    table.actions.setDense({ commit }, { id: 'test', data: false, });
    expect(commitSpy).toHaveBeenCalledWith('SET_TABLE', {
      id: 'test', data: false, key: 'dense'
    });

    table.actions.setColumns({ commit }, { id: 'test', data: false, });
    expect(commitSpy).toHaveBeenCalledWith('SET_TABLE', {
      id: 'test', data: false, key: 'columns'
    });

    table.actions.setSort({ commit }, { id: 'test', data: false, });
    expect(commitSpy).toHaveBeenCalledWith('SET_TABLE', {
      id: 'test', data: false, key: 'sort'
    });

    table.actions.setPagination({ commit }, { id: 'test', data: false, });
    expect(commitSpy).toHaveBeenCalledWith('SET_TABLE', {
      id: 'test', data: false, key: 'pagination'
    });

  });
});