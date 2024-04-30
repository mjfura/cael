import { deleteContent } from '@/helpers/deleteContent'
import { writterController } from '@/helpers/createDomain'
import fs from 'fs'
import path from 'path'
import data from '../cael.config.json'
describe('createInfrastructureLayer', () => {
  const PATH_ROUTE = 'demos/createInfrastructureFolder'
  afterEach(() => {
    // remove the folder after each test
    deleteContent(PATH_ROUTE)
  })
  it('should create a folder with the name of the infrastructure layer', () => {
    // create test for createInfrastructureLayer function
    writterController.createInfrastructure(data.entities[0], PATH_ROUTE)
    // check if the folder with the files are created
    expect(
      fs.existsSync(path.join(PATH_ROUTE, 'modules', 'Users', 'infrastructure'))
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
  })
})
