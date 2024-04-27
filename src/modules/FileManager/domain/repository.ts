export interface FileManagerRepository {
  createFolder(name: string, path: string): void
  existFile(path: string): boolean
  createFile(name: string, path: string, content?: string): void
}
