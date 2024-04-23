import fs from 'fs'
export const createFolder = (name: string, modulesPath: string) => {
  // Convert the name to camel case
  name = name
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toUpperCase() : letter.toLowerCase()
    })
    .replace(/\s+/g, '')
  if (!fs.existsSync(`${modulesPath}/${name}`)) {
    fs.mkdirSync(`${modulesPath}/${name}`)
  }
}
