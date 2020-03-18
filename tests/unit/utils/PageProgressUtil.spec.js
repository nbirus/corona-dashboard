import PageProgressUtil from '@/utils/PageProgressUtil'
import NProgress from 'nprogress'

jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn(),
}))

describe('PageProgressUtil', () => {

  afterEach(() => {
    NProgress.start.mockReset()
    NProgress.done.mockReset()
  })

  it('start no progress', () => {

    const to = {}
    const from = {}
    const next = jest.fn()

    PageProgressUtil.start(to, from, next)
    expect(NProgress.start).not.toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledWith()
    
  })

  it('start no progress with params', () => {

    const to = {
      name: 'test',
      meta: {
        progressBar: false,
      }
    }
    const from = {}
    const next = jest.fn()

    PageProgressUtil.start(to, from, next)
    expect(NProgress.start).not.toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledWith()
    
  })

  it('start with progress', () => {

    const to = {
      name: 'test',
      meta: {
        progressBar: true,
      }
    }
    const from = {}
    const next = jest.fn()

    PageProgressUtil.start(to, from, next)
    expect(NProgress.start).toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledWith()
    
  })

  it('done', () => {
    PageProgressUtil.done()
    expect(NProgress.done).toHaveBeenCalledWith()
  })

})