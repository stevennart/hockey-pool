import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './Layout.scss';

const Layout = ({ children, year }) => {

    return (
        <React.Fragment>
            <div id="sticky-footer">
                <Navbar />
                {children}
                <Footer year={year} />
            </div>
        </React.Fragment>
    );
};

export default Layout;