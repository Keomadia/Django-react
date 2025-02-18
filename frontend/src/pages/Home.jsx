import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted successfully");
        else alert("Failed to delete Note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();

    api
      .post(`/api/notes/`, { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
          refreshNotes();
        } else {
          alert("Failed to create Note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const refreshNotes = () => {
    setTitle("");
    setContent("");
  };
  return (
    <div className="">
      <h1>Notes</h1>

      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}

      <h2>Create a Note</h2>
      <form action="" onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter title..."
        />

        <label htmlFor="content">Content: </label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          placeholder="Write your note here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Home;
