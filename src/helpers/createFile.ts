import fs from 'fs'
export const createFile = (name: string, path: string, content?: string) => {
  // create a file with the name
  if (!fs.existsSync(`${path}/${name}.ts`)) {
    fs.writeFileSync(`${path}/${name}.ts`, content ?? '')
  }
}
