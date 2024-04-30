import { Attribute } from './attributes'
import { Method } from './methods'

export interface EntityCael {
  name: string
  defaultRepository: string
  attributes: Attribute[]
  methods: Method[]
}
