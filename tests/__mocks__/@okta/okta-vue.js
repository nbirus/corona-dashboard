import Vue from 'vue'
export default {
  handleCallback() {
    return Vue.component('test', {
      template: '<div></div>'
    })
  },
  getAccessToken() {
    return 'TEST_TOKEN'
  },
}