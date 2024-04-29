import { Attribute } from '@/types/attributes'
import { Layers } from '@/types/keywords'
import { Method } from '@/types/methods'

export interface WritterRepository {
  createInterface(entityName: string, attributes: Attribute[]): string
  createInterfaceRepository(entityName: string, methods: Method[]): string
  createClass(
    entityName: string,
    className: string,
    attributes: Attribute[]
  ): string
  createBarrel(layer: Layers): string
  createUseCaseClass(entityName: string): string
}
