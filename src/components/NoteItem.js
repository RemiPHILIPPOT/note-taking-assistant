// src/components/NoteItem.js
import React from "react";
import ReactMarkdown from "react-markdown";

const NoteItem = ({ note, index, deleteNote }) => {
    return (
        <div className="note">
            <h3>Note {index + 1}</h3>
            <ReactMarkdown>{note.text}</ReactMarkdown>
            <h4>Résumé:</h4>
            <p>{note.summary}</p>
            <button onClick={() => deleteNote(index)}>Supprimer</button>
        </div>
    );
};

export default NoteItem;
