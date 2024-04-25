import { createDomain } from '@/helpers/createDomain'
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
    createDomain(PATH_ROUTE, data.entities[0])
    // check if the folder with the files are created
    expect(fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users'))).toBe(true)
    expect(
      fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users', 'entity.ts'))
    ).toBe(true)
    expect(
      fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users', 'repository.ts'))
    ).toBe(true)
    expect(
      fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users', 'value.ts'))
    ).toBe(true)
  })
})
