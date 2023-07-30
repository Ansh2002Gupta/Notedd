import NoteContext from "./noteContext";
import AlertContext from "../alert/alertContext";
import { useContext, useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [myNotes, setMyNotes] = useState(notesInitial);
  const alertContext = useContext(AlertContext);
  const { toggleAlertState } = alertContext;

  const fetchNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setMyNotes(json.notes);
      console.log(json.notes, " ", myNotes);
      if (json.notes.length === 0) toggleAlertState("info", "Currently you do not have any notes!");
      else toggleAlertState("success", "All notes fetched successfully!");
    } else toggleAlertState("danger", "Some error occured during fetching of notes!");
  };

  const addNote = async (note) => {
    const { title, description, tag, date } = note;
    const url = `${host}/api/notes/addnotes`;
    //eslint-disable-next-line
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, date }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toggleAlertState("success", "Note added successfully!");
      fetchNotes();
    } else toggleAlertState("danger", "Note couldn't be added");
    // const newNote = {
    //   _id: "64b7908932b8d3a7694b086e",
    //   user: "64b78d7332b8d3a7694b0869",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: date,
    //   __v: 0,
    // };
    // setMyNotes(myNotes.concat(newNote));
  };

  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    //eslint-disable-next-line
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const newState = myNotes.filter((note) => {
        return note._id !== id;
      });
      setMyNotes(newState);
      toggleAlertState("success", "Note deleted successfully!");
    } else toggleAlertState("danger", "Note couldn't be deleted");
  };

  const editNote = async (id, title, description, tag, date) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, date }),
    });
    //eslint-disable-next-line
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //to create a deep copy of 'myNotes' list.
      const updatedNotes = JSON.parse(JSON.stringify(myNotes));
      for (let index = 0; index < myNotes.length; index++) {
        if (updatedNotes[index]._id === id) {
          updatedNotes[index].title = title;
          updatedNotes[index].description = description;
          updatedNotes[index].tag = tag;
          updatedNotes[index].date = date;
          break;
        }
      }
      setMyNotes(updatedNotes);
      toggleAlertState("success", "Note updated successfully!");
    } else toggleAlertState("danger", "Note couldn't be updated");
  };

  return <NoteContext.Provider value={{ myNotes, setMyNotes, fetchNotes, addNote, deleteNote, editNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
