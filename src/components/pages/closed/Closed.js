import React from 'react';
import './Closed.scss';

const Closed = () => {

    return (
        <React.Fragment>

            {/*    <div className="display  d-flex text-center justify-content-center align-items-center flex-column">
                <h1 className="display-2 my-3">Registration currently unavailable...</h1>
                <p className="lead mt-5 w-60">Contact one of the Commissioners Nino at <strong>nino.apostoli@ontario.ca</strong>
                or Frank at <strong>frank.verbari@ontario.ca</strong> for more information.
            </p>
            </div> */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 unvailable-msg d-flex text-center justify-content-center align-items-center flex-column">

                        <h1 className="display-2 my-3">Registration currently unavailable...</h1>
                        <p className="lead mt-5">Contact one of the Commissioners Nino at <span className="bold-email">nino.apostoli@ontario.ca</span>
                         &nbsp;or Frank at <span className="bold-email">frank.verbari@ontario.ca</span> for more information.
                        </p>

                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Closed;