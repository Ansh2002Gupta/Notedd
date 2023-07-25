import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NotesItem';

function Notes(){
    const context = useContext(NoteContext);
    const {myNotes, fetchNotes} = context;
    useEffect(() => {
        fetchNotes()
    }, []);
    return (
        <div className="row my-3 mx-3">
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>My Notes</h2>
                {
                    myNotes.map((note) => {
                        return <NoteItem key = {note._id} note={note}/>
                    })
                }
        </div>
    );
}

export default Notes;