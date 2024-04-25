import { createFile } from '@/helpers/createFile'
import { deleteContent } from '@/helpers/deleteContent'
import fs from 'fs'
describe('createFile', () => {
  const PATH = 'demos/createFile'
  afterEach(() => {
    // remove the file after each test
    deleteContent(PATH)
  })
  it(`should create a file with that name in ${PATH} folder`, () => {
    // create test for createFile function
    const fileName = 'entity'
    createFile(fileName, PATH)
    // check if the file is created
    expect(fs.existsSync(`${PATH}/${fileName}.ts`)).toBe(true)
  })
  it('should create a file with a specific content', () => {
    // create test for createFile function
    const fileName = 'entity'
    const content = `interface{
        name:string,
        age:number
    }`
    createFile(fileName, PATH, content)
    // check if the file is created
    expect(fs.readFileSync(`${PATH}/${fileName}.ts`, 'utf-8')).toContain(
      content
    )
  })
})
