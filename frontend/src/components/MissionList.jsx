import MissionCard from "./MissionCard";

function MissionList({ missions, onDelete, onEdit }) {
    return (
        <div>
        {missions.map((mission) => (
            <MissionCard
            key={mission.id}
            mission={mission}
            onDelete={onDelete}
            onEdit={onEdit}
            />
        ))}
        </div>
    );
}

export default MissionList;