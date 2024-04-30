import { EntityCael } from '@/types/entity'
import { WritterUseCase } from '../../application'

export class WritterController {
  constructor(private writterUseCase: WritterUseCase) {
    this.createDomain = this.createDomain.bind(this)
    this.createApplication = this.createApplication.bind(this)
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
}
