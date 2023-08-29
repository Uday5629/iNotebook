import React from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useContext, useEffect, useRef,useState } from 'react'
import noteContext from './context/notes/noteContext';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        
      }
      const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
      }

    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Update Note</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title" className="col-form-label">Update Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="col-form-label">Update Description</label>
                                    <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag" className="col-form-label">Update Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Your Notes</h2>
            <div className='container row my-3'>
                {notes.length===0 && <div>No Notes to Display</div> }
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes