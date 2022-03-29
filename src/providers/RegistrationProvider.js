import React, { useEffect, useState } from "react";
import { RegistrationContext } from '../context/RegistrationContext';
import { API } from '../utils/API';

export const RegistrationProvider = ({ children }) => {

    const [registrationPool, setRegistrationPool] = useState(null);

    useEffect(() => {

        try {

            API.get('/fetch_pool.php', { params: { type: 'all' } }).then(async (res) => {
                // console.log(res)
                setRegistrationPool(res.data);
            });



        } catch (error) {
            throw error;
        }

    }, []);

    return (
        <RegistrationContext.Provider value={{ registrationPool }}>
            {children}
        </RegistrationContext.Provider>
    );
}; 