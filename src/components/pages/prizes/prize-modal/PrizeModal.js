import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../forms/useForm.js';
import { API } from '../../utils/API';
import './PrizeModal.scss';


const PrizeModal = ({ prizeID, prizeName, prizeImage, mo }) => {

    const { values, handleChange } = useForm({ prize_code: "" });
    const history = useHistory();

    const inputRef = useRef();
    const collectButtonRef = useRef();
    const { modal, setModal } = mo;

    useEffect(() => {

        // Sends the reference of the input field to prizes component the moment it loads the component.  
        setModal((prev) => ({
            ...prev,
            input: inputRef
        }))

    }, []);

    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        setModal(state => ({ ...state, isCheckingCode: true }));

        setTimeout(() => {
            checkCode(values.prize_code.trim());
        }, 1000);

    };

    const checkCode = async (prizeCode) => {

        try {

            const data = {
                postcode: prizeCode
            };

            await API.post("/check_code.php", data).then((res) => {

                const correctPrizeCode = res.data;

                setModal(state => ({
                    ...state,
                    isCheckingCode: false
                }));

                if (correctPrizeCode) {

                    setModal(state => ({
                        ...state,
                        correctCode: true,
                        hasError: false
                    }));

                } else {

                    setModal(state => ({
                        ...state,
                        correctCode: false,
                        hasError: true
                    }));

                }

            });

        } catch (error) {
            throw (error);
        }

    };

    const collectPrize = async () => {

        setModal((state) => ({
            ...state,
            isCollectingPrize: true
        }));
        // disabled the button when collecting prize to prevent user from clicking it again. 
        collectButtonRef.current.style.cursor = "not-allowed";

        try {

            // postorder determines what logic is triggered in send_email.php 
            const data = {
                postorder: 1,
                postwinnercode: values.prize_code,
                postprizeid: prizeID,
                postimg: prizeName,
                postimgsrc: prizeImage
            };

            await API.post('/send_email.php', data).then((res) => {

                const sentMail = res.data;

                if (sentMail == true) {
                    setModal((state) => ({ ...state, isCollectingPrize: false }));
                    // history.push('/congratulations');
                    // using the above code will keep the modal backdrop even if you route to a new page.    
                    window.location.replace('/congratulations');
                } else {
                    alert("Failed to collect prize!");
                }

            });

        } catch (error) {
            throw (error);
        }

    };

    return (
        <>
            <div className="modal fade modal-center" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        {/* Modal Header: Prize Name + Close Modal Button */}
                        <div className="modal-header" style={{ background: '#7d0000', color: 'white' }}>
                            {/* Prize Name */}
                            {/* delete col 6? */}
                            <h5 className="col 6 modal-title text-center" id="exampleModalLabel">{prizeName}</h5>
                            {/* Close Modal Button */}
                            <button style={{ color: 'white' }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* Modal Body: Prize Picture + Prize Code Form */}
                        <div className="modal-body" style={{ background: 'white', color: 'black' }}>
                            <div className="row">
                                {/* Modal Body: Prize Picture + Prize Code Form */}
                                <div className="col-sm-6" style={{ padding: '10px', borderRight: '1px solid rgb(201, 196, 196)' }}>
                                    <img className="img-fluid mx-auto d-block" src={prizeImage} alt={prizeName} />
                                    {/*  <!-- this img tag receives dynamic image data --> */}
                                </div>
                                {/* ------- */}
                                {/* Modal Body: Prize Picture + Prize Code Form */}
                                <div className="col-sm-6">
                                    <div className="activationContainer">
                                        <div className="activationContent">
                                            <p>Claim your Prize!</p>
                                            <form onSubmit={handleCodeSubmit}>
                                                <div className="input-group">
                                                    <input
                                                        id="codeInput"
                                                        name="prize_code"
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter Code"
                                                        onChange={handleChange}
                                                        ref={inputRef}
                                                        disabled={modal.correctCode}
                                                    />
                                                    <span className="input-group-btn">
                                                        {/* spinner-border & text-light is part of bootstrap classes */}
                                                        <button
                                                            id="activateButton"
                                                            disabled={modal.correctCode}
                                                            className={`btn btn-default 
                                                            ${(!modal.isCheckingCode && !modal.correctCode) && "normal-button"}
                                                            ${(modal.isCheckingCode && !modal.correctCode) && "checking-code-button"}
                                                            ${(modal.correctCode && !modal.isCheckingCode) && "correct-code-button"}`}
                                                            type="submit"
                                                            data-original-title=""
                                                            title=""
                                                        >
                                                            {(modal.isCheckingCode && !modal.correctCode) && <span className="spinner-border text-light" style={{ height: '20px', width: '20px' }}></span>}
                                                            {(!modal.correctCode && !modal.isCheckingCode) && <span className="activateText"><strong>Enter</strong></span>}
                                                            {(modal.correctCode && !modal.isCheckingCode) && <span className="successIcon" id="success"><i className="fas fa-check"></i></span>}
                                                        </button>
                                                    </span>
                                                </div>
                                            </form>
                                            {modal.hasError && <p id="error">Incorrect Password. Please Try Again</p>}
                                        </div>
                                    </div>
                                </div>
                                {/* ------- */}
                            </div>
                        </div>
                        {/* Modal Footer: Close + Collect Prize Buttons */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                                type="button"
                                id={modal.correctCode ? "collectUnlocked" : "collectButton"}
                                className="btn collectBtn"
                                disabled={!modal.correctCode || modal.isCollectingPrize}
                                onClick={collectPrize}
                                ref={collectButtonRef}
                            >
                                {/* spinner-border, text-light is part of bootstrap classes */}
                                {modal.isCollectingPrize && <span className="spinner-border text-light" style={{ height: '20px', width: '20px', marginRight: '5px' }}></span>}
                                Collect Prize
                            </button>
                        </div>
                        {/* ------- */}
                    </div>
                </div>
            </div>


        </>
    );
};

export default PrizeModal;