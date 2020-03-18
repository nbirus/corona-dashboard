import { paginateObject } from '@/workers/paginate'

describe('worker/pagination', () => {
  it('default', () => {
		const pagination = { from: 0, size: 2 }
		const data = [1, 2, 3]
    expect(paginateObject(data, pagination)).toStrictEqual({
      data: [1, 2],
      total: 3,
    })
  })
  it('default', () => {
		const pagination = { from: 1, size: 2 }
		const data = [1, 2, 3]
    expect(paginateObject(data, pagination)).toStrictEqual({
      data: [2, 3],
      total: 3,
    })
  })
})
