import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //host of backend
  const host = "http://localhost:5000";
  // const s1 = {
  //     "name":"hritik",
  //     "class":"pg"
  // }
  // const [state,setState] = useState(s1);
  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"pandey",
  //             "class":"dr"
  //         })

  //     }, 1000);
  // }
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  //Get all notes
  const getNotes = async ()=> {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",// Metgod of fetch
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)

  }
  //Add note
  const addNote = async (title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",// Method of add
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body : JSON.stringify({title, description, tag})
    });
    const data = await response.json()
    setNotes(notes.concat(data))
  }
  //Update note
  const editNote = async (id, title, description, tag) => {
    //API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",// Method of fetch
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body : JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))

    for(let index = 0; index < newNotes.length; index++)
    {
      const element = newNotes[index];
      if(element._id === id)
      {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    
  }
  //Delete note
  const deleteNote = async (id)=>{

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",// Metgod of fetch
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    console.log(response)
    const newNote = notes.filter((note)=>{
      return note._id!==id
      
    })
    setNotes(newNote);
  }
  
  return (
    <NoteContext.Provider value={{ notes, addNote,editNote,deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
