import { search, sort, paginate } from '@/services/SearchService'

describe('SearchService', () => {

  ////////////// 
  // service
  it('service/search', async () => {
    search()
  })
  it('service/sort', async () => {
    sort()
  })
  it('service/paginate', async () => {
    paginate()
  })

})
