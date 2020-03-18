import * as FilterService from '@/services/FilterService'
const invalidCases = [ null, undefined, '', {}, [], new Error() ]

describe('FilterService', () => {

  // localeString
  it('localeString', () => {
    const validCases = [ 0, 10, 100, 1000, 10000 ]
    expect(invalidCases.map(FilterService.localeString)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.localeString)).toEqual( // valid
      [ '0', '10', '100', '1,000', '10,000' ]
    )
  })

  // titleCase
  it('titleCase', () => {
    const validCases = [ 'test', 'testTwo', 'TEST three', 'title case test' ]
    expect(invalidCases.map(FilterService.titleCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.titleCase)).toEqual( // valid
      [ 'Test', 'Testtwo', 'Test Three', 'Title Case Test' ]
    )
  })

  // replaceUnderscores
  it('replaceUnderscores', () => {
    const validCases = ['_', 'test_test', 'Test_TEST_test']
    expect(invalidCases.map(FilterService.replaceUnderscores)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.replaceUnderscores)).toEqual( // valid
      [' ', 'test test', 'Test TEST test']
    )
  })

  // replaceDashes
  it('replaceDashes', () => {
    const validCases = ['-', 'test-test', 'Test-TEST-test', new Error()]
    expect(invalidCases.map(FilterService.replaceDashes)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.replaceDashes)).toEqual( // valid
      [' ', 'test test', 'Test TEST test', new Error()]
    )
  })

  // upperCase
  it('upperCase', () => {
    const validCases = ['test', 'testTwo', 'TEST three']
    expect(invalidCases.map(FilterService.upperCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.upperCase)).toEqual( // valid
      ['TEST', 'TESTTWO', 'TEST THREE']
    )
  })

  // lowerCase
  it('lowerCase', () => {
    const validCases = ['test', 'testTwo', 'TEST three']
    expect(invalidCases.map(FilterService.lowerCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.lowerCase)).toEqual( // valid
      ['test', 'testtwo', 'test three']
    )
  })

  // camelCase
  it('camelCase', () => {
    const validCases = ['test-test', 'testTwo', 'test-three3']
    expect(invalidCases.map(FilterService.camelCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.camelCase)).toEqual( // valid
      ['testTest', 'testTwo', 'testThree3']
    )
  })

  // kebabToUpperCase
  it('kebabToUpperCase', () => {
    const validCases = ['test-test', 'testTwo', 'test-three-3']
    expect(invalidCases.map(FilterService.kebabToUpperCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.kebabToUpperCase)).toEqual( // valid
      ['TestTest', 'TestTwo', 'TestThree3']
    )
  })

  // arrayToString
  it('arrayToString', () => {
    const validCases = [[], ['test'], ['test1', 'test2', 'test3']]
    expect(invalidCases.map(FilterService.arrayToString)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.arrayToString)).toEqual( // valid
      [[], 'test', 'test1, test2, test3']
    )
  })

  // objectArrayToString
  it('objectArrayToString', () => {

    const validCases = [
      [ { value: 'test' } ],
      [ { value: 'test1' }, { value: 'test2' } ],
    ]

    expect(invalidCases.map(v => FilterService.objectArrayToString(v))).toEqual(invalidCases) // invalid
    expect(validCases.map(v => FilterService.objectArrayToString(v))).toEqual( // valid
      ['test', 'test1, test2']
    )
  })

  // toYesNo
  it('toYesNo', () => {
    const validCases = ['', 0, [], {}, null, undefined]
    expect(validCases.map(FilterService.toYesNo)).toEqual( // valid
      ['No', 'Yes', 'No', 'No', 'No', 'No']
    )
  })

  // abbreviate
  it('abbreviate', () => {
    const validCases = ['test', 'testtest', 'testtesttest']
    expect(validCases.map(v => FilterService.abbreviate(v, 4))).toEqual( // valid
      ['test', 'test...', 'test...']
    )
    expect(validCases.map(v => FilterService.abbreviate(v))).toEqual( // valid
      ['test', 'testtest', 'testtestte...']
    )
  })

  // date
  it('date', () => {
    const validCases = ['01/14/2019', new Date('01/14/2019'), 'asdf123', '']
    

    expect(validCases.map(v => FilterService.date(v))).toEqual( // valid
      ['January 14, 2019 12:00 AM', 'January 14, 2019 12:00 AM', 'asdf123', '']
    )
  })

  // timeAgo
  it('timeAgo', () => {
    expect(FilterService.timeAgo([])).toEqual([])
    expect(FilterService.timeAgo('Invalid Date')).toBe('NaN years ago')
  })

  // highlight
  it('highlight', () => {
    const validCases = ['ok', 'asdf123']
    expect(validCases.map(v => FilterService.highlight(v, 'o'))).toEqual( // valid
      ['<span class="h--word">o</span>k', 'asdf123']
    )
  })

  // plural
  it('plural', () => {
    expect(FilterService.plural('word')).toBe('words')
  })

})