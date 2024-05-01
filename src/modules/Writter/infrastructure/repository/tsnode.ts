import { Attribute } from '@/types/attributes'
import { WritterRepository } from '../../domain'
import { Method } from '@/types/methods'
import { Layers, ReturnKeyword } from '@/types/keywords'
import { ResponseData, ResponseError } from '@/types'

export class TsNodeRepository implements WritterRepository {
  createInterfaceRepository(
    entityName: string,
    methods: Method[]
  ): ResponseData | ResponseError {
    try {
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
      return {
        status: true,
        message: 'Interface content generated',
        data: {
          content: contentRepository
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message:
          error.message ?? 'ERROR GENERATING INTERFACE REPOSITORY CONTENT'
      }
    }
  }

  createClass(
    entityName: string,
    className: string,
    attributes: Attribute[]
  ): ResponseData | ResponseError {
    try {
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
      return {
        status: true,
        message: 'Class content generated',
        data: {
          content: contentValue
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING CLASS CONTENT'
      }
    }
  }

  createInterface(
    entityName: string,
    attributes: Attribute[]
  ): ResponseData | ResponseError {
    try {
      const attrs =
        '\n   ' +
        attributes.map((attr) => `${attr.name}:${attr.type}`).join('\n   ')

      const contentEntity = `
  export interface ${entityName} {${attrs}
  }
      `
      return {
        status: true,
        message: 'Interface content generated',
        data: {
          content: contentEntity
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING INTERFACE CONTENT'
      }
    }
  }

  createBarrel(
    layer: Layers,
    defaultRepository?: string
  ): ResponseData | ResponseError {
    try {
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
      if (layer === Layers.INFRASTRUCTURE) {
        contentBarrel = `
  export * from './${defaultRepository}Repository'
        `
      }
      return {
        status: true,
        message: 'Barrel content generated',
        data: {
          content: contentBarrel
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING BARREL CONTENT'
      }
    }
  }

  createUseCaseClass(entityName: string): ResponseData | ResponseError {
    try {
      const contentUseCase = `
  import { ${entityName}Repository } from '../domain'
  export class ${entityName}UseCase {
    public readonly repository: ${entityName}Repository
    constructor(repository: ${entityName}Repository) {
      this.repository = repository
    }
  }
    `
      return {
        status: true,
        message: 'Use case content generated',
        data: {
          content: contentUseCase
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING USE CASE CONTENT'
      }
    }
  }

  createRepositoryClass(
    entityName: string,
    methods: Method[],
    infrastructure: string
  ): ResponseData | ResponseError {
    try {
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
          methodsRepository += `\n    ${method.name}(${params}):Promise<${returnValue}>{}`
          continue
        }
        methodsRepository += `\n    ${method.name}(${params}):${returnValue}{}`
      }
      const contentRepository = `${hasEntity ? `import { ${entityName}Entity, ${entityName}Repository } from '../../domain'\n` : `import { ${entityName}Repository } from '../../domain'\n`}
  export class ${infrastructure}Repository implements ${entityName}Repository {${methodsRepository}
  }
      `
      return {
        status: true,
        message: 'Repository content generated',
        data: {
          content: contentRepository
        }
      }
    } catch (e) {
      const error = e as Error
      return {
        status: false,
        message: error.message ?? 'ERROR GENERATING REPOSITORY CLASS CONTENT'
      }
    }
  }
}
