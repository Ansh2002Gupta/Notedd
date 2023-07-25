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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDAwODM1Mn0.UN7xp280SC9d_kriaLHLAWsItpG3Q97RzT7WxCYyjj8'
            }
        });
        const json = await response.json();
        setMyNotes(json);
    }

    const addNote = async (note) => {
        const {title, description, tag} = note;
        const url = `${host}/api/notes/addnotes`;
        //eslint-disable-next-line
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDAwODM1Mn0.UN7xp280SC9d_kriaLHLAWsItpG3Q97RzT7WxCYyjj8'
            },
            body: JSON.stringify({title, description, tag})
        });
        // const json = await response.json();
        const newNote = {
            "_id": "64b7908932b8d3a7694b086e",
            "user": "64b78d7332b8d3a7694b0869",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-19T07:28:09.596Z",
            "__v": 0
        };
        setMyNotes(myNotes.concat(newNote));
    }

    const deleteNote = (id) => {
        const url = `${host}/api/notes/deletenote`;
        const response = fetch(url, {
            method: 'DEL',
            headers: {
                auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDAwODM1Mn0.UN7xp280SC9d_kriaLHLAWsItpG3Q97RzT7WxCYyjj8'
            }
        });
        const json = response.json();
        const newState = myNotes.filter((note) => {
            return note._id !== id;
        });
        setMyNotes(newState);
    }

    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNzhkNzMzMmI4ZDNhNzY5NGIwODY5In0sImlhdCI6MTY5MDAwODM1Mn0.UN7xp280SC9d_kriaLHLAWsItpG3Q97RzT7WxCYyjj8'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        for (let index = 0; index < myNotes.length; index++){
            const element = myNotes[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return(
        <NoteContext.Provider value = {{myNotes, setMyNotes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;