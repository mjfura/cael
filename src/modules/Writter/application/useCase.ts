import { WritterRepository } from '../domain'
import { EntityCael } from '@/types/entity'
import { setCamelCase } from '../../../helpers/setCamelCase'
import { FileManagerRepository } from '@/modules/FileManager/domain'

export class WritterUseCase {
  public readonly repository: WritterRepository
  public readonly fileManagerRepository: FileManagerRepository
  constructor(
    repository: WritterRepository,
    fileManagerRepository: FileManagerRepository
  ) {
    this.repository = repository
    this.fileManagerRepository = fileManagerRepository
  }

  public createDomain(entity: EntityCael, path: string) {
    // Convert the module to camel case
    console.log('createDomain')
    const module = setCamelCase(entity.name)
    // validate if the module folder exists
    if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
      console.log('createFolder')
      this.fileManagerRepository.createFolder('modules', path)
    }
    if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
      this.fileManagerRepository.createFolder(module, `${path}/modules`)
      const contentEntity = this.repository.createInterface(
        module + 'Entity',
        entity.attributes
      )
      this.fileManagerRepository.createFile(
        'entity',
        `${path}/modules/${module}`,
        contentEntity
      )
      const contentRepository = this.repository.createInterfaceRepository(
        module,
        entity.methods
      )
      this.fileManagerRepository.createFile(
        'repository',
        `${path}/modules/${module}`,
        contentRepository
      )

      const contentValue = this.repository.createClass(
        module + 'Entity',
        module + 'Value',
        entity.attributes
      )
      this.fileManagerRepository.createFile(
        'value',
        `${path}/modules/${module}`,
        contentValue
      )
    }
    return true
  }
}
