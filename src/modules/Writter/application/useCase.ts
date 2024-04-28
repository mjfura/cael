import { WritterRepository } from '../domain'
import { EntityCael } from '@/types/entity'
import { setCamelCase } from '../../../helpers/setCamelCase'
import { FileManagerRepository } from '@/modules/FileManager/domain'
import { Layers } from '@/types/keywords'

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
    const module = setCamelCase(entity.name)
    // validate if the module folder exists
    if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
      this.fileManagerRepository.createFolder('modules', path)
    }
    if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
      this.fileManagerRepository.createFolder(module, `${path}/modules`)
      const contentEntity = this.repository.createInterface(
        module + 'Entity',
        entity.attributes
      )
      this.fileManagerRepository.createFolder(
        'domain',
        `${path}/modules/${module}`
      )

      this.fileManagerRepository.createFile(
        'entity',
        `${path}/modules/${module}/domain`,
        contentEntity
      )
      const contentRepository = this.repository.createInterfaceRepository(
        module,
        entity.methods
      )
      this.fileManagerRepository.createFile(
        'repository',
        `${path}/modules/${module}/domain`,
        contentRepository
      )

      const contentValue = this.repository.createClass(
        module + 'Entity',
        module + 'Value',
        entity.attributes
      )
      this.fileManagerRepository.createFile(
        'value',
        `${path}/modules/${module}/domain`,
        contentValue
      )
      const contentBarrel = this.repository.createBarrel(Layers.DOMAIN)
      this.fileManagerRepository.createFile(
        'index',
        `${path}/modules/${module}/domain`,
        contentBarrel
      )
    }
    return true
  }
}
