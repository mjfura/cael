import { ResponseData, ResponseError } from '@/types'
import { FileManagerRepository } from '../../domain'
import fs from 'fs'
export class FsFileManagerRepository implements FileManagerRepository {
  createFolder(name: string, path: string): ResponseData | ResponseError {
    try {
      let message = `Folder already exists`
      if (!fs.existsSync(`${path}/${name}`)) {
        fs.mkdirSync(`${path}/${name}`)
        message = `Folder ${name} created successfully ✅`
      }
      return {
        status: true,
        message,
        data: {
          path: `${path}/${name}`,
          folderName: name
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message
      }
    }
  }

  existFile(path: string): boolean {
    return fs.existsSync(path)
  }

  createFile(
    name: string,
    path: string,
    content?: string
  ): ResponseData | ResponseError {
    try {
      let message = `File already exists`
      if (!fs.existsSync(`${path}/${name}.ts`)) {
        fs.writeFileSync(`${path}/${name}.ts`, content ?? '')
        message = `File ${name} created successfully ✅`
      }
      return {
        status: true,
        message,
        data: {
          path: `${path}/${name}.ts`,
          fileName: name
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message
      }
    }
  }
}
