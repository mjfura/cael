import { Attribute } from '@/types/attributes'

export const createValueString = (
  attributes: Attribute[],
  nameEntity: string
): string => {
  const classAttributes = attributes
    .map((attr) => `\n    public readonly ${attr.name}:${attr.type}`)
    .join('')

  const contentValue = `
import { ${nameEntity}Entity } from './entity'
export class ${nameEntity}Value implements ${nameEntity}Entity
{${classAttributes}
    constructor(data:${nameEntity}Entity){${attributes
      .map((key) => `\n        this.${key.name}=data.${key.name}`)
      .join('')}
    }
}
    `
  return contentValue
}
