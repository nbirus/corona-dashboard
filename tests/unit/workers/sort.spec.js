import { sortObject } from '@/workers/sort'

describe('worker/sort', () => {

  ////////////// 
  // string
  it('string/desc', () => {
		const sort = { key: 't', desc: false }
		const data = [{ t: 'c' }, { t: 'a' }, { t: 'b' }]
    expect(sortObject(data, sort)).toStrictEqual([
      { t: 'c' }, { t: 'b' }, { t: 'a' }
    ])
  })
  it('string/asc', () => {
		const sort = { key: 'example', desc: true }
		const data = [{ example: 'c' }, { example: 'a' }, { example: 'b' }]
    expect(sortObject(data, sort)).toStrictEqual([
      { example: 'a' }, { example: 'b' }, { example: 'c' }
    ])

    expect(sortObject([], '')).toStrictEqual([])
  })

  ////////////// 
  // number
  it('number/desc', () => {
		const sort = { key: 't', desc: false }
		const data = [{ t: 2 }, { t: 1 }, { t: 3 }]
    expect(sortObject(data, sort)).toStrictEqual([
      { t: 3 }, { t: 2 }, { t: 1 }
    ])
  })
  it('number/asc', () => {
		const sort = { key: 't', desc: true }
		const data = [{ t: 2 }, { t: 1 }, { t: 3 }]
    expect(sortObject(data, sort)).toStrictEqual([
      { t: 1 }, { t: 2 }, { t: 3 }
    ])
  })

})
