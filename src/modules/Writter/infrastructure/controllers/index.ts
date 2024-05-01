import { EntityCael } from '@/types/entity'
import { WritterUseCase } from '../../application'
import { ResponseData, ResponseError } from '@/types'

export class WritterController {
  constructor(private writterUseCase: WritterUseCase) {
    this.createDomain = this.createDomain.bind(this)
    this.createApplication = this.createApplication.bind(this)
    this.createInfrastructure = this.createInfrastructure.bind(this)
  }

  public createDomain(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    return this.writterUseCase.createDomain(entity, path)
  }

  public createApplication(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    return this.writterUseCase.createApplicationLayer(entity, path)
  }

  public createInfrastructure(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    return this.writterUseCase.createInfrastructureLayer(entity, path)
  }

  public createAll(
    entity: EntityCael,
    path: string
  ): ResponseData | ResponseError {
    try {
      const responseDomain = this.writterUseCase.createDomain(entity, path)
      if (!responseDomain.status) {
        throw new Error(responseDomain.message)
      }
      console.log(responseDomain.message)
      const responseApplication = this.writterUseCase.createApplicationLayer(
        entity,
        path
      )
      if (!responseApplication.status) {
        throw new Error(responseApplication.message)
      }
      console.log(responseApplication.message)
      const responseInfra = this.writterUseCase.createInfrastructureLayer(
        entity,
        path
      )
      if (!responseInfra.status) {
        throw new Error(responseInfra.message)
      }
      console.log(responseInfra.message)
      return {
        status: true,
        message: 'All layers created successfully',
        data: {
          domain: responseDomain,
          application: responseApplication,
          infrastructure: responseInfra
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
