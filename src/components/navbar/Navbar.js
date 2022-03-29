import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import './Navbar.scss';
import firebaseAuth from '../../assets/config/firebaseAuth';
import { RegistrationContext } from '../../context/RegistrationContext';


const Navbar = (props) => {

    const { registrationPool } = useContext(RegistrationContext);


    const HOME = "/#home";
    const ABOUT = "/#about";
    const DETAILS = "/#details";
    const QANDA = "/#qanda";
    const SPONSORS = "/sponsors";
    const PRIZES = "/prizes";
    const RULES = "/rules-scoring#rules";
    const SCORING = "/rules-scoring#scoring";
    const ADMIN = "/admin";


    // useEffect(() => {
    //     setTimeout(t => {

    //         console.log(registrationPool)
    //     })
    // }, [registrationPool]);

    return (
        // Used as a wrapper for react's div wrapper when rendering the jsx, react.fragment will not show up on the dom as a div.      
        <>
            {/* collapseOnSelect is a Navbar attribute/prop to collapse nav list if a link is clicked on. */}
            <nav className="red-background-navbar navbar navbar-expand-lg fixed-top navbar-light navbar-custom">
                {/* Container to add margin adjustment on the left and right, w/o it then it take the entire horizontal width of the navbar */}
                <div className="container">
                    <a className="navbar-brand" href="/">ITS FedHealth Hockey Playoff Pool</a>
                    {/* Navbar.Toggle is needed for responsiveness, it is the button when screen width in smaller breakpoints. */}
                    {/*  <Navbar.Toggle /> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsiveTarget">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Navbar.Collapse is the behavior once the buttons is pressed it will expand and collapse when clicked again. */}
                    <div className="collapse navbar-collapse" id="navbarResponsiveTarget">
                        {/* ml-auto means margin left auto margin adjustment */}
                        {/* ml-auto is a bootstrap class */}
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {/* has active class to make it black */}
                                {/* add SMOOTH prop to create smooth scrolling */}
                                {/* https://reactrouter.com/web/api/NavLink for NavLink reference */}
                                {/* (MATCH, LOCATION) needed params otherwise function doesnt register for isActive prop. */}
                                <NavLink exact smooth to={HOME} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        // Needed an || incase route is either / or /#home both refers to the same. 
                                        return (routeName === HOME || (routeName == "/" && location.hash == "")) ? true : false;
                                    }} className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink smooth exact to={ABOUT} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        return (routeName === ABOUT) ? true : false;

                                    }} className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink smooth exact to={DETAILS} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        return (routeName === DETAILS) ? true : false;
                                    }}
                                    className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink smooth exact to={QANDA} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        return (routeName === QANDA) ? true : false;
                                    }}
                                    className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Q&A
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={SPONSORS} className="nav-link" activeClassName="selected" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Sponsors
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={PRIZES} className="nav-link" activeClassName="selected" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Prizes
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink smooth exact to={RULES} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        return (routeName === RULES) ? true : false;
                                    }}
                                    className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Rules
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink smooth exact to={SCORING} activeClassName="selected"
                                    isActive={(match, location) => {
                                        let routeName = `${location.pathname}${location.hash}`;
                                        return (routeName === SCORING) ? true : false;
                                    }}
                                    className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Scoring
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={ADMIN} className="nav-link" activeClassName="selected" data-toggle="collapse" data-target=".navbar-collapse.show">
                                    Admin
                                </NavLink>
                            </li>
                            {/*    <li className="nav-item">
                                <NavLink onClick={() => firebaseAuth.auth().signOut()} to="" className="nav-link" activeClassName="selected" data-toggle="collapse" data-target=".navbar-collapse.show">Sign Out</NavLink>
                            </li> */}
                            <li className={registrationPool.isClosed ? "nav-item disabled-register" : "nav-item"}>
                                <a
                                    className={registrationPool.isClosed ? "nav-link disabled" : "nav-link"}
                                    target="_blank"
                                    href={registrationPool.registrationLink}
                                >
                                    {/* Requires a span to hold the data-toggle, data-target otherwise if put on <a> it will break it */}
                                    <span
                                        data-toggle="collapse"
                                        data-target=".navbar-collapse.show">
                                        Register
                                     </span>
                                </a>
                                {/* className - disabled, cursor Not-Allowed */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;  