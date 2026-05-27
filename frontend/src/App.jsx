import { useEffect, useState, useCallback, useMemo } from "react";
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

  const filteredMissions = useMemo(() => {

  if (!search.trim()) {
    return missions;
  }

  return missions.filter((mission) =>
    mission.nombre.toLowerCase().includes(search.toLowerCase()) ||
    mission.destino.toLowerCase().includes(search.toLowerCase())
  );

}, [missions, search]);

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

  // ✨ animación del título
  useEffect(() => {
    animate("h1", {
      opacity: [0, 1],
      translateY: [-40, 0],
      duration: 1000
    });
  }, []);


  const handleCreate = useCallback(async (formData) => {
    await createMission(formData);
    loadMissions();
  }, []);

  const handleUpdate = useCallback(async (id, formData) => {
    await updateMission(id, formData);
    setEditingMission(null);
    loadMissions();
  }, []);

  const handleDelete = useCallback(async (id) => {
    await deleteMission(id);
    loadMissions();
  }, []);

  return (
    <div style={styles.container}>
      <div id="stars"></div>

      <h1 style={styles.title}>
        🚀 Gestor de Misiones Espaciales
      </h1>

      <MissionSearch setSearch={setSearch} />

      <MissionForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingMission={editingMission}
      />

      {loading && <p style={styles.loading}>Cargando...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <MissionList
        missions={filteredMissions}
        onDelete={handleDelete}
        onEdit={setEditingMission}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at center, #020024, #000000 80%)",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
    position: "relative",
    overflow: "hidden"
  },

  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    textShadow: "0 0 10px #00ffff"
  },

  loading: {
    textAlign: "center",
    color: "#00ffff"
  },

  error: {
    textAlign: "center",
    color: "red"
  }
};

export default App;