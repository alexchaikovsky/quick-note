import React, { useState } from "react";
import "./NotePopup.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

const NotePopup = (props) => {
  const [datetime, setDatetime] = useState(props.datetime);

  const saveEdit = () => {
    let headerContent = document.getElementById("note-header");
    let noteContent = document.getElementById("text");
    let header = headerContent.textContent;
    let text = noteContent.textContent;
    console.log(text);
    if (props.text !== text || props.note.header !== header) {
      const editTime = new Date().toUTCString();
      setDatetime(editTime);
      props.editNote(props.id, text, header, editTime);
      props.closeNote();
    }
  };

  return (
    <div className="note-popup">
      <div>
        <div
          contentEditable="true"
          className="note-popup-header"
          id="note-header"
          suppressContentEditableWarning={true}
        >
          {props.note.header}
        </div>
      </div>

      <div
        contentEditable="true"
        className="note-popup-text"
        suppressContentEditableWarning={true}
        id="text"
      >
        {props.text}
      </div>

      <br />
      <div className="datetime">
        Дата изменения: {new Date(datetime).toLocaleString()}
      </div>
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
