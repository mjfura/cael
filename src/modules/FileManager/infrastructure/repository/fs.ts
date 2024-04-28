import { FileManagerRepository } from '../../domain'
import fs from 'fs'
export class FsFileManagerRepository implements FileManagerRepository {
  createFolder(name: string, path: string): void {
    if (!fs.existsSync(`${path}/${name}`)) {
      fs.mkdirSync(`${path}/${name}`)
    }
  }

  existFile(path: string): boolean {
    return fs.existsSync(path)
  }

  createFile(name: string, path: string, content?: string): void {
    if (!fs.existsSync(`${path}/${name}.ts`)) {
      fs.writeFileSync(`${path}/${name}.ts`, content ?? '')
    }
  }
}
