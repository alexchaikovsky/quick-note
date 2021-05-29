import React, { useState } from "react";
import "./Note.css";
import { BsFillTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NotePopup from "./NotePopup.js";
import { PriorityHighSharp } from "@material-ui/icons";

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
      <Popup open={editing} closeOnDocumentClick onClose={closeModal} modal>
        <div className="modal">
          <NotePopup
            note={props.note}
            text={props.note.text}
            datetime={props.note.datetime}
            editNote={props.editNote}
            deleteNote={props.deleteNote}
            closeNote={closeModal}
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
      {showEditor()}
      <div className="note-header">{props.note.header}</div>
      <div className="note-text">{props.note.text}</div>
    </div>
  );
}

export default Note;
