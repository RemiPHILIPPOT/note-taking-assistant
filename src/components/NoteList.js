// src/components/NoteList.js
import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, deleteNote }) => {
    return (
        <div className="note-list">
            <h2>Notes</h2>
            {notes.map((note, index) => (
                <NoteItem
                    key={index}
                    note={note}
                    index={index}
                    deleteNote={deleteNote}
                />
            ))}
        </div>
    );
};

export default NoteList;
