import React,{useContext} from 'react'
import noteContext from './context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { note,updatenote } = props;

    const handleMouseEnter = (event) => {
        event.currentTarget.classList.add('fa-bounce');
    };

    // Handler function to remove the bounce animation class when cursor leaves
    const handleMouseLeave = (event) => {
        event.currentTarget.classList.remove('fa-bounce');
    };

    return (
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2"
                        onMouseEnter={handleMouseEnter} // Add bounce class on hover
                        onMouseLeave={handleMouseLeave} // Remove bounce class when cursor leaves
                        onClick={()=>{deleteNote(note._id)}}
                        />
                        <i className="fa-solid fa-file-pen mx-2"
                        onMouseEnter={handleMouseEnter} // Add bounce class on hover
                        onMouseLeave={handleMouseLeave} // Remove bounce class when cursor leaves
                        onClick={()=>{updatenote(note)}}
                        />
                    </div>
                </div>
            </div>
    )
}

export default Noteitem
