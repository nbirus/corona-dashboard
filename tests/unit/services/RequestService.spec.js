import { request } from '@/services/RequestService'
jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))

jest.mock('@/services/HttpService', () => ({
  __esModule: true,
  default: (endpoint, config) => {
    return new Promise((resolve, reject) => {
      if (endpoint) {
        return resolve('DATA')
      } else {
        return reject('TEST ERROR')
      }
    })
  }
}))

describe('RequestService', () => {

  it('request', async () => {
    let config = {
      endpoint: 'test'
    }

    expect(await request(config)).toStrictEqual({ data: 'DATA', total: null })
  })

  it('promise throws', async () => {
    try {
      await request({ endpoint: 'test' }, r => r, () => 'error');
    } catch (e) {
      expect(e).toEqual({"data": undefined, "error": "Error: error", "status": undefined});
    }
  })

})
