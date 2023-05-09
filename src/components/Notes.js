import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <div className="row">
        <h3>Your Notes</h3>
        {notes.map((note) => {
         return <NoteItem note={note}/>
        })}
      </div>
    </div>
  );
}
