import { Attribute } from './entity'
import { ReturnKeyword } from './keywords'

export interface Method {
  name: string
  is_promise: boolean
  parameters: Attribute[]
  return_type: string | ReturnKeyword.ENTITY
}
