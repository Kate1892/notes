import { useState, useEffect } from 'react'
import './App.css'
import { NoteItem } from './components/NoteItem/NoteItem'
import { connect } from 'react-redux'
import { addNoteAC, loadingNotes } from './redux/actions'
import uniqid from 'uniqid'
import { Status } from './redux/types'

function App(props) {
  const [post, setPost] = useState('')

  const handleChange = e => {
    setPost(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const id = uniqid()
    props.addNote(post, id, false)
    setPost('')
  }

  useEffect(() => {
    props.loadNotes()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <h3>Notes</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          className='simpleInput'
          type='text'
          value={post}
          onChange={handleChange}
        ></input>
        <input type='submit' hidden />
      </form>
      {props.status === Status.ERROR ? (
        <Plug />
      ) : props.status === Status.LOADING ? (
        <Plug />
      ) : props.notes ? (
        props.notes.map(el => <NoteItem key={el.id} note={el} />)
      ) : (
        <Plug />
      )}
    </div>
  )
}

const Plug = () => {
  return <div style={{ width: '100%', height: '100%' }}></div>
}

function mapStateToProps(state) {
  return {
    status: state.notesReducer.status,
    notes: state.notesReducer.notes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNote: (post, id, completed) => dispatch(addNoteAC(post, id, completed)),
    loadNotes: () => dispatch(loadingNotes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
