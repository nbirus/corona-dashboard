import PageRoleGaurdUtil from '@/utils/PageRoleGaurdUtil'

describe('PageRoleGaurdUtil', () => {

  it('default (skipGaurd)', () => {

    const to = {}
    const from = {}
    const next = jest.fn()

    PageRoleGaurdUtil(to, from, next)
    expect(next).toHaveBeenCalledWith()
    
  })

  it('success thorugh section', () => {

    const to = {
      meta: {
        section: 'example'
      }
    }
    const from = {}
    const next = jest.fn()

    PageRoleGaurdUtil(to, from, next)
    expect(next).toHaveBeenCalledWith()
    
  })

  it('success thorugh allowedRoles', () => {

    const to = {
      meta: {
        allowedRoles: ['TEST_ROLE']
      }
    }
    const from = {}
    const next = jest.fn()

    PageRoleGaurdUtil(to, from, next)
    expect(next).toHaveBeenCalledWith()
    
  })

  it('unauthorized', () => {

    const to = {
      meta: {
        section: 'noAccess'
      }
    }
    const from = {}
    const next = jest.fn()

    PageRoleGaurdUtil(to, from, next)
    expect(next).toHaveBeenCalledWith('/unauthorized')
    
  })

})