import { FsFileManagerRepository } from '@/modules/FileManager/infrastructure/repository'
import { WritterUseCase } from '@/modules/Writter/application'
import { WritterController } from '@/modules/Writter/infrastructure/controllers'
import { TsNodeRepository } from '@/modules/Writter/infrastructure/repository'
const writterRepository = new TsNodeRepository()
const fileManagerRepository = new FsFileManagerRepository()
const writterUseCase = new WritterUseCase(
  writterRepository,
  fileManagerRepository
)
export const cael = new WritterController(writterUseCase)
