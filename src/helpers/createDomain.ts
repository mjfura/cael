import fs from 'fs'
import { setCamelCase } from './setCamelCase'
import { createFolder } from './createFolder'
import { createFile } from './createFile'
import { EntityCael } from '@/types/entity'
import { ReturnKeyword } from '@/types/keywords'
export const createDomain = (path: string, entity: EntityCael) => {
  // Convert the module to camel case
  const module = setCamelCase(entity.name)
  // validate if the module folder exists
  if (!fs.existsSync(`${path}/modules`)) {
    createFolder('modules', path)
  }
  if (!fs.existsSync(`${path}/modules/${module}`)) {
    createFolder(module, `${path}/modules`)
    const attributes = entity.attributes
      .map((attr) => `${attr.name}:${attr.type}`)
      .join(',')

    const contentEntity = `
    export interface ${module}Entity {
        ${attributes}
    }
    `
    createFile('entity', `${path}/modules/${module}`, contentEntity)
    let methodsRepository = ``
    for (const method of entity.methods) {
      const params = method.parameters
        .map((param) => `${param.name}:${param.type}`)
        .join(',')
      if (method.is_promise === true) {
        methodsRepository += `\n${method.name}(${params}):Promise<${method.return_type === ReturnKeyword.ENTITY ? entity.name : method.return_type}>`
        continue
      }
      methodsRepository += `\n${method.name}(${params}):${method.return_type === ReturnKeyword.ENTITY ? entity.name : method.return_type}`
    }
    const contentRepository = `
    export interface ${module}Repository {
        ${methodsRepository}
    }
    `
    createFile('repository', `${path}/modules/${module}`, contentRepository)

    const classAttributes = entity.attributes
      .map((attr) => `public readonly ${attr.name}:${attr.type}`)
      .join('\n')

    const contentValue = `
    import { ${module}Entity } from './entity'
    export class ${module}Value implements ${module}Entity
    {
        ${classAttributes}
        constructor(data:${module}Entity){
            ${entity.attributes
              .map((key) => `this.${key.name}=data.${key.name}`)
              .join('\n')}
        }
    }
    `
    createFile('value', `${path}/modules/${module}`, contentValue)
  }
}
