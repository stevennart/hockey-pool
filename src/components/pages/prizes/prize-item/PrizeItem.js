import React from 'react';
import './PrizeItem.scss';

const PrizeItem = ({ prizeID, prizeName, prizeImage, openModal }) => {

    return (
        <React.Fragment>

            <div onClick={() => { openModal(prizeID, prizeName, prizeImage); }} className="column" tabIndex='0' data-toggle='modal' data-target='#myModal'>

                <div className='containerHeading'>
                    <div className='card-prizes card-corner'>
                        <div className='card-header-prizes'>
                            <p className='text-prizes'>{prizeName}</p>
                        </div>
                    </div>
                </div>

                <img alt={prizeName} className='img-fluid mx-auto d-block' src={prizeImage} />

            </div>

        </React.Fragment>
    );
};

export default PrizeItem;