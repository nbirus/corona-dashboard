import auth from '@/store/modules/auth';

describe('store/modules/auth', () => {

  const state = {
    authenticated: false,
    preAuthRoute: '/',
    username: '',
    name: '',
    email: '',
    roles: []
  };

  // state
  it('state', () => {
    expect(auth.state()).toEqual({
      authenticated: false,
      preAuthRoute: '/',
      username: '',
      name: '',
      email: '',
      roles: []
    });
  });
  
  // getters
  it('getters', () => {
    expect(auth.getters.authenticated(state)).toBe(false);
    expect(auth.getters.preAuthRoute(state)).toBe('/');
    expect(auth.getters.username(state)).toBe('');
    expect(auth.getters.name(state)).toBe('');
    expect(auth.getters.email(state)).toBe('');
    expect(auth.getters.roles(state)).toEqual([]);
  });

  // mutations
  it('mutations', () => {
    // set auth
    auth.mutations.SET_AUTH(state, {
      preferred_username: 'Test Preferred Username',
      name: 'Test Name',
      email: 'test email',
      roles: [ 'DEVELOPER' ]
    });

    expect(auth.getters.username(state)).toBe('Test Preferred Username');
    expect(auth.getters.name(state)).toBe('Test Name');
    expect(auth.getters.email(state)).toBe('test email');
    expect(auth.getters.roles(state)).toEqual([ 'DEVELOPER' ]);

    // check auth
    auth.mutations.CHECK_AUTH(state, true);
    expect(auth.getters.authenticated(state)).toBe(true);

    // set prev route
    auth.mutations.SET_PREV_ROUTE(state, '/test-route');
    expect(auth.getters.preAuthRoute(state)).toBe('/test-route');

    auth.mutations.SET_PREV_ROUTE(state);
    expect(auth.getters.preAuthRoute(state)).toBe('/');
  });

  // actions
  it('actions', async () => {
    const commitSpy = jest.fn();
    const dispatchSpy = jest.fn();
    const commit = commitSpy;
    const dispatch = dispatchSpy;

    await auth.actions.login({ commit, dispatch });
    expect(commitSpy).toHaveBeenCalledWith('SET_AUTH', {});
    expect(commitSpy).toHaveBeenCalledWith('SET_PREV_ROUTE');
    expect(dispatchSpy).toHaveBeenCalledWith('check');

    auth.actions.logout({ commit, dispatch });
    expect(commitSpy).toHaveBeenCalledWith('SET_AUTH', {});
    expect(dispatchSpy).toHaveBeenCalledWith('check');

    auth.actions.setPreAuth({ commit }, '/test-auth');
    expect(commitSpy).toHaveBeenCalledWith('SET_PREV_ROUTE', '/test-auth');

    await auth.actions.check({ commit });
    expect(commitSpy).toHaveBeenCalledWith('CHECK_AUTH', true);
  });

});