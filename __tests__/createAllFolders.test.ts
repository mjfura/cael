import { deleteContent } from '@/helpers/deleteContent'
import fs from 'fs'
import path from 'path'
import data from '../cael.config.json'
import { cael } from '@/index'
describe('createAllFolders', () => {
  const PATH_ROUTE = 'demos/createAllFolders'
  afterEach(() => {
    // remove the folder after each test
    deleteContent(PATH_ROUTE)
  })
  it('should create all folders for a module', () => {
    cael.createAll(data.entities[0], PATH_ROUTE)
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

    expect(
      fs.existsSync(
        path.join(
          PATH_ROUTE,
          'modules',
          'Users',
          'infrastructure',
          'repository'
        )
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(
          PATH_ROUTE,
          'modules',
          'Users',
          'infrastructure',
          'repository',
          'index.ts'
        )
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(
          PATH_ROUTE,
          'modules',
          'Users',
          'infrastructure',
          'repository',
          'MysqlRepository.ts'
        )
      )
    ).toBe(true)

    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'application', 'index.ts')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'application', 'useCase.ts')
      )
    ).toBe(true)
  })
})
