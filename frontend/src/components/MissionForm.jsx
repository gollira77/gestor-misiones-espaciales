import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

function MissionForm({ onCreate, onUpdate, editingMission }) {
    const [form, setForm] = useState({
        nombre: "",
        destino: "",
        comandante: "",
        tripulantes: 1,
        estado: "Programada"
    });

    const formRef = useRef(null);

    // ✨ Animación al aparecer
    useEffect(() => {
        animate(formRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700
        });
    }, []);

    // 🔄 Animación al editar
    useEffect(() => {
        if (editingMission) {
        setForm(editingMission);

        animate(formRef.current, {
            scale: [0.95, 1],
            duration: 400
        });
        }
    }, [editingMission]);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingMission) {
        onUpdate(editingMission.id, form);
        } else {
        onCreate(form);
        }

        setForm({
        nombre: "",
        destino: "",
        comandante: "",
        tripulantes: 1,
        estado: "Programada"
        });
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>
            {editingMission ? "✏️ Editar Misión" : "🚀 Nueva Misión"}
        </h2>

        <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            style={styles.input}
        />

        <input
            name="destino"
            value={form.destino}
            onChange={handleChange}
            placeholder="Destino"
            style={styles.input}
        />

        <input
            name="comandante"
            value={form.comandante}
            onChange={handleChange}
            placeholder="Comandante"
            style={styles.input}
        />

        <input
            name="tripulantes"
            type="number"
            value={form.tripulantes}
            onChange={handleChange}
            style={styles.input}
        />

        <input
            name="estado"
            value={form.estado}
            onChange={handleChange}
            placeholder="Estado"
            style={styles.input}
        />

        <button type="submit" style={styles.button}>
            {editingMission ? "Actualizar" : "Crear"}
        </button>
        </form>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "30px",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(20,20,40,0.8)",
        boxShadow: "0 0 15px rgba(0,255,255,0.2)",
        backdropFilter: "blur(5px)"
    },

    title: {
        textAlign: "center",
        marginBottom: "10px",
        textShadow: "0 0 5px #00ffff"
    },

    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid rgba(0,255,255,0.3)",
        background: "black",
        color: "white",
        outline: "none"
    },

    button: {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        background: "#00ffff",
        color: "black",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    }
};

export default MissionForm;