// src/components/ToggleDarkMode.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ToggleDarkMode = ({ isDarkMode, setIsDarkMode }) => {
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="toggle-dark-mode">
            {isDarkMode ? (
                <FontAwesomeIcon
                    icon={faSun}
                    size="2x"
                    title="Activer le mode clair"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faMoon}
                    size="2x"
                    title="Activer le mode sombre"
                />
            )}
        </button>
    );
};

export default ToggleDarkMode;
