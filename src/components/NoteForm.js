import React, { useState } from "react";
import "./NoteForm.css";

function NoteForm(props) {
  const [input, setInput] = useState("");
  const [inputHeader, setHeader] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleHeaderChange = (e) => {
    setHeader(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      header: inputHeader,
      text: input,
      datetime: new Date().toUTCString(),
    });
    setInput("");
    setHeader("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок"
        value={inputHeader}
        name="text"
        className="note-input-header"
        onChange={handleHeaderChange}
      />
      <input
        type="text"
        placeholder="Добавить заметку"
        value={input}
        name="text"
        className="note-input"
        onChange={handleChange}
      />
      <button className="note-button">Добавить</button>
    </form>
  );
}

export default NoteForm;
