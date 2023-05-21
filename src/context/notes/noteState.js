import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Add a Note
  const addNote = async (title, description, tag) => {
    // log("Adding a Note:");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZjdkNDdjNDg0YWM2ZTI4ZmQyMTE1In0sImlhdCI6MTY4MzA0MDEzMX0.66_P7pSxYM94Vbj0CmZ292bhvIXMZGurlNz_739ld0M",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    // console.log(json);
    setNotes(notes.concat(note));
    // concat return an array where push update an array
  };
  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZjdkNDdjNDg0YWM2ZTI4ZmQyMTE1In0sImlhdCI6MTY4MzA0MDEzMX0.66_P7pSxYM94Vbj0CmZ292bhvIXMZGurlNz_739ld0M",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZjdkNDdjNDg0YWM2ZTI4ZmQyMTE1In0sImlhdCI6MTY4MzA0MDEzMX0.66_P7pSxYM94Vbj0CmZ292bhvIXMZGurlNz_739ld0M",
      },
    });
    // console.log("Deleting the note with ID:=" + id);
    const json = await response.json();
    // console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZjdkNDdjNDg0YWM2ZTI4ZmQyMTE1In0sImlhdCI6MTY4MzA0MDEzMX0.66_P7pSxYM94Vbj0CmZ292bhvIXMZGurlNz_739ld0M",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    // log(json);
    // log("Editing the existing note:=" + id);
    // Logic to edit in Client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
