import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const {deleteNote} = useContext(NoteContext);

  const note = props.note;
  let date = note.date;
  const year = date.slice(0,4);
  const month = date.slice(5,7);
  const day = date.slice(8, 10);
  date = day+"/"+month+"/"+year;

  return (
    <div className="col-md-4">
        <div className="card my-3" style={{width: "100%", backgroundColor: "#d9ced0", borderRadius: '25px', border: "dotted"}}>
            <div className="card-body" style={{boxShadow: '0px 0px 10px currentColor', borderRadius: '25px'}}>
              <span className="translate-middle badge text-bg-danger" style={{position:"relative", left:"28px"}}>{date}</span>
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                {/* <i className="fa-solid fa-file-pen"></i> */}
                <div className="d-flex justify-content-center">
                    <a href="/" className="btn btn-primary mx-2">Edit <i className="fas fa-keyboard"></i></a>
                    <a href="/" className="btn btn-outline-danger mx-2" onClick={(element)=>{deleteNote(note._id); element.preventDefault();}}>Delete <i className="fas fa-trash"></i></a>
                    <a href="/" className="btn btn-success mx-2">Save <i className="far fa-save"></i></a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NoteItem;
