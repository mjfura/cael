import { Attribute } from '@/types/attributes'
import { Method } from '@/types/methods'

export interface WritterRepository {
  createInterface(entityName: string, attributes: Attribute[]): string
  createInterfaceRepository(entityName: string, methods: Method[]): string
  createClass(
    entityName: string,
    className: string,
    attributes: Attribute[]
  ): string
}
