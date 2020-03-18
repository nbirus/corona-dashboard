import { searchObject } from '@/workers/search'

describe('worker/search', () => {

  ////////////// 
  // string
  it('string/string', () => {
		const params = { t: 't', size: 20 }
		const data = [{ t: 't' }, { t: 'e', }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('string/number', () => {
		const params = { t: '1', }
		const data = [{ t: 1 }, { t: 2, }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('string/boolean', () => {
		const params = { t: 'true', }
		const data = [{ t: true }, { t: false, }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('string/array', () => {
		const params = { t: 't', }
		const data = [{ t: ['t', 'e'] }, { t: ['e'], }]
    expect(searchObject(data, params).length).toBe(1)
  })
  // it('string/object', () => {
	// 	const params = { t: 't', }
	// 	const data = [{ t: { e: 't' } }, { t: { e: 's' }, }]
  //   expect(searchObject(data, params).length).toBe(1)
  // })
  it('string/object', () => {
		const params = { example: 'example', }
		const data = [{ example: { e: 't' } }, { example: { e: 's' }, }]
    expect(searchObject(data, params).length).toBe(0)
  })

  it('string/object', () => {
		const params = { example: 'example', _keyword: '_keyword' }
		const data = [{ example: { e: 't' } }, { example: { e: 's' }, }]
    expect(searchObject(data, params).length).toBe(0)
  })


  ////////////// 
  // number
  it('number/string', () => {
		const params = { test: 1, }
		const data = [{ test: '1' }, { test: '2', }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('number/number', () => {
		const params = { test: 1, }
		const data = [{ test: 1 }, { test: 2, }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('number/boolean', () => {
		const params = { test: 1, }
		const data = [{ test: true }, { test: false, }]
    expect(searchObject(data, params).length).toBe(0)
  })
  it('number/array', () => {
		const params = { test: 1, }
		const data = [{ test: [1, 2] }, { test: [2], }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('number/object', () => {
		const params = { test: 1, }
		const data = [{ test: { t: 1 } }, { test: { t: 2 }, }]
    expect(searchObject(data, params).length).toBe(1)
  })


  ////////////// 
  // boolean
  it('boolean/string', () => {
		const params = { test: true, }
		const data = [{ test: 'true' }, { test: 'false', }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('boolean/number', () => {
		const params = { test: true, }
		const data = [{ test: 0 }, { test: 1, }]
    expect(searchObject(data, params).length).toBe(0)
  })
  it('boolean/boolean', () => {
		const params = { test: true, }
		const data = [{ test: true }, { test: false, }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('boolean/array', () => {
		const params = { test: true, }
		const data = [{ test: [true, false] }, { test: [false], }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('boolean/object', () => {
		const params = { test: true, }
		const data = [{ test: { e: true } }, { test: { e: false }, }]
    expect(searchObject(data, params).length).toBe(1)
  })


  ////////////// 
  // array
  it('array/string', () => {
		const params = { t: ['t'], }
		const data = [{ t: 't' }, { t: 'e', }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('array/number', () => {
		const params = { t: ['1'], }
		const data = [{ t: 1 }, { t: 2, }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('array/boolean', () => {
		const params = { t: [true], }
		const data = [{ t: 'true' }, { t: 'false', }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('array/array', () => {
		const params = { t: ['t'], }
		const data = [{ t: ['t', 'e'] }, { t: ['e'], }]
    expect(searchObject(data, params).length).toBe(1)
  })
  it('array/object', () => {
		const params = { t: ['t'], }
		const data = [{ t: { e: 't' } }, { t: { e: 'e' }, }]
    expect(searchObject(data, params).length).toBe(1)
  })


  ////////////// 
  // keyword
  it('keyword', () => {
		const params = { _keyword: '1', }
		const data = [{ t: 't1' }, { t: 1, }, { t: [1] }, { t: { t: '1' } }]
    expect(searchObject(data, params).length).toBe(4)
  })

})
