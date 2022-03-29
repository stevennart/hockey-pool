import React, { useState } from 'react';


export const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues);

    return {
        values,
        handleChange: e => {
            // console.log(e)
            // prevState & ...values is the same thing, it grabs the previous state values since setValues does not recongize its old values.
            setValues((prevState) => ({
                ...values,
                [e.target.name]: e.target.value
            }));
        }
    };

};  