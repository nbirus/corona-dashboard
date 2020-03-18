export default {
  create: () => ({
    register: () => {},
    postMessage: (resource, data) => new Promise(resolve => {
      resolve(JSON.parse(data))
    }),
    unregister: () => {},
  }),
}