import React, { useState, useEffect } from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import "./NoteList.css";
import Masonry from "react-masonry-css";
import toast, { Toaster } from "react-hot-toast";
import Popup from "reactjs-popup";
import Button from "@material-ui/core/Button";

function NoteList() {
  const [inputActive, setInput] = useState(false);
  const [notes, setNotes] = useState([]);
  const breakpointColumnsObj = {
    default: 5,
    1920: 4,
    1600: 3,
    900: 2,
    500: 1,
  };

  useEffect(() => {
    loadFromLS();
    console.log("load notes from localstorage");
  }, []);

  const loadFromLS = () => {
    const loaded = JSON.parse(localStorage.getItem("notes"));
    setNotes(loaded !== null ? loaded : []);
  };
  const saveToLocalStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  const addNote = (note) => {
    if (!note.text || /^\s*$/.test(note.text)) {
      return;
    }

    const newNotes = [note, ...notes];
    setNotes(newNotes);
    console.log(...notes);
    saveToLocalStorage(newNotes);
    toast.success("Заметка добавлена!");
  };
  const deleteNote = (id) => {
    console.log("enter delete");
    let filtered = notes.filter((note) => note.id !== id);
    console.log(id);
    setNotes(filtered);
    saveToLocalStorage(filtered);
    toast.success("Заметка удалена!");
  };

  const editNote = (id, text, header, time) => {
    console.log("start saving edit");
    let index = notes.findIndex((x) => x.id === id);
    const newNote = {
      id: id,
      header: header,
      text: text,
      datetime: time,
    };
    const newNotes = [newNote, ...notes];
    newNotes.splice(index + 1, 1);
    setNotes(newNotes);

    //setNotes(newotes);
    saveToLocalStorage(newNotes);
    toast.success("Изменения сохранены!");
  };

  const buildNotes = () => {
    return notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    ));
  };

  const closeModal = () => setInput(false);
  const showInput = () => setInput(true);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={showInput}
        style={{
          maxWidth: "500px",
          maxHeight: "50px",
          minWidth: "350px",
          minHeight: "50px",
        }}
      >
        Новая заметка
      </Button>
      <Popup open={inputActive} closeOnDocumentClick onClose={closeModal} modal>
        <div className="modal">
          <NoteForm onSubmit={addNote} closeForm={closeModal} />
        </div>
      </Popup>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {buildNotes()}
      </Masonry>
    </div>
  );
}

export default NoteList;
