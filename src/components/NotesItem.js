import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NotesItem(props) {
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  //Function to delete the note
  const handleClick = () => {
    deleteNote(note._id);
    props.showAlert("Deleted Note successfully","success");
  };
  //Function when someone click on edit button
  //to launch the modal (form to update the note)
  const launchModal = ()=>{
    updateNote(note);
  }
  
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center gap-2">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fas fa-trash-alt mx-2 pb-2"
                onClick={handleClick}
              ></i>
              <i className="fas fa-edit mx-2 pb-2" onClick={launchModal}></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesItem;
