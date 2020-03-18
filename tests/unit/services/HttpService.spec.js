import HttpService, { authInterceptor, paramsSerializer } from '@/services/HttpService'

describe('HttpService', () => {

  it('authInterceptor', async () => {
    let response = await authInterceptor({ headers: { common: {} } })
    expect(response).toEqual({ headers: { common: { Authorization: 'Bearer TEST_TOKEN' }} })
    expect(HttpService).toBeTruthy()
  })

  it('authInterceptor no auth', async () => {
    let response = await authInterceptor({ headers: { common: {}, authentication: false } })
    expect(response).toEqual({ headers: { common: { } } })
  })

  it('paramsSerializer', async () => {
    let params = paramsSerializer({ string: 'string', array: [1, 2, 3], undefined: undefined })
    expect(params).toBe('string=string&array=1&array=2&array=3')
  })

})