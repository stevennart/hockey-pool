import React, { useState, useEffect } from 'react';
import './Footer.scss'

const Footer = ({ year }) => {

    // const [year, setYear] = useState(new Date().getFullYear());

    return (
        <React.Fragment>

            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white font-weight-bold">PLAYOFF POOL DASHBOARD {year}</p>
                </div>
            </footer>

        </React.Fragment>
    );


};

export default Footer;