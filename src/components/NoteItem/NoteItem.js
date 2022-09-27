import React, { useState, useEffect } from 'react'
import { updateNoteAC, deleteNoteAC } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export const NoteItem = ({ note }) => {
  const dispatch = useDispatch()
  const [curPost, setCurPost] = useState('')

  const handleOnChange = e => {
    setCurPost(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    dispatch(updateNoteAC(curPost, note.id, false))
  }

  const handleDelete = e => {
    e.preventDefault()
    dispatch(deleteNoteAC(note.id))
  }

  useEffect(() => {
    if (note.title) {
      setCurPost(note.title)
    }
  }, [note.title])

  return (
    <>
      <div className='NoteItem '>
        <div>
          <form onSubmit={handleOnSubmit}>
            <input
              className={'simpleInput' + ' ' + 'rNote'}
              type='text'
              value={curPost}
              onChange={handleOnChange}
            ></input>
            <input type='submit' hidden />
            <button onClick={handleDelete} className='buttonStyle'>
              ❌
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
