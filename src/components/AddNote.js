import React, {useState, useContext} from 'react';
import Notes from './Notes';
import NoteContext from '../context/notes/noteContext';

function AddNote(){
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [newNote, setNewNote] = useState({title: "",  description: "", tag: "", date: new Date().toLocaleDateString("en-IN")});

    const handleSubmit = (element) => {
        addNote(newNote);
        element.preventDefault();   //to prevent reload of the element on submit.
    }

    const handleStateChange = (element) => {
        setNewNote({...newNote, [element.target.name]: element.target.value});
    }

    return (
        <>
            <h1>Add a note</h1>
                <form className="my-3" style={{backgroundColor: "dimgrey", boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', padding: '50px'}}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                        <input type="text" className="form-control" id="title" name="title" onChange={handleStateChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                        <textarea rows="5" cols="50" className="form-control" id="description" name="description" onChange={handleStateChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            <strong>Tag</strong>
                            <input type="text" className="form-control" id = "tag" name = "tag" onChange={handleStateChange}/>
                        </label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{width: '100%'}}>Add Note</button>
                </form>
            <Notes/>
        </>
    );
}

export default AddNote;