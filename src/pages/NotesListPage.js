import React, { useState, useEffect } from "react";
//import notes from "../assets/data";
import ListItem from "../components/ListItem";
import AddBUtton from "../components/AddButton";

const NotesListPage = (props) => {
  console.log(props);
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://127.0.0.1:8000/notes");
    let data = await response.json();
    setNotes(data);
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddBUtton />
    </div>
  );
};

export default NotesListPage;