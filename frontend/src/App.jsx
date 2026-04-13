import { useEffect, useState } from "react";
import {
  getMissions,
  createMission,
  updateMission,
  deleteMission
} from "./api/mission.api.js";

import MissionList from "./components/MissionList";
import MissionForm from "./components/MissionForm";
import MissionSearch from "./components/MissionSearch";

function App() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingMission, setEditingMission] = useState(null);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await getMissions(search);
      setMissions(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, [search]);

  const handleCreate = async (formData) => {
    await createMission(formData);
    loadMissions();
  };

  const handleUpdate = async (id, formData) => {
    await updateMission(id, formData);
    setEditingMission(null);
    loadMissions();
  };

  const handleDelete = async (id) => {
    await deleteMission(id);
    loadMissions();
  };

  return (
    <div>
      <h1>🚀 Gestor de Misiones Espaciales</h1>

      <MissionSearch setSearch={setSearch} />

      <MissionForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingMission={editingMission}
      />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <MissionList
        missions={missions}
        onDelete={handleDelete}
        onEdit={setEditingMission}
      />
    </div>
  );
}

export default App;