import { useState } from "react";

export function useForm() {
    const [values, setValues] = useState({});

    const handleChange = (evt) => {
        const input = evt.target;
        const name = input.name;
        const value = input.value;

        setValues({...values, [name]: value});
    }

    return { values, handleChange, setValues };
}