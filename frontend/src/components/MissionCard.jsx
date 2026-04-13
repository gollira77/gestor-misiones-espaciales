function MissionCard({ mission, onDelete, onEdit }) {
    return (
        <div style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
        <h3>{mission.nombre}</h3>
        <p>Destino: {mission.destino}</p>
        <p>Estado: {mission.estado}</p>

        <button onClick={() => onEdit(mission)}>Editar</button>
        <button onClick={() => onDelete(mission.id)}>Eliminar</button>
        </div>
    );
}

export default MissionCard;