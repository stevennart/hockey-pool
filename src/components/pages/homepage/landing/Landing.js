import React from 'react';
import './Landing.scss';
import landingImage from '../../assets/images/logo.png';

const Landing = (props) => {
    return (
        <React.Fragment>
            <header id="home">
                <div id="carouselExampleIndicators">
                    <div className="bg">
                        <img className="someImage" src={landingImage} />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Landing;