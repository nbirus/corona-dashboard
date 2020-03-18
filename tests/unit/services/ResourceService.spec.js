import { getResourceQuery, getResourceFormatter, getResourceValidator } from '@/services/ResourceService'
jest.mock('@/data/resources', () => require('@/../tests/data/TestResources'))

describe('ResourceService', () => {

  beforeEach(() => {
    jest.resetModules()
  })

  it('getResourceQuery', () => {
    expect(getResourceQuery('example')).toEqual({
      endpoint: 'example',
    })
    expect(getResourceQuery('no-formatter')).toEqual({})
    expect(getResourceQuery('example-with-extra-headers')).toEqual({
      endpoint: 'example-with-extra-headers',
			headers: {
				header: 'test',
			},
    })
  })

  it('getResourceFormatter', async () => {
    const formatter = getResourceFormatter('example-with-formatter')
    expect(await formatter({ test: 'test' })).toEqual({ test: 'test' })    
  })

  it('getResourceValidation', async () => {
    const validator = getResourceValidator('example-with-validation')
    expect(validator({ status: 404 })).toEqual('Error message')    
    expect(validator({ status: 200 })).toEqual(undefined)    
  })

})

