import ResourceExample from '@/store/resources/resource-example';
jest.mock('@/services/RequestService', () => {
    return {
        requestResource(resource) {
            return new Promise((resolve, reject) => {
                if (resource) resolve({ test: resource });
                else reject('ERROR');
            });
        }
    }
});

describe('@/store/resources/resource-example', () => {
    const state = {
        loading: true,
        error: 'test error',
        data: [],
        total: 10,
    };

    it('state', () => {
        expect(ResourceExample.state()).toEqual({
            loading: false,
            error: null,
            data: null,
            total: null,
        });
    });

    it('getters', () => {
        expect(ResourceExample.getters.state(state)).toEqual({
            loading: true,
            error: 'test error',
            data: [],
        });
    });

    it('mutations', () => {
        ResourceExample.mutations.SET_LOADING(state, false);
        expect(ResourceExample.getters.state(state).loading).toBe(false);

        ResourceExample.mutations.SET_ERROR(state, 'error');
        expect(ResourceExample.getters.state(state).error).toBe('error');

        ResourceExample.mutations.SET_DATA(state, [ 'test data' ]);
        expect(ResourceExample.getters.state(state).data).toEqual([ 'test data' ]);

        ResourceExample.mutations.SET_TOTAL(state);
        expect(state.total).toBe(1);

        ResourceExample.mutations.SET_LOADING(state);
        expect(ResourceExample.getters.state(state).loading).toBe(true);

        ResourceExample.mutations.SET_ERROR(state);
        expect(ResourceExample.getters.state(state).error).toBe(null);

        ResourceExample.mutations.SET_DATA(state);
        expect(ResourceExample.getters.state(state).data).toEqual(null);

        expect(ResourceExample.mutations.SET_TOTAL(state)).toBe(undefined);
    });

    it('actions', async () => {
        const commitSpy = jest.fn();
        const commit = commitSpy
        await ResourceExample.actions.get({ commit }, {});

        expect(commitSpy).toHaveBeenCalledWith('SET_LOADING');
        expect(commitSpy).toHaveBeenCalledWith('SET_ERROR');
        expect(commitSpy).toHaveBeenCalledWith('SET_DATA', { test: {} });
        expect(commitSpy).toHaveBeenCalledWith('SET_TOTAL');

        await ResourceExample.actions.get({ commit });

        expect(commitSpy).toHaveBeenCalledWith('SET_LOADING', false);
        expect(commitSpy).toHaveBeenCalledWith('SET_ERROR', 'ERROR');
    });
});