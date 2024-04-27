import { EntityCael } from '@/types/entity'
import { WritterUseCase } from '../../application'

export class WritterController {
  constructor(private writterUseCase: WritterUseCase) {
    this.createDomain = this.createDomain.bind(this)
  }

  public createDomain(entity: EntityCael, path: string): boolean {
    return this.writterUseCase.createDomain(entity, path)
  }
}
