import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import ReactMarkdown from "react-markdown";
import "./App.css";

function summarizeText(text) {
    const wordFrequency = {};
    const words = text.split(/\s+/);

    // Calcul de la fréquence des mots
    words.forEach((word) => {
        word = word.toLowerCase().replace(/[.,?!]/g, "");
        if (word) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    // Tri des mots par fréquence
    const sortedWords = Object.entries(wordFrequency).sort(
        (a, b) => b[1] - a[1]
    );
    const topWords = sortedWords.slice(0, 5).map((entry) => entry[0]); // Top 5 mots

    // Résumé basé sur les phrases contenant les mots les plus fréquents
    const sentences = text.split(". ");
    const summarySet = new Set(); // Utilisation d'un ensemble pour éviter les doublons
    const summary = [];

    sentences.forEach((sentence) => {
        const lowerSentence = sentence.toLowerCase();
        if (
            topWords.some((word) => lowerSentence.includes(word)) &&
            !summarySet.has(lowerSentence)
        ) {
            summary.push(sentence); // Ajoute la phrase si elle est pertinente et non dupliquée
            summarySet.add(lowerSentence); // Marque la phrase comme déjà ajoutée
        }
    });

    // Limiter la longueur du résumé à un maximum de 5 phrases
    return summary.slice(0, 5).join(". ");
}

function App() {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState("");

    // Ajout d'une nouvelle note avec résumé
    const addNote = () => {
        if (currentNote.trim()) {
            const summary = summarizeText(currentNote);
            const newNote = {
                text: currentNote,
                summary: summary,
            };
            setNotes([...notes, newNote]);
            setCurrentNote("");
            localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
        }
    };

    // Suppression d'une note
    const deleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes));
    };

    // Chargement des notes à partir du localStorage lors du premier rendu
    React.useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    return (
        <div className="App">
            <h1>Assistant Intelligent de Prise de Notes</h1>
            <div className="container">
                <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Écris ta note ici..."
                    rows="4"
                    cols="50"
                ></textarea>
                <button onClick={addNote}>Ajouter la Note</button>
            </div>
            <h2>Notes</h2>
            {notes.map((note, index) => (
                <div key={index} className="note">
                    <h3>Note {index + 1}</h3>
                    <ReactMarkdown>{note.text}</ReactMarkdown>
                    <h4>Résumé:</h4>
                    <p>{note.summary}</p>
                    <button onClick={() => deleteNote(index)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default App;
