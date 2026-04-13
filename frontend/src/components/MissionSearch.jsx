import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

function MissionSearch({ setSearch }) {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        animate(inputRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
        });
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
        setSearch(value);
        }, 400);

        return () => clearTimeout(delay);
    }, [value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        setSearch(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
        }
    };

    return (
        <div style={styles.container}>
        <input
            ref={inputRef}
            type="text"
            placeholder="🔍 Buscar misión por nombre o destino..."
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={styles.input}
        />

        <button onClick={handleSearch} style={styles.button}>
            🔍
        </button>
        </div>
    );
    }

    const styles = {
    container: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
    },

    input: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid rgba(0,255,255,0.3)",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        outline: "none",
        boxShadow: "0 0 10px rgba(0,255,255,0.2)"
    },

    button: {
        padding: "12px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#00ffff",
        cursor: "pointer",
        fontWeight: "bold"
    }
};

export default MissionSearch;