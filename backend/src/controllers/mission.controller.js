import { missions } from "../data/missions.data.js";
import { validarMission } from "../utils/mission.validators.js";

export function getAllMissions(req, res) {
    const { search } = req.query;

    if (!search) {
        return res.status(200).json(missions);
    }

    const searchLower = search.toLowerCase();

    const filtered = missions.filter((mission) =>
        mission.nombre.toLowerCase().includes(searchLower) ||
        mission.destino.toLowerCase().includes(searchLower)
    );

    res.status(200).json({
        count: missions.length,
        data: missions
    });
}

export function getMissionById(req, res) {
    const id = Number(req.params.id);

    const mission = missions.find((mission) => mission.id === id);

    if (!mission) {
        return res.status(404).json({
            error: "Misión no encontrada."
        });
    }

    res.status(200).json({
        data: mission
    });
}

export function createMission(req, res) {
    const errores = validarMission(req.body);

    if (errores.length > 0) {
        return res.status(400).json({
        error: "Datos inválidos.",
        detalles: errores
        });
    }

    const newMission = {
        id: missions.length > 0 ? missions[missions.length - 1].id + 1 : 1,
        nombre: req.body.nombre.trim(),
        destino: req.body.destino.trim(),
        comandante: req.body.comandante.trim(),
        tripulantes: Number(req.body.tripulantes),
        estado: req.body.estado.trim(),
        fechaLanzamiento: req.body.fechaLanzamiento || "",
        descripcion: req.body.descripcion?.trim() || ""
    };

    missions.push(newMission);

    res.status(201).json({
        message: "Misión creada correctamente",
        data: newMission
    });
}

export function updateMission(req, res) {
    const id = Number(req.params.id);

    const missionIndex = missions.findIndex((mission) => mission.id === id);

    if (missionIndex === -1) {
        return res.status(404).json({
        error: "Misión no encontrada."
        });
    }

    const errores = validarMission(req.body);

    if (errores.length > 0) {
        return res.status(400).json({
        error: "Datos inválidos.",
        detalles: errores
        });
    }

    const updatedMission = {
        id,
        nombre: req.body.nombre.trim(),
        destino: req.body.destino.trim(),
        comandante: req.body.comandante.trim(),
        tripulantes: Number(req.body.tripulantes),
        estado: req.body.estado.trim(),
        fechaLanzamiento: req.body.fechaLanzamiento || "",
        descripcion: req.body.descripcion?.trim() || ""
    };

    missions[missionIndex] = updatedMission;

    res.status(200).json(updatedMission);
}

export function deleteMission(req, res) {
    const id = Number(req.params.id);

    const missionIndex = missions.findIndex((mission) => mission.id === id);

    if (missionIndex === -1) {
        return res.status(404).json({
        error: "Misión no encontrada."
        });
    }

    const deletedMission = missions[missionIndex];

    missions.splice(missionIndex, 1);

    res.status(200).json({
        message: "Misión eliminada correctamente.",
        mission: deletedMission
    });
}