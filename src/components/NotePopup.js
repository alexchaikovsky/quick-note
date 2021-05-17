import React, { useState } from "react";
import "./NotePopup.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

const NotePopup = (props) => {
  const saveEdit = () => {
    let contenteditable = document.querySelector("[contentEditable]");
    let text = contenteditable.textContent;
    console.log(text);
    props.editNote(props.id, text);
  };

  return (
    <div className="note-popup">
      <div
        contentEditable="true"
        className="note-popup-text"
        suppressContentEditableWarning={true}
      >
        {props.text}
      </div>
      <br />
      <Box className="buttons-box" m={2}>
        <ButtonGroup>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            color="primary"
            onClick={saveEdit}
          >
            Сохранить
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="secondary"
            onClick={() => props.deleteNote(props.id)}
          >
            Удалить
          </Button>
        </ButtonGroup>
        <Button
          startIcon={<CloseIcon />}
          variant="contained"
          onClick={props.closeNote}
        >
          Закрыть
        </Button>
      </Box>
    </div>
  );
};

export default NotePopup;
