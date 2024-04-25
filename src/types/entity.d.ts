import { Attribute } from './attributes'
import { Method } from './methods'

export interface EntityCael {
  name: string
  attributes: Attribute[]
  methods: Method[]
}
