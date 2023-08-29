import React from 'react'
import {useContext,useState} from 'react'
import noteContext from './context/notes/noteContext';

const AddNote = () => {
  const context=useContext(noteContext);
    const {addNote}=context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title: "", description: "", tag: ""})
    }
    const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
        <h2>Add a Note</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" value={note.title} name='title' id="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input type="text" className="form-control" value={note.description} name='description' id="description" placeholder="Enter description" onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="Description">Tag</label>
            <input type="text" className="form-control" name='tag' value={note.tag} id="tag" placeholder="Enter tag" onChange={onChange}/>
          </div>          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
