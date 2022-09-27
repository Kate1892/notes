import { ADD_NOTE } from './notes-reducer'

export function emptyStrFilter() {
  return function (next) {
    return function (action) {
      if (action.type === ADD_NOTE) {
        if (action.data.title.trim() === '') {
          return
        }
      }
      return next(action)
    }
  }
}
