#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { cael } from '.'
import { EntityCael } from './types/entity'
import { ConfigCael } from './types'
console.log(
  'Hola desde cael-arch, receurda que debes tener un archivo cael.config.json en la raiz de tu proyecto para poder ejecutar el comando cael-arch create:domain'
)

const configFile = path.join(process.cwd(), 'cael.config.json')
if (fs.existsSync(configFile)) {
  console.log('El archivo cael.config.json existe en la raiz del proyecto')
  const config = JSON.parse(configFile) as ConfigCael
  config.entities.forEach((entity: EntityCael) => {
    cael.createDomain(entity, config.path)
  })
} else {
  console.log('El archivo cael.config.json no existe en la raiz del proyecto')
}
