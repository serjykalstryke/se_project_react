import { useState } from "react";

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues({
            ...values,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return { values, handleChange, resetForm };
}