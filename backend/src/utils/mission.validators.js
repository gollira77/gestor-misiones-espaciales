const ESTADOS_VALIDOS = [
    "Programada",
    "En preparación",
    "Lanzada",
    "Completada",
    "Cancelada"
];

export function validarMission(data) {
    const errores = [];

    if (!data.nombre || data.nombre.trim() === "") {
        errores.push("El campo 'nombre' es obligatorio.");
    }

    if (!data.destino || data.destino.trim() === "") {
        errores.push("El campo 'destino' es obligatorio.");
    }

    if (!data.comandante || data.comandante.trim() === "") {
        errores.push("El campo 'comandante' es obligatorio.");
    }

    if (data.tripulantes === undefined || data.tripulantes === null || isNaN(data.tripulantes)) {
        errores.push("El campo 'tripulantes' debe ser un número.");
    } else if (Number(data.tripulantes) < 1) {
        errores.push("El campo 'tripulantes' debe ser mayor o igual a 1.");
    }

    if (!data.estado || data.estado.trim() === "") {
        errores.push("El campo 'estado' es obligatorio.");
    } else if (!ESTADOS_VALIDOS.includes(data.estado)) {
        errores.push(`El campo 'estado' debe ser uno de estos valores: ${ESTADOS_VALIDOS.join(", ")}.`);
    }

    if (data.fechaLanzamiento && isNaN(Date.parse(data.fechaLanzamiento))) {
        errores.push("El campo 'fechaLanzamiento' debe tener un formato de fecha válido.");
    }

    return errores;
}