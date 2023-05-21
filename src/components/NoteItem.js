import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";


const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote} = context;

  const {note, updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">Title: {note.title}</h5>
          <p className="card-text">Description: {note.description} </p>
          <p className="card-text">Tag: {note.tag}</p>
          <i className="fa-solid fa-trash mx-2 fa-lg" style={{"color": "#0d6efd"}} onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2 fa-lg" style={{"color": "#0d6efd"}} onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
