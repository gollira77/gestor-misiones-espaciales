import { useState } from "react";

function MissionSearch({ setSearch }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        setSearch(val);
    };

    return (
        <input
        type="text"
        placeholder="Buscar misión..."
        value={value}
        onChange={handleChange}
        />
    );
}

export default MissionSearch;