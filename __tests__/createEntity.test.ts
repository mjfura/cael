// create test for createEntity function
import { createFolder } from '@/helpers/createEntity'
import fs from 'fs'
describe('createModule', () => {
  it('should create a folder with that name', () => {
    const folderName = 'Users'
    const modulesPath = 'src/modules'
    createFolder(folderName, modulesPath)
    // check if the folder is created
    expect(fs.existsSync(`src/modules/${folderName}`)).toBe(true)
    // remove the folder after the test
    fs.rmdirSync(`src/modules/${folderName}`)
    expect(fs.existsSync(`src/modules/${folderName}`)).toBe(false)
  })
})
