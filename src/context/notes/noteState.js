import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = [];

    const [myNotes, setMyNotes] = useState(notesInitial);

    const fetchNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDQ0NTc5OX0.WgDTUKNXpXQCJsDrazKJJcbKAl4-Mz1C8WXWrjv9pN4'
            }
        });
        const json = await response.json();
        setMyNotes(json);
    }

    const addNote = async (note) => {
        const {title, description, tag, date} = note;
        const url = `${host}/api/notes/addnotes`;
        //eslint-disable-next-line
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDQ0NTc5OX0.WgDTUKNXpXQCJsDrazKJJcbKAl4-Mz1C8WXWrjv9pN4'
            },
            body: JSON.stringify({title, description, tag, date})
        });
        // const json = await response.json();
        const newNote = {
            "_id": "64b7908932b8d3a7694b086e",
            "user": "64b78d7332b8d3a7694b0869",
            "title": title,
            "description": description,
            "tag": tag,
            "date": date,
            "__v": 0
        };
        setMyNotes(myNotes.concat(newNote));
    }

    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDQ0NTc5OX0.WgDTUKNXpXQCJsDrazKJJcbKAl4-Mz1C8WXWrjv9pN4'
            }
        });
        //eslint-disable-next-line
        const json = await response.json();
        const newState = myNotes.filter((note) => {
            return note._id !== id;
        });
        setMyNotes(newState);
    }

    const editNote = async (id, title, description, tag, date) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDQ0NTc5OX0.WgDTUKNXpXQCJsDrazKJJcbKAl4-Mz1C8WXWrjv9pN4'
            },
            body: JSON.stringify({title, description, tag, date})
        });
        //eslint-disable-next-line
        const json = await response.json();
        //to create a deep copy of 'myNotes' list.
        const updatedNotes = JSON.parse(JSON.stringify(myNotes));    
        for (let index = 0; index < myNotes.length; index++){
            if(updatedNotes[index]._id === id){
                updatedNotes[index].title = title;
                updatedNotes[index].description = description;
                updatedNotes[index].tag = tag;
                updatedNotes[index].date = date;
                break;
            }
        }
        setMyNotes(updatedNotes);
    }

    return(
        <NoteContext.Provider value = {{myNotes, setMyNotes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;