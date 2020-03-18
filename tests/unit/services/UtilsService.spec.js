import { exists, searchFilter, highlightSearch } from '@/services/UtilsService'

describe('UtilsService', () => {
  it('truthy', () => {
  
    // true
    expect([
      0, 
      false, 
      true, 
      'a', 
      ['test'], 
      { ok: 'test' }, 
      ' '
    ].every(exists)).toBe(true)

    // false
    expect([
      undefined, 
      null, 
      {}, 
      [], 
      ''
    ].every(exists)).toBe(false)

  })

  it('searchFilter', () => {
    expect([
      'a',
      'ab',
      'c',
      'd',
      'ea',
    ].filter(searchFilter('a'))).toEqual([
      'ab',
      'ea',
    ])
  })

  it('highlightSearch', () => {
    expect(highlightSearch('John Doe', 'joh')).toBe(`<span class="highlight-search">Joh</span>n Doe`)
    expect(highlightSearch('John Doe', 22)).toBe('John Doe')
  })

  // it('downloadObjectAsJson', () => {
  //   downloadObjectAsJson('test', 'test2')
  //   expect(true).toBe(true)
  // })

})