import React, { useState, useContext } from "react";
import Notes from "./Notes";
import NoteContext from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [newNote, setNewNote] = useState({ title: "", description: "", tag: "", date: new Date().toLocaleDateString("en-IN") });

  const handleSubmit = (element) => {
    addNote(newNote);
    element.preventDefault(); //to prevent reload of the element on submit.
  };

  const handleStateChange = (element) => {
    setNewNote({ ...newNote, [element.target.name]: element.target.value });
  };

  return (
    <>
      <h1 className="text-light">Add a note</h1>
      {/* <form className="my-3" style={{ backgroundColor: "dimgrey", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px", padding: "50px" }}> */}
      <form className="my-3" style={{ background: "rgba(0, 0, 0, 0.1)", borderRadius: "16px", boxShadow: "40px 40px 40px rgba(0, 0, 0, 0.09)", backdropFilter: "blur(4.9px)", WebkitBackdropFilter: "blur(4.9px)", padding: "50px" }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Title</strong>
          </label>
          <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none" }} type="text" className="form-control no-select text-white" id="title" name="title" onChange={handleStateChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <strong>Description</strong>
          </label>
          <textarea style={{ background: "transparent", borderRadius: "10px", border: "1px solid white", outlineColor: "none" }} rows="10" cols="50" className="form-control no-select text-white" id="description" name="description" onChange={handleStateChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <strong>Tag</strong>
            <input style={{ background: "transparent", border: "none", borderRadius: "0px", borderBottom: "1px solid white", outline: "none !important" }} type="text" className="form-control text-white" id="tag" name="tag" onChange={handleStateChange} />
          </label>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-success" onClick={handleSubmit} style={{ width: "100%" }}>
          Add Note
        </button>
      </form>
      <Notes />
    </>
  );
}

export default AddNote;
