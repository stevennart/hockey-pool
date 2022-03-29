import React, { useEffect, useRef } from 'react';
import './EmailWinnerModal.scss';
import BSN from 'bootstrap.native';


const EmailWinnerModal = ({ ms, setMS, modalMessageRef, progressBarRef, sendWinnerEmail, progressModalRef, submitModalRef, confirmButtonRef }) => {

    let modalRef = useRef();

    useEffect(() => {

        // let m = new BSN.Modal(modalRef.current, {
        //     backdrop: "true",
        //     keyboard: true
        // });
        //data-backdrop={backdropExit} 
        //data-keyboard={keyboardExit}
    }, []);


    // const change = () => {
    //     let m = new BSN.Modal(modalRef.current, {
    //         backdrop: false,
    //         keyboard: false
    //     }).show();  
    // }

    return (
        <>
            <div ref={modalRef} className="modal fade modal-center" data-backdrop="static" data-keyboard="false" id="submitModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: "500px" }}>


                    {/*  <!-- Confirm --> */}
                    <div ref={submitModalRef} className={"modal-content"} id="confirmModal">
                        <div className="modal-header">
                            <h5>Confirm</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12" style={{ textAlign: "center" }}>
                                    <p>Are you sure?</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button ref={confirmButtonRef} onClick={sendWinnerEmail} type="button" className="btn btn-primary" id="confirmButton">Yes</button>
                        </div>
                    </div>

                    {         /* <!-- Data Process --> */}
                    <div ref={progressModalRef} className={`modal-content progress-modal`} id="successModal">

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12" style={{ textAlign: "center" }}>
                                    <p ref={modalMessageRef} id="dataMessage">Processing data...</p>
                                    <div className="progress">
                                        <div ref={progressBarRef} className="progressBar" data-value="0" data-max="100">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
};

export default EmailWinnerModal;
