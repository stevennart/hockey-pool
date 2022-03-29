import React from 'react';
import './Sponsors.scss';
import Compugen from '../../../src/assets/images/Sponsors/Compugen_Logo.png';
import Ricoh from '../../../src/assets/images/Sponsors/Ricoh_Canada_Logo.png';
import Oracle from '../../../src/assets/images/Sponsors/Oracle_Logo_v1.png';
import SRA from '../../../src/assets/images/Sponsors/SRA_Logo.png';
import Swansea from '../../../src/assets/images/Sponsors/Swansea_Logo.png';
import FVPhoto from '../../../src/assets/images/Sponsors/FrankVerbari_Logo.png';

const Sponsors = () => {

    return (
        <React.Fragment>
            {/* <br/> is used to move the underline to a new line when the screen is in a specific media query (once screen is small enough to have the navbar hamburger button appear ) */}
            {/* Removing the br will cause the underline to be on the same line as the thanks to sponsors text. */}
            <h1 className="sponsor-msg display-2 text-center">Thanks to all our sponsors!<br /></h1>

            <div className="container">
                <div className="row text-center justify-content-center sponsor-images">

                    {/* <!-- <div className="col-md-6"> --> */}
                    <div className="col">
                        <img src={Compugen} alt="compugen-logo" />
                    </div>

                    <div className="col">
                        <img src={Ricoh} alt="ricoh-canada-logo" />
                    </div>

                    <div className="col">
                        <img src={Oracle} alt="oracle-logo" />
                    </div>

                    <div className="col">
                        <img src={SRA} alt="sra-logo" />
                    </div>

                    <div className="col">
                        <img src={Swansea} alt="swansea-logo" />
                    </div>

                    <div className="col">
                        <img src={FVPhoto} alt="frank-verbari-logo" />
                    </div>

                </div>
            </div>

        </React.Fragment>
    );
};

export default Sponsors;