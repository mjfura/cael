import { ReturnKeyword } from '@/types/keywords'
import { Method } from '@/types/methods'

export const createInterfaceRepository = (
  methods: Method[],
  entityName: string
): string => {
  let methodsRepository = ``
  let hasEntity = false
  for (const method of methods) {
    const params = method.parameters
      .map((param) => `${param.name}:${param.type}`)
      .join(',')
    let returnValue = method.return_type
    if (method.return_type === ReturnKeyword.ENTITY) {
      returnValue = entityName + 'Entity'
      hasEntity = true
    }
    if (method.is_promise === true) {
      methodsRepository += `\n    ${method.name}(${params}):Promise<${returnValue}>`
      continue
    }
    methodsRepository += `\n    ${method.name}(${params}):${returnValue}`
  }
  const contentRepository = `${hasEntity ? `import { ${entityName}Entity } from './entity'\n` : ''}
export interface ${entityName}Repository {${methodsRepository}
}
    `
  return contentRepository
}
