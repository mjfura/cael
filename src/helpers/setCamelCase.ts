export const setCamelCase = (name: string): string => {
  name = name.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toUpperCase() : letter.toLowerCase()
  })
  return name
}
