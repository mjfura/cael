import { ResponseData, ResponseError } from '@/types'
import { Attribute } from '@/types/attributes'
import { Layers } from '@/types/keywords'
import { Method } from '@/types/methods'

export interface WritterRepository {
  createInterface(
    entityName: string,
    attributes: Attribute[]
  ): ResponseData | ResponseError
  createInterfaceRepository(
    entityName: string,
    methods: Method[]
  ): ResponseData | ResponseError
  createClass(
    entityName: string,
    className: string,
    attributes: Attribute[]
  ): ResponseData | ResponseError
  createBarrel(
    layer: Layers,
    defaultRepository?: string
  ): ResponseData | ResponseError
  createUseCaseClass(entityName: string): ResponseData | ResponseError
  createRepositoryClass(
    entityName: string,
    methods: Method[],
    infrastructure: string
  ): ResponseData | ResponseError
}
