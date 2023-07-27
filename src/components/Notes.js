import React, {useState, useContext, useEffect, useRef} from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NotesItem';

function Notes(){
    const context = useContext(NoteContext);
    const {myNotes, fetchNotes, editNote} = context;
    const [newNote, setNewNote] = useState({id: "", etitle: "",  edescription: "", etag: "", edate: new Date().toLocaleDateString("en-IN")});
    
    useEffect(() => {
        fetchNotes()
    }, []);

    const refModal = useRef(null);
    const refSubmit = useRef(null);
    const updateNote = (currentNote)=>{
        refModal.current.click();
        // console.log(currentNote);
        setNewNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
            edate: currentNote.date
        });
    }

    const handleSubmit = (element) => {
        refSubmit.current.click();
        editNote(newNote.id, newNote.etitle, newNote.edescription, newNote.etag, newNote.edate);
    }

    const handleStateChange = (element) => {
        setNewNote({...newNote, [element.target.name]: element.target.value});
    }


    return (
        <>
            <button ref={refModal} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                    {/* <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button> */}
                </div>
                <div className="modal-body">
                     <div className="mb-3">
                        <label htmlFor="etitle" className="form-label"><strong>Title</strong></label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={newNote.etitle} onChange={handleStateChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edescription" className="form-label"><strong>Description</strong></label>
                        <textarea rows="5" cols="50" className="form-control" id="edescription" name="edescription" value={newNote.edescription} onChange={handleStateChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etag" className="form-label">
                            <strong>Tag</strong>
                            <input type="text" className="form-control" id = "etag" name = "etag"  value={newNote.etag} onChange={handleStateChange}/>
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button ref={refSubmit} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <div className="row my-3 mx-3">
                <h2 style={{textAlign: "center", marginBottom: "20px"}}>My Notes</h2>
                    {
                        myNotes.map((note) => {
                            return <NoteItem key = {note._id} note={note} updateNote={updateNote}/>
                        })
                    }
            </div>        
        </>
    );
}

export default Notes;