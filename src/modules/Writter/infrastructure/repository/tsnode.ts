import { Attribute } from '@/types/attributes'
import { WritterRepository } from '../../domain'
import { Method } from '@/types/methods'
import { Layers, ReturnKeyword } from '@/types/keywords'

export class TsNodeRepository implements WritterRepository {
  createInterfaceRepository(entityName: string, methods: Method[]): string {
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

  createClass(
    entityName: string,
    className: string,
    attributes: Attribute[]
  ): string {
    const classAttributes = attributes
      .map((attr) => `\n    public readonly ${attr.name}:${attr.type}`)
      .join('')

    const contentValue = `
import { ${entityName} } from './entity'
export class ${className} implements ${entityName}
{${classAttributes}
    constructor(data:${entityName}){${attributes
      .map((key) => `\n        this.${key.name}=data.${key.name}`)
      .join('')}
    }
}
    `
    return contentValue
  }

  createInterface(entityName: string, attributes: Attribute[]): string {
    const attrs =
      '\n   ' +
      attributes.map((attr) => `${attr.name}:${attr.type}`).join('\n   ')

    const contentEntity = `
export interface ${entityName} {${attrs}
}
    `
    return contentEntity
  }

  createBarrel(layer: Layers): string {
    let contentBarrel = ''
    if (layer === Layers.DOMAIN) {
      contentBarrel = `
export * from './entity'
export * from './repository'
export * from './value'
      `
    }
    if (layer === Layers.APPLICATION) {
      contentBarrel = `
export * from './useCase'
      `
    }
    return contentBarrel
  }

  createUseCaseClass(entityName: string): string {
    const contentUseCase = `
import { ${entityName}Repository } from '../domain'
export class ${entityName}UseCase {
  public readonly repository: ${entityName}Repository
  constructor(repository: ${entityName}Repository) {
    this.repository = repository
  }
}
  `
    return contentUseCase
  }
}
