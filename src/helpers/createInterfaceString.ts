import { Attribute } from '@/types/attributes'

export const createInterfaceString = (
  attrs: Attribute[],
  name: string
): string => {
  const attributes =
    '\n   ' + attrs.map((attr) => `${attr.name}:${attr.type}`).join('\n   ')

  const contentEntity = `
export interface ${name}Entity {${attributes}
}
    `
  return contentEntity
}
