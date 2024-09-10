// src/components/NoteInput.js
import React, { useState } from "react";

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
    const topWords = sortedWords.slice(0, 5).map((entry) => entry[0]);

    // Résumé basé sur les phrases contenant les mots les plus fréquents
    const sentences = text.split(". ");
    const summarySet = new Set();
    const summary = [];

    sentences.forEach((sentence) => {
        const lowerSentence = sentence.toLowerCase();
        if (
            topWords.some((word) => lowerSentence.includes(word)) &&
            !summarySet.has(lowerSentence)
        ) {
            summary.push(sentence);
            summarySet.add(lowerSentence);
        }
    });

    return summary.slice(0, 5).join(". ") || "Résumé non disponible.";
}

const NoteInput = ({ addNote }) => {
    const [currentNote, setCurrentNote] = useState("");

    const handleAddNote = () => {
        if (currentNote.trim()) {
            const summary = summarizeText(currentNote);
            addNote({
                text: currentNote,
                summary: summary,
            });
            setCurrentNote("");
        }
    };

    return (
        <div className="note-input">
            <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Écris ta note ici..."
                rows="4"
                cols="50"
            ></textarea>
            <button onClick={handleAddNote}>Ajouter la Note</button>
        </div>
    );
};

export default NoteInput;
