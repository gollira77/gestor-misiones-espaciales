const BASE_URL = "http://localhost:3001/api/missions";

export async function getMissions(search = "") {
    const url = search
        ? `${BASE_URL}?search=${search}`
        : BASE_URL;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Error al obtener misiones");

    return res.json();
}

export async function getMissionById(id) {
    const res = await fetch(`http://localhost:3001/api/missions/${id}`);

    if (!res.ok) throw new Error("Error al obtener la misión");

    return res.json();
}

export async function createMission(data) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al crear misión");

    return res.json();
}

export async function updateMission(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Error al actualizar misión");

    return res.json();
}

export async function deleteMission(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar misión");

    return res.json();
}