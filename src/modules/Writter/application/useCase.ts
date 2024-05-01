import { WritterRepository } from '../domain'
import { EntityCael } from '@/types/entity'
import { setCamelCase } from '../../../helpers/setCamelCase'
import { FileManagerRepository } from '@/modules/FileManager/domain'
import { Layers } from '@/types/keywords'
import { ResponseData, ResponseError } from '@/types'

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

  public createDomain(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    try {
      // Convert the module to camel case
      const module = setCamelCase(entity.name)
      // validate if the module folder exists
      if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
        const response = this.fileManagerRepository.createFolder(
          'modules',
          path
        )
        if (!response.status) {
          throw new Error(response.message)
        }
        console.log(response.message)
      }
      if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
        const response = this.fileManagerRepository.createFolder(
          module,
          `${path}/modules`
        )
        if (!response.status) {
          throw new Error(response.message)
        }
        console.log(response.message)
        const responseInterface = this.repository.createInterface(
          module + 'Entity',
          entity.attributes
        )
        if (!responseInterface.status) {
          throw new Error(responseInterface.message)
        }
        console.log(responseInterface.message)
        const responseFolder = this.fileManagerRepository.createFolder(
          'domain',
          `${path}/modules/${module}`
        )
        if (!responseFolder.status) {
          throw new Error(responseFolder.message)
        }
        console.log(responseFolder.message)
        const responseFile = this.fileManagerRepository.createFile(
          'entity',
          `${path}/modules/${module}/domain`,
          responseInterface.data.content as string
        )
        if (!responseFile.status) {
          throw new Error(responseFile.message)
        }
        console.log(responseFile.message)
        const responseRepository = this.repository.createInterfaceRepository(
          module,
          entity.methods
        )
        if (!responseRepository.status) {
          throw new Error(responseRepository.message)
        }
        console.log(responseRepository.message)

        const responseFileRepository = this.fileManagerRepository.createFile(
          'repository',
          `${path}/modules/${module}/domain`,
          responseRepository.data.content as string
        )
        if (!responseFileRepository.status) {
          throw new Error(responseFileRepository.message)
        }
        console.log(responseFileRepository.message)

        const responseClass = this.repository.createClass(
          module + 'Entity',
          module + 'Value',
          entity.attributes
        )
        if (!responseClass.status) {
          throw new Error(responseClass.message)
        }
        console.log(responseClass.message)
        const responseFileValue = this.fileManagerRepository.createFile(
          'value',
          `${path}/modules/${module}/domain`,
          responseClass.data.content as string
        )
        if (!responseFileValue.status) {
          throw new Error(responseFileValue.message)
        }
        console.log(responseFileValue.message)
        const responseBarrel = this.repository.createBarrel(Layers.DOMAIN)
        if (!responseBarrel.status) {
          throw new Error(responseBarrel.message)
        }
        console.log(responseBarrel.message)
        const responseBarrelFile = this.fileManagerRepository.createFile(
          'index',
          `${path}/modules/${module}/domain`,
          responseBarrel.data.content as string
        )
        if (!responseBarrelFile.status) {
          throw new Error(responseBarrelFile.message)
        }
        console.log(responseBarrelFile.message)
      }
      return {
        status: true,
        message: 'DOMAIN CREATED',
        data: {
          entity,
          path
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING DOMAIN'
      }
    }
  }

  public createApplicationLayer(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    try {
      const module = setCamelCase(entity.name)
      if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
        const responseFolderModule = this.fileManagerRepository.createFolder(
          'modules',
          path
        )
        if (!responseFolderModule.status) {
          throw new Error(responseFolderModule.message)
        }
        console.log(responseFolderModule.message)
      }
      if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
        const responseFolderEntity = this.fileManagerRepository.createFolder(
          module,
          `${path}/modules`
        )
        if (!responseFolderEntity.status) {
          throw new Error(responseFolderEntity.message)
        }
        console.log(responseFolderEntity.message)
      }
      const responseApplicationFolder = this.fileManagerRepository.createFolder(
        'application',
        `${path}/modules/${module}`
      )
      if (!responseApplicationFolder.status) {
        throw new Error(responseApplicationFolder.message)
      }
      console.log(responseApplicationFolder.message)

      const responseUseCaseClass = this.repository.createUseCaseClass(module)
      if (!responseUseCaseClass.status) {
        throw new Error(responseUseCaseClass.message)
      }
      console.log(responseUseCaseClass.message)
      const responseFile = this.fileManagerRepository.createFile(
        'useCase',
        `${path}/modules/${module}/application`,
        responseUseCaseClass.data.content as string
      )
      if (!responseFile.status) {
        throw new Error(responseFile.message)
      }
      console.log(responseFile.message)
      const responseBarrel = this.repository.createBarrel(Layers.APPLICATION)
      if (!responseBarrel.status) {
        throw new Error(responseBarrel.message)
      }
      console.log(responseBarrel.message)
      const responseBarrelFile = this.fileManagerRepository.createFile(
        'index',
        `${path}/modules/${module}/application`,
        responseBarrel.data.content as string
      )
      if (!responseBarrelFile.status) {
        throw new Error(responseBarrelFile.message)
      }
      console.log(responseBarrelFile.message)

      return {
        status: true,
        message: 'APPLICATION LAYER CREATED',
        data: {
          entity,
          path
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING APPLICATION LAYER'
      }
    }
  }

  public createInfrastructureLayer(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    try {
      const module = setCamelCase(entity.name)
      entity.defaultRepository = setCamelCase(entity.defaultRepository)
      if (!this.fileManagerRepository.existFile(`${path}/modules`)) {
        const responseFolder = this.fileManagerRepository.createFolder(
          'modules',
          path
        )
        if (!responseFolder.status) {
          throw new Error(responseFolder.message)
        }
        console.log(responseFolder.message)
      }
      if (!this.fileManagerRepository.existFile(`${path}/modules/${module}`)) {
        const responseFolder = this.fileManagerRepository.createFolder(
          module,
          `${path}/modules`
        )
        if (!responseFolder.status) {
          throw new Error(responseFolder.message)
        }
        console.log(responseFolder.message)
      }
      const responseInfraFolder = this.fileManagerRepository.createFolder(
        'infrastructure',
        `${path}/modules/${module}`
      )
      if (!responseInfraFolder.status) {
        throw new Error(responseInfraFolder.message)
      }
      console.log(responseInfraFolder.message)
      const responseRepoFolder = this.fileManagerRepository.createFolder(
        'repository',
        `${path}/modules/${module}/infrastructure`
      )
      if (!responseRepoFolder.status) {
        throw new Error(responseRepoFolder.message)
      }
      console.log(responseRepoFolder.message)

      const responseRepoClass = this.repository.createRepositoryClass(
        module,
        entity.methods,
        entity.defaultRepository
      )
      if (!responseRepoClass.status) {
        throw new Error(responseRepoClass.message)
      }
      console.log(responseRepoClass.message)
      const responseFileRepo = this.fileManagerRepository.createFile(
        `${entity.defaultRepository}Repository`,
        `${path}/modules/${module}/infrastructure/repository`,
        responseRepoClass.data.content as string
      )
      if (!responseFileRepo.status) {
        throw new Error(responseFileRepo.message)
      }
      console.log(responseFileRepo.message)

      const responseBarrel = this.repository.createBarrel(
        Layers.INFRASTRUCTURE,
        entity.defaultRepository
      )
      if (!responseBarrel.status) {
        throw new Error(responseBarrel.message)
      }
      console.log(responseBarrel.message)
      const responseBarrelFile = this.fileManagerRepository.createFile(
        'index',
        `${path}/modules/${module}/infrastructure/repository`,
        responseBarrel.data.content as string
      )
      if (!responseBarrelFile.status) {
        throw new Error(responseBarrelFile.message)
      }
      console.log(responseBarrelFile.message)

      return {
        status: true,
        message: 'INFRASTRUCTURE LAYER CREATED',
        data: {
          entity,
          path
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING INFRASTRUCTURE LAYER'
      }
    }
  }
}
