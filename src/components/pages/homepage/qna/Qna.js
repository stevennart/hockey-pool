import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Qna.scss";
import { RegistrationContext } from "../../context/RegistrationContext";

const Qna = ({ registrationIsClosed, registrationLink, year }) => {
  // const { registrationPool } = useContext(RegistrationContext);

  const closedButton = (
    <Link to={"/closed"} target="_blank">
      {year} Federated Health NHL Hockey Pool
    </Link>
  );

  const openedButton = (
    <a href={registrationLink} target="_blank">
      {year} Federated Health NHL Hockey Pool
    </a>
  );

  return (
    <React.Fragment>
      <section className="content-section bg-light text-center" id="qanda">
        <div className="container">
          <div className="content-section-heading">
            <h1 className="mb-5 questionTop">Q&A</h1>
            <div className="qandaWrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#col1"
                      >
                        Where can I get more information?
                      </button>
                    </div>

                    <div id="col1" className="collapse show">
                      <div className="card-body">
                        Check out our website for more information:
                        www.hockeypool.frankverbari.com
                        <br />
                        <strong style={{ fontSize: "1.5em" }}>or</strong>
                        <br />
                        Contact one of the Commissioners Nino at
                        nino.apostoli@ontario.ca or Frank at
                        frank.verbari@ontario.ca
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="card">
                    {/* <!-- If we want header and body to be in collapse format, then collapsed should be added to button --> */}
                    <div className="card-header">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#col2"
                      >
                        When do I register?
                      </button>
                    </div>

                    {/*  <!-- and collapse must be added to the parent of card-body --> */}
                    <div id="col2" className="collapse">
                      <div className="card-body">
                        <div>
                          {/*   <!-- <p>Register today and be sure to select your team before <span className="text-danger">April 10, 2019
                              @ 12:00 PM</span> (Noon)</p> --> */}

                          <p>
                            Registration is now open! Playoffs start on August
                            1, {year}; registrations are open until July 31,
                            2021 at 6:00 PM. Please follow the link below to
                            register your teams. Good Luck to Participants.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#col4"
                      >
                        How do I register?
                      </button>
                    </div>

                    <div id="col4" className="collapse">
                      <div className="card-body">
                        {/* ternary operator to handle which element to render for page redirection */}
                        {/* Link to is used for internal routing to diff components, <a> is for external links */}
                        {registrationIsClosed ? closedButton : openedButton}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <button
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#col3"
                      >
                        How do I pay?
                      </button>
                    </div>

                    <div id="col3" className="collapse">
                      <div className="card-body">
                        <p>
                          Due COVID-19, we are not working in the office at this
                          time and only e-transfer is available for payment. All
                          payment must be received by the Commissioners by 6:00
                          PM July 31, 2021.
                        </p>
                        <p>Please send e-transfer to:</p>
                        <p>
                          Frank:{" "}
                          <span className="text-info">
                            frank.verbari@rogers.com
                          </span>
                        </p>
                        <p>
                          Nino:{" "}
                          <span className="text-info">aposton29@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Qna;
