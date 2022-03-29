import React, { useEffect, useState, useRef } from 'react';
import './Congrats.scss';
import puckLoadGif from '../../assets/images/puckload.gif';


const Congratulations = ({ year }) => {

    const loadingRef = useRef();
    const congratsRef = useRef();

    // const [hideLoading, setHideLoading] = useState(false);
    // const [showCongrats, setShowCongrats] = useState(false);
    // const [showText, setShowText] = useState(false);

    useEffect(() => {
        // loadingRef.current.style.display = "block";
        // congratsRef.current.style.display = "none";
        // congratsRef.current.querySelector('.module').style.opacity = "0";
        // congratsRef.current.querySelector('.module').style.height = '0px';
        // congratsRef.current.querySelector('.moduleText').style.opacity = "0";
        loadingScreen();
    }, []);


    const loadingScreen = () => {
        setTimeout(hideLoad, 1500);
        setTimeout(showCongrats, 1800);
        setTimeout(showText, 2100);
    };

    const hideLoad = () => loadingRef.current.style.display = "none";

    const showCongrats = () => {

        congratsRef.current.style.display = "block";

        // Have to add a delay otherwise the transition from opacity 0 to 1 is not shown.
        setTimeout(() => {
            congratsRef.current.querySelector('.module').style.opacity = "1";
            congratsRef.current.querySelector('.module').style.height = '300px';
        });
    };

    const showText = () => congratsRef.current.querySelector('.moduleText').style.opacity = "1";

    return (

        <div id="contentContainer">

            <div ref={loadingRef} id="loading">
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{ zIndex: '2' }}>
                            <div className="loadingContainer">
                                <h1 id="loadingText">LOADING</h1>
                            </div>
                        </div>
                        <div className="col-6" >
                            <img id="puckLoad" src={puckLoadGif} style={{ marginLeft: '-30px' }}></img>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={congratsRef} id="contents">
                <div className="container">
                    <div className="row">
                        <div className="module">
                            <div className={`moduleText`}>
                                <h2 className="text-center">Congratulations</h2>
                                <br />
                                <p>You are one of the lucky winners from the {year} Hockey Pool</p>


                                <p>  An email will be sent shortly with the details of your prize</p>

                                <br />
                                <div className="align-center">
                                    <p>Thank you for participating!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Congratulations; 