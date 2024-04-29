import { deleteContent } from '@/helpers/deleteContent'
import { writterController } from '@/helpers/createDomain'
import data from '../cael.config.json'
import fs from 'fs'
import path from 'path'
describe('createApplicationFolder', () => {
  const PATH_ROUTE = 'demos/createApplicationFolder'
  afterEach(() => {
    // remove the folder after each test
    deleteContent(PATH_ROUTE)
  })
  it('should create a folder with the name of the application', () => {
    // create test for createApplicationFolder function
    writterController.createApplication(data.entities[0], PATH_ROUTE)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'application', 'useCase.ts')
      )
    ).toBe(true)
    expect(
      fs.existsSync(
        path.join(PATH_ROUTE, 'modules', 'Users', 'application', 'index.ts')
      )
    ).toBe(true)
  })
})
