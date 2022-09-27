import {
  LOADING_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from './notes-reducer'
import axios from 'axios'
import { Status } from './types'

export function loadingNotes() {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      )
      dispatch({
        type: LOADING_NOTES,
        loadingRes: data,
        status: Status.SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: LOADING_NOTES,
        status: Status.ERROR,
      })
    }
  }
}

export function addNoteAC(text, id, completed) {
  return {
    type: ADD_NOTE,
    data: {
      id,
      title: text,
      completed,
    },
  }
}

export function updateNoteAC(text, id, completed) {
  return {
    type: UPDATE_NOTE,
    data: {
      id,
      title: text,
      completed,
    },
  }
}

export function deleteNoteAC(id) {
  return {
    type: DELETE_NOTE,
    id,
  }
}
