import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div class="card my-2">
        <div class="card-body">
          <h5 class="card-title">Title: {note.title}</h5>
          <p class="card-text">Description: {note.description} </p>
          <p class="card-text">Tag: {note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
