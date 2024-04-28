import { Attribute } from './entity'

export interface Method {
  name: string
  is_promise: boolean
  parameters: Attribute[]
  return_type: string
}
