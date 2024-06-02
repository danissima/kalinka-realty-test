import type { TObjectType } from "~/pages/objects/[id].vue"

export default function useObject() {
  function getTypeHintClasses(objectType: TObjectType) {
    const typeToClass = objectType.toLowerCase()

    return  {
      'type-hint': true,
      [`type-hint_${typeToClass}`]: !!objectType,
    }
  }

  function getTypeThemeClasses(blockClass: string, objectType: TObjectType) {
    const typeToClass = objectType.toLowerCase()

    return {
      [blockClass]: true,
      [`${blockClass}_${typeToClass}`]: !!objectType,
    }
  }

  return {
    getTypeHintClasses,
    getTypeThemeClasses,
  }
}