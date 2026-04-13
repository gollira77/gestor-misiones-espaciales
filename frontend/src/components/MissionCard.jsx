import { useEffect, useRef } from "react";
import { animate } from "animejs";

function MissionCard({ mission, onDelete, onEdit }) {
    const cardRef = useRef(null);

    // ✨ Animación de entrada
    useEffect(() => {
        animate(cardRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700
        });
    }, []);

    // 💥 Animación de eliminar
    const handleDelete = () => {
        animate(cardRef.current, {
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 400
        });

        setTimeout(() => {
        onDelete(mission.id);
        }, 400);
    };

    return (
        <div ref={cardRef} style={styles.card}>
        <h3 style={styles.title}>{mission.nombre}</h3>

        <p>🌍 <strong>Destino:</strong> {mission.destino}</p>
        <p>🧑‍🚀 <strong>Comandante:</strong> {mission.comandante}</p>
        <p>👨‍👩‍👧 <strong>Tripulación:</strong> {mission.tripulantes}</p>
        <p>📡 <strong>Estado:</strong> {mission.estado}</p>

        <div style={styles.buttons}>
            <button
            style={styles.editBtn}
            onClick={() => onEdit(mission)}
            >
            ✏️ Editar
            </button>

            <button
            style={styles.deleteBtn}
            onClick={handleDelete}
            >
            ❌ Eliminar
            </button>
        </div>
        </div>
    );
    }

    const styles = {
    card: {
        border: "1px solid rgba(0,255,255,0.3)",
        margin: "15px 0",
        padding: "15px",
        borderRadius: "12px",
        background: "rgba(10,10,30,0.8)",
        color: "white",
        boxShadow: "0 0 15px rgba(0,255,255,0.3)",
        backdropFilter: "blur(5px)",
        transition: "transform 0.2s, box-shadow 0.2s"
    },

    title: {
        marginBottom: "10px",
        textShadow: "0 0 5px #00ffff"
    },

    buttons: {
        marginTop: "10px",
        display: "flex",
        gap: "10px"
    },

    editBtn: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        background: "#00ffff",
        color: "black",
        fontWeight: "bold",
        transition: "0.2s"
    },

    deleteBtn: {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        background: "#ff4d4d",
        color: "white",
        fontWeight: "bold",
        transition: "0.2s"
    }
};

export default MissionCard;