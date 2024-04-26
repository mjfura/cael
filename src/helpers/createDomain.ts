import fs from 'fs'
import { setCamelCase } from './setCamelCase'
import { createFolder } from './createFolder'
import { createFile } from './createFile'
import { EntityCael } from '@/types/entity'
import { createInterfaceString } from './createInterfaceString'
import { createInterfaceRepository } from './createInterfaceRepository'
import { createValueString } from './createValueString'
export const createDomain = (path: string, entity: EntityCael) => {
  // Convert the module to camel case
  const module = setCamelCase(entity.name)
  // validate if the module folder exists
  if (!fs.existsSync(`${path}/modules`)) {
    createFolder('modules', path)
  }
  if (!fs.existsSync(`${path}/modules/${module}`)) {
    createFolder(module, `${path}/modules`)
    const contentEntity = createInterfaceString(entity.attributes, module)
    createFile('entity', `${path}/modules/${module}`, contentEntity)
    const contentRepository = createInterfaceRepository(entity.methods, module)
    createFile('repository', `${path}/modules/${module}`, contentRepository)

    const contentValue = createValueString(entity.attributes, module)
    createFile('value', `${path}/modules/${module}`, contentValue)
  }
}
