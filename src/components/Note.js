import React, { useState } from "react";
import "./Note.css";
import { BsFillTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NotePopup from "./NotePopup.js";

function Note(props) {
  const [editing, setEditing] = useState(false);
  const [isHovering, setHovering] = useState(false);

  const handleHover = () => {
    setHovering(true);
  };

  const handleUnhovering = () => {
    setHovering(false);
  };
  const handleClick = () => {
    setHovering(false);
    setEditing(true);
  };
  const closeModal = () => setEditing(false);

  const showEditor = () => {
    return (
      <Popup open={editing} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <NotePopup
            text={props.note.text}
            editNote={props.editNote}
            id={props.note.id}
          />
        </div>
      </Popup>
    );
  };

  const removeButton = () => {
    if (isHovering) {
      return (
        <button
          className="note-button-remove"
          onClick={() => props.deleteNote(props.note.id)}
        >
          <BsFillTrashFill />
        </button>
      );
    }
    return;
  };

  return (
    <div
      className="notebox"
      onMouseOver={handleHover}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhovering}
      onClick={handleClick}
    >
      {removeButton()}
      {showEditor()}
      <div className="note-text">{props.note.text}</div>
    </div>
  );
}

export default Note;