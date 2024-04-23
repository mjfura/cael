import fs from 'fs'
export const createFolder = (name: string, modulesPath: string) => {
  // create a folder with the name
  name = name.charAt(0).toUpperCase() + name.slice(1)
  if (!fs.existsSync(`${modulesPath}/${name}`)) {
    fs.mkdirSync(`${modulesPath}/${name}`)
  }
}
