import { useEffect, useState } from "react";
import { animate } from "animejs";
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

  useEffect(() => {
    animate("h1", {
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: "ease-out"
  });
  }, []);

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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(black, #020024)",
      padding: "20px",
      color: "white"
    }}>

    <h1 style={{ textAlign: "center" }}>Gestor de Misiones Espaciales</h1>

    <MissionSearch setSearch={setSearch} />

    <MissionForm
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      editingMission={editingMission}
    />

    {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}
    {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

    <MissionList
      missions={missions}
      onDelete={handleDelete}
      onEdit={setEditingMission}
    />
    </div>
  );
}

export default App;