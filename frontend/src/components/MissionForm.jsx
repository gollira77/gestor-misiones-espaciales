import { useEffect, useState } from "react";

function MissionForm({ onCreate, onUpdate, editingMission }) {
    const [form, setForm] = useState({
        nombre: "",
        destino: "",
        comandante: "",
        tripulantes: 1,
        estado: "Programada"
    });

    useEffect(() => {
        if (editingMission) {
        setForm(editingMission);
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
        <form onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
        <input name="destino" value={form.destino} onChange={handleChange} placeholder="Destino" />
        <input name="comandante" value={form.comandante} onChange={handleChange} placeholder="Comandante" />
        <input name="tripulantes" type="number" value={form.tripulantes} onChange={handleChange} />
        <input name="estado" value={form.estado} onChange={handleChange} />

        <button type="submit">
            {editingMission ? "Actualizar" : "Crear"}
        </button>
        </form>
    );
}

export default MissionForm;