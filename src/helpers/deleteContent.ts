import fs from 'fs'
export const deleteContent = (path: string) => {
  fs.readdirSync(path).forEach((file) => {
    const filePath = `${path}/${file}`
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true })
    } else {
      fs.unlinkSync(filePath)
    }
  })
}
