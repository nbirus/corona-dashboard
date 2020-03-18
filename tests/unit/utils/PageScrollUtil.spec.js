import PageScrollUtil from '@/utils/PageScrollUtil'
import goTo from 'vuetify/es5/services/goto'

// mock sections
jest.mock('vuetify/es5/services/goto', () => jest.fn())

describe('PageScrollUtil', () => {

  afterEach(() => goTo.mockReset())

  it('default', () => {

    const to = {}
    const from = {}

    PageScrollUtil(to, from)
    expect(goTo).toHaveBeenCalled()

  })

  it('hash', () => {

    const to = { hash: 'someHash' }
    const from = {}
    const savedPos = {}

    PageScrollUtil(to, from, savedPos)
    expect(goTo).toHaveBeenCalledWith('someHash')

  })

  it('savedPosition', () => {

    const to = {}
    const from = {}
    const savedPos = { y: 100 }

    PageScrollUtil(to, from, savedPos)
    expect(goTo).toHaveBeenCalledWith(100)

  })

})