import { Status } from './types'
export const SET_NOTE = 'SET_NOTE'
export const ChangeIsFAv = 'ChangeIsFAv'
export const SetCur = 'SetCur'

export const ADD_NOTE = 'ADD_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const LOADING_NOTES = 'LOADING_NOTES'

let initialState = {
  notes: [],
  status: Status.LOADING,
  isFav: true,
}

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_NOTES:
      state.status = action.status
      if (action.status === Status.ERROR) {
        return {}
      }
      const loadedNotes = action.loadingRes.map(el => {
        return {
          id: el.id,
          title: el.title,
          completed: el.completed,
        }
      })
      return {
        ...state,
        notes: loadedNotes,
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.data],
      }
    case UPDATE_NOTE:
      const index = state.notes.findIndex(res => res.id === action.data.id)
      const newNotes = [
        ...state.notes.slice(0, index),
        action.data,
        ...state.notes.slice(index + 1),
      ]
      return {
        ...state,
        notes: newNotes,
      }

    case DELETE_NOTE:
      const indexToDel = state.notes.findIndex(res => res.id === action.id)
      const nNotes = [
        ...state.notes.slice(0, indexToDel),
        ...state.notes.slice(indexToDel + 1),
      ]
      return {
        ...state,
        notes: nNotes,
      }
    default:
      return state
  }
}

export default notesReducer
