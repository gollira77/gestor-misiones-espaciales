import { useEffect, useRef } from "react";
import { animate } from "animejs";

function MissionCard({ mission, onDelete, onEdit }) {
    const cardRef = useRef(null);

    useEffect(() => {
        animate(cardRef.current, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: "ease-out"
        });
    }, []);
    
    return (
        <div
        ref={cardRef}
        style={{
            border: "1px solid #00ffff",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
            background: "#0a0a0a",
            color: "white"
        }}
        >
        <h3>{mission.nombre}</h3>
        <p>🌍 Destino: {mission.destino}</p>
        <p>🧑‍🚀 Comandante: {mission.comandante}</p>
        <p>👨‍👩‍👧 Tripulación: {mission.tripulantes}</p>
        <p>📡 Estado: {mission.estado}</p>

        <button style={btnStyle} onClick={() => onEdit(mission)}>
            ✏️ Editar
        </button>

        <button style={btnDelete} onClick={() => onDelete(mission.id)}>
            ❌ Eliminar
        </button>
        </div>
    );
}

const btnStyle = {
    marginRight: "10px",
    padding: "6px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    background: "#00ffff"
};

const btnDelete = {
    padding: "6px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "white"
};



export default MissionCard;