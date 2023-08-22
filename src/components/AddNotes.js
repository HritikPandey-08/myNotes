import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
const AddNotes = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added note successfully","success")

  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form className="my-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Title"
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
              name="description"
              value={note.description}
              onChange={handleChange}
              placeholder="Description"
              minLength={10}
              required

            />
            <label htmlFor="floatingPassword">
              Description</label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
              placeholder="Tag"
              minLength={3}
              value={note.tag}
            />
            <label htmlFor="floatingInput">Tag</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3"
            onClick={handleClick}
            disabled={note.description.length < 5 || note.title.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddNotes;
