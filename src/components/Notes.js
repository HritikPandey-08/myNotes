import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

function Notes(props) {
  const history =  useNavigate();
  const userDataContext = useContext(UserContext);
  const {userData, getUserData } = userDataContext;
  const context = useContext(NoteContext);
  const {showAlert} = props;
 
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
      getUserData();
    }
    else
    {
      history('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  //Creating state for notes
  const [note, setNote] = useState({ id: "",etitle: "", edescription: "", etag: "" });
  // const [user, setuser] = useState({ name: "", email: ""});

  //Updating the notes
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id, 
      etitle:currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };


  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Updated successfully","success")
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
     <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref = {ref}
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleChange}
                    placeholder="Title"
                    value = {note.etitle}
                    minLength={5}
                    required
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    name="edescription"
                    onChange={handleChange}
                    placeholder="Description"
                    value={note.edescription}
                    minLength={10}
                    required
                  />
                  <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="etag"
                    onChange={handleChange}
                    minLength={3}
                    placeholder="Tag"
                    value={note.etag}
                  />
                  <label htmlFor="floatingInput">Tag</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.edescription.length < 5 || note.etitle.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && "No notes to display"}
        </div>
        { notes.map((note) => {
          return (
            <NotesItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
