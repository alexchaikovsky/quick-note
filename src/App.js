import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="note-app">
      <h1>ЗАМЕТКИ</h1>
      <NoteList />
    </div>
  );
}

export default App;
