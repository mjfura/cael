import { ResponseData, ResponseError } from '@/types'

export interface FileManagerRepository {
  createFolder(name: string, path: string): ResponseData | ResponseError
  existFile(path: string): boolean
  createFile(
    name: string,
    path: string,
    content?: string
  ): ResponseData | ResponseError
}
