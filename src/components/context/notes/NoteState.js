
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);





  const getNotes =async () => {

    //////  API CALL  ////////////////////

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGE4Yjg5MjRlZWFmMWExYzI0MjMzIn0sImlhdCI6MTY4OTc5MjYxMH0.bXnzctmR2Pchm_ESjtvVI2NO6DwdLDwUi0tVT_sYGfU"
    }});
    const json=await response.json()
    console.log(json)
    setNotes(json)
  }






  const addNote = async (title, description, tag) => {

    //////  API CALL  ////////////////////

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',

      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGE4Yjg5MjRlZWFmMWExYzI0MjMzIn0sImlhdCI6MTY4OTc5MjYxMH0.bXnzctmR2Pchm_ESjtvVI2NO6DwdLDwUi0tVT_sYGfU"
      },
      body: JSON.stringify({title,description,tag})
    });
    console.log(response)

    // const note = {
    //   "_id": "64ba9d11e3cd959a0f12fcf9",
    //   "user": "649da8b8924eeaf1a1c24233",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-07-21T14:58:25.991Z",
    //   "__v": 0
    // };
    const note=await response.json();
    setNotes(notes.concat(note));
  }








  const deleteNote =async (id) => {

    try{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGE4Yjg5MjRlZWFmMWExYzI0MjMzIn0sImlhdCI6MTY4OTc5MjYxMH0.bXnzctmR2Pchm_ESjtvVI2NO6DwdLDwUi0tVT_sYGfU"
      }
    });

    if (!response.ok) {
      // Handle the error if the response status is not within the successful range (2xx)
      console.error("Delete note failed:", response.statusText);
      return;
    }
    const json=response.json();
    console.log(json)
    
    console.log("Deleting the note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  
  }catch(error){
    console.error("Delete note API call failed:", error);
  }
  }










  const editNote =async (id, title, description, tag) => {

    //////  API CALLS  ////////////////////

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGE4Yjg5MjRlZWFmMWExYzI0MjMzIn0sImlhdCI6MTY4OTc5MjYxMH0.bXnzctmR2Pchm_ESjtvVI2NO6DwdLDwUi0tVT_sYGfU"
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json= await response.json();
  

    let newNotes=JSON.parse(JSON.stringify(notes))
  /////////////////   Logic to edit Notes  /////////////////

  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setNotes(newNotes);
}










////////////// Template for defining Context Hook /(API)  ///////////////////////

return (
  <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
    {props.children}
  </noteContext.Provider>
)
}

export default NoteState;