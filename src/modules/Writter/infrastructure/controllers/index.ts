import { EntityCael } from '@/types/entity'
import { WritterUseCase } from '../../application'

export class WritterController {
  constructor(private writterUseCase: WritterUseCase) {
    this.createDomain = this.createDomain.bind(this)
    this.createApplication = this.createApplication.bind(this)
    this.createInfrastructure = this.createInfrastructure.bind(this)
  }

  public createDomain(entity: EntityCael, path: string): boolean {
    return this.writterUseCase.createDomain(entity, path)
  }

  public createApplication(entity: EntityCael, path: string): boolean {
    return this.writterUseCase.createApplicationLayer(entity, path)
  }

  public createInfrastructure(entity: EntityCael, path: string): boolean {
    return this.writterUseCase.createInfrastructureLayer(entity, path)
  }

  public createAll(entity: EntityCael, path: string): boolean {
    this.writterUseCase.createDomain(entity, path)
    this.writterUseCase.createApplicationLayer(entity, path)
    return this.writterUseCase.createInfrastructureLayer(entity, path)
  }
}
