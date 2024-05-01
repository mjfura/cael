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

  public createApplicationLayer(entity: EntityCael, path: string) {
    const module = setCamelCase(entity.name)
    if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
      this.fileManagerRepository.createFolder('modules', path)
    }
    if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
      this.fileManagerRepository.createFolder(module, `${path}/modules`)
    }
    this.fileManagerRepository.createFolder(
      'application',
      `${path}/modules/${module}`
    )

    const contentUseCase = this.repository.createUseCaseClass(module)
    this.fileManagerRepository.createFile(
      'useCase',
      `${path}/modules/${module}/application`,
      contentUseCase
    )

    const contentBarrel = this.repository.createBarrel(Layers.APPLICATION)
    this.fileManagerRepository.createFile(
      'index',
      `${path}/modules/${module}/application`,
      contentBarrel
    )

    return true
  }

  public createInfrastructureLayer(entity: EntityCael, path: string) {
    const module = setCamelCase(entity.name)
    entity.defaultRepository = setCamelCase(entity.defaultRepository)
    if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
      this.fileManagerRepository.createFolder('modules', path)
    }
    if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
      this.fileManagerRepository.createFolder(module, `${path}/modules`)
    }
    this.fileManagerRepository.createFolder(
      'infrastructure',
      `${path}/modules/${module}`
    )
    this.fileManagerRepository.createFolder(
      'repository',
      `${path}/modules/${module}/infrastructure`
    )

    const contentRepository = this.repository.createRepositoryClass(
      module,
      entity.methods,
      entity.defaultRepository
    )
    this.fileManagerRepository.createFile(
      `${entity.defaultRepository}Repository`,
      `${path}/modules/${module}/infrastructure/repository`,
      contentRepository
    )

    const contentBarrel = this.repository.createBarrel(
      Layers.INFRASTRUCTURE,
      entity.defaultRepository
    )
    this.fileManagerRepository.createFile(
      'index',
      `${path}/modules/${module}/infrastructure/repository`,
      contentBarrel
    )

    return true
  }
}
