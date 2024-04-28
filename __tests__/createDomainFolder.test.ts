import { writterController } from '@/helpers/createDomain'
import { deleteContent } from '@/helpers/deleteContent'
import fs from 'fs'
import path from 'path'
import data from '../cael.config.json'
describe('createDomainFolder', () => {
  const PATH_ROUTE = 'demos/createDomainFolder'
  afterEach(() => {
    // remove the folder after each test
    deleteContent(PATH_ROUTE)
  })
  it('should create a domain folder for a module', () => {
    writterController.createDomain(data.entities[0], PATH_ROUTE)
    // check if the folder with the files are created
    expect(fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users'))).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'domain', 'entity.ts')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'domain', 'repository.ts')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'domain', 'value.ts')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'domain', 'index.ts')
      )
    ).toBe(true)
  })
})
