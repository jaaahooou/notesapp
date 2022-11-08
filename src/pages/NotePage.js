import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowfLeft } from "../assets/arrow-left.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";

const NotePage = () => {
  let { id } = useParams();

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;

    let response = await fetch(`http://localhost:8000/notes/${id}`);

    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let handleSubmit = () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowfLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
