import React, { useState, useContext } from "react";
import "./Homepage.scss";
import Landing from "./landing/Landing";
import About from "./about/About";
import Details from "./details/Details";
import Qna from "../../qna/Qna";
import { RegistrationContext } from "../../../context/RegistrationContext";

const Homepage = ({ year }) => {
  {
    /* Change to false or true depending on time for registration */
  }
  // const [registrationIsClosed, setRegistrationIsClosed] = useState(true);
  const { registrationPool } = useContext(RegistrationContext);

  return (
    <>
      {/* Removed main-container b/c it was causing footer and landing page to overlap. */}
      <Landing />
      <About />
      <Details
        registrationIsClosed={registrationPool.isClosed}
        registrationLink={registrationPool.registrationLink}
        year={year}
      />
      <Qna
        registrationIsClosed={registrationPool.isClosed}
        registrationLink={registrationPool.registrationLink}
        year={year}
      />
    </>
  );
};

export default Homepage;
