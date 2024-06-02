import type { LocationQueryValue } from "vue-router"

export const routerHelpers = {
  queryParamToArray,
}

function queryParamToArray(param?: LocationQueryValue | LocationQueryValue[]) {
  if (!param) {
    return []
  }

  return Array.isArray(param) ? param : [param]
}