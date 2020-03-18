import { 
  hasAccess, 
  hasRole, 
  getRoles, 
  getRoleHome,
} from '@/services/RoleService'

describe('RoleService', () => {

  it('hasAccess', () => {
    expect(hasAccess('example')).toBeTruthy()
    expect(hasAccess('noAccess')).not.toBeTruthy()
  })

  it('hasRole', () => {
    expect(hasRole('TEST_ROLE')).toBeTruthy()
    expect(hasAccess('OTHER_ROLE')).not.toBeTruthy()
  })

  it('getRoles', () => {
    expect(getRoles()).toEqual([ 'TEST_ROLE', 'NO_ROLE' ])
  })

  it('getRoleHome', () => {
    expect(getRoleHome()).toEqual('/home')
  })

})