import PageTitleUtil from '@/utils/PageTitleUtil'

describe('PageTitleUtil', () => {

  it('default', () => {

    const to = {}
    const from = {}
    const next = jest.fn()

    PageTitleUtil(to, from, next)

    expect(document.title).toBe('test')
    expect(next).toHaveBeenCalledWith()
    
  })

  it('routeTitle', () => {

    const to = { meta: { title: 'title' }}
    const from = {}
    const next = jest.fn()

    PageTitleUtil(to, from, next)

    expect(document.title).toBe('title - test')
    expect(next).toHaveBeenCalledWith()
    
  })

  it('dynamic', () => {

    const to = { meta: { title: ':id' }, params: { id: 'title-id' }}
    const from = {}
    const next = jest.fn()

    PageTitleUtil(to, from, next)

    expect(document.title).toBe('title-id - test')
    expect(next).toHaveBeenCalledWith()
    
  })

})