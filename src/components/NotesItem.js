import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const {deleteNote} = useContext(NoteContext);

  const note = props.note;
  const updateNote = props.updateNote;
  const date = new Date(note.date).toUTCString().slice(0,16);

  return (
    <div className="col-md-4">
        <div className="card my-3" style={{width: "100%", backgroundColor: "#d9ced0", borderRadius: '25px', border: "dotted"}}>
            <div className="card-body" style={{boxShadow: '0px 0px 10px currentColor', borderRadius: '25px'}}>
              <span className="translate-middle badge text-bg-danger" style={{position:"relative", left:"40px"}}>{date}</span>
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                {/* <i className="fa-solid fa-file-pen"></i> */}
                <div className="d-flex justify-content-center">
                    <a href="/" className="btn btn-primary mx-2" onClick={(element)=>{element.preventDefault(); updateNote(note);}}>Edit <i className="fas fa-keyboard"></i></a>
                    <a href="/" className="btn btn-outline-danger mx-2" onClick={(element)=>{deleteNote(note._id); element.preventDefault();}}>Delete <i className="fas fa-trash"></i></a>
                    <a href="/" className="btn btn-success mx-2">Share <i className="far fa-save"></i></a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NoteItem;
