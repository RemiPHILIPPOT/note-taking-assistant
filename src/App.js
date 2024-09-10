// src/App.js
import React, { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import ToggleDarkMode from "./components/ToggleDarkMode";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);

        const savedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));

        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    const addNote = (newNote) => {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    return (
        <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
            <h1>Assistant Intelligent de Prise de Notes</h1>
            <ToggleDarkMode
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
            <NoteInput addNote={addNote} />
            <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
    );
}

export default App;
