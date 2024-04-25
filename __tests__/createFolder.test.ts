// create test for createEntity function
import { createFolder } from '@/helpers/createFolder'
import { deleteContent } from '@/helpers/deleteContent'
import fs from 'fs'
describe('createFolder', () => {
  const PATH = 'demos/createFolder'
  afterEach(() => {
    // remove the folder after each test
    deleteContent(PATH)
  })
  it(`should create a folder with that name in ${PATH}`, () => {
    const folderName = 'main users'
    createFolder(folderName, PATH)
    // check if the folder is created
    expect(fs.existsSync(`${PATH}/MainUsers`)).toBe(true)
  })
})
