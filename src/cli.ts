#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { cael } from '.'
import { EntityCael } from './types/entity'
import { ConfigCael } from './types'
console.log(
  'Hi 👋, WELCOME TO CAEL-ARCH 🤖!!!, please wait a moment while we process your entities...'
)
try {
  const configFile = path.join(process.cwd(), 'cael.config.json')
  if (!fs.existsSync(configFile)) {
    throw new Error(
      'Config file not found 🚨, please create a cael.config.json file in the root of your project 📁'
    )
  }
  console.log('PROCESSING...⏲')
  const configFileContent = fs.readFileSync(configFile, 'utf-8')
  const config = JSON.parse(configFileContent) as ConfigCael
  config.entities.forEach((entity: EntityCael) => {
    const response = cael.createAll(entity, config.path)
    if (!response.status) {
      throw new Error(response.message)
    }
  })
  console.log('PROCESS FINISHED ✅')
  console.log('THANKS FOR USING CAEL-ARCH ⚡️ !!!')
  console.log('HAPPY CODING!!!')
  console.log('Developed by: Marco Fura 💻')
} catch (e) {
  const error = e as Error
  console.error(error.message)
}
