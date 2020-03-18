import Vue from 'vue'

// stub transitions
import { config } from '@vue/test-utils'
config.stubs.transition = false

// use vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify)

// mock env vars
process.env.NODE_ENV = 'test'
process.env.VUE_APP_PROJECT_BASE_API = '/base'
process.env.VUE_APP_PROJECT_TITLE = 'test'

// remove global functions during tests
console.warn = () => {}

// mock roles
sessionStorage.setItem('okta-token-storage', JSON.stringify({
  idToken: {
    claims: {
      name: 'NAME',
      email: 'EMAIL',
      preferred_username: 'USER',
      roles: [
        'TEST_ROLE', 'NO_ROLE'
      ],
    }
  }
}))

// mock sections
jest.mock('@/roles', () => ({
  RoleSections: {
    example: ['TEST_ROLE', 'OTHER_ROLE'],
    noAccess: ['OTHER_ROLE'],
  },
  RoleHome: {
    TEST_ROLE: '/home',
  }  
}))

jest.mock('badc-styleguide/theme/colors', () => {
  return {
    __esModule: true,
    default: jest.fn(() => []),
  };
});


// mock $auth on Vue imports
Vue.prototype.$sm = {
  auth: {
    authRedirectGuard() {
      return true
    },
    getAccessToken() {
      return {
        accessToken: 'TEST_TOKEN'
      }
    },
    isAuthenticated: () => true,
    getUserInfo: () => ({})
  }
}

// mock web workers
class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}
window.Worker = Worker;