// // import mockAxios from 'jest-mock-axios';
// // export default mockAxios;
// // import axios from 'axios'

// // module.exports = {
// //   default: jest.fn(() => Promise.resolve({ data: [3] })),
// //   create: () => axios
// // }

// const mockAxios = jest.genMockFromModule('axios')

// // this is the key to fix the axios.create() undefined error!
// mockAxios.create = jest.fn(() => mockAxios)

// export default mockAxios

import mockAxios from 'jest-mock-axios';
export default mockAxios;