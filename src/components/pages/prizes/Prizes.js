import React, { useState, useEffect } from "react";
import "./Prizes.scss";
import PrizeItem from "./prize-item/PrizeItem";
import PrizeModal from "../../prize-modal/PrizeModal";
import { API } from "../../../utils/API";
// import { PrizeCodeContext } from '../../context/PrizeCodeContext';

const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // initial state.
  const [modal, setModal] = useState({
    id: -999,
    name: "",
    image: "",
    input: null,
    correctCode: false,
    isCheckingCode: false,
    hasError: false,
    isCollectingPrize: false,
  });

  useEffect(() => {
    fetchPrizes();
  }, []);

  // Fetches an array of prize objects from database.
  const fetchPrizes = async () => {
    try {
      await API.get("/fetch_prizes.php").then(async (res) => {
        setPrizes(res.data);
      });
    } catch (e) {
      alert(e);
    }
  };

  const openPrizeModal = (prizeID, prizeName, prizeImage) => {
    // sets the prize details and resets properties that changes the way the prize modal is shown
    setModal((prev) => ({
      ...prev,
      id: prizeID,
      name: prizeName,
      image: prizeImage,
      correctCode: false,
      isCheckingCode: false,
      hasError: false,
      isCollectingPrize: false,
    }));

    // Clears the form field when opening a prize modal.
    modal.input.current.value = "";

    setShowModal(!showModal);
  };

  return (
    <>
      <div className="container-fluid full-height">
        <div className="row">
          <div className="col-lg-12 text-center justify-content-center prize-msg">
            <h1 className="">Prize List</h1>
            <p className="">
              The prize list is not yet complete. Please check back frequently
              as this list expands.
            </p>
            <p className="">For now here are the prizes available.</p>
          </div>
        </div>

        {/* Just a row to contain the boxes of prizes */}
        <div className="row justify-content-center bottom-spacing">
          {prizes.map((p) => {
            return (
              /*   <div key={p.prizeID} className="col-lg-4">  */
              <PrizeItem
                openModal={openPrizeModal}
                key={p.prizeID}
                prizeID={p.prizeID}
                prizeName={p.prizeName}
                prizeImage={p.prizeImage}
              />
              /*  </div> */
            );
          })}
        </div>
      </div>

      {/* Modal UI */}
      {
        /* <PrizeCodeContext.Provider value={{ setModal }}>  */
        <PrizeModal
          mo={{ modal, setModal }}
          prizeID={modal.id}
          prizeName={modal.name}
          prizeImage={modal.image}
        />
        /* </PrizeCodeContext.Provider> */
      }
    </>
  );
};

export default Prizes;
