import React, { useState, useRef, useContext } from "react";
import "./Admin.scss";
import XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import EmailWinnerModal from "../email-winner-modal/EmailWinnerModal";
import { API } from "../../../utils/API";
import { useForm } from "../../../forms/useForm";
import { RegistrationContext } from "../../../context/RegistrationContext";

const Admin = () => {
  const { registrationPool } = useContext(RegistrationContext);
  const { values, handleChange } = useForm({
    registerLink: registrationPool.registrationLink,
    isClosed: registrationPool.isClosed,
  });

  const dropFileForm = useRef();
  const fileLabelText = useRef();
  const progressBarRef = useRef();
  const modalMessageRef = useRef();
  const progressModalRef = useRef();
  const submitModalRef = useRef();
  const confirmButtonRef = useRef();

  // ------STATES-------
  const [winners, setWinners] = useState([{}]);
  const [fileForm, setFileForm] = useState({
    isHovering: false,
    canSubmit: false,
  });

  const [modalSettings, setModalSettings] = useState({
    backdropExit: "static",
    keyboardExit: true,
    showConfirmModal: true,
    showProgressBar: false,
  });

  const overrideDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const fileHover = () => {
    setFileForm((state) => ({
      ...state,
      isHovering: true,
    }));
  };

  const fileHoverEnd = () => {
    setFileForm((state) => ({
      ...state,
      isHovering: false,
    }));
  };

  // Grabs dropped files from event, if none then say no file selected
  const addFiles = (event) => {
    let droppedFile = event.target.files || event.dataTransfer.files;

    if (droppedFile.length == 0) {
      fileLabelText.current.innerText = "No file selected!";
    } else if (droppedFile.length > 1) {
      fileLabelText.current.innerText = "One file at a time!";
    } else {
      showFiles(droppedFile);
    }
  };

  // checks if file is xlsx ext, if it is show the name and handle the file.
  const showFiles = (file) => {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const XLS = "application/vnd.ms-excel";
    const XLSX =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    let fileType = file[0].type;
    if (fileType != XLS && fileType != XLSX) {
      fileLabelText.current.innerText = "Please upload an excel file!";
      setFileForm((currentState) => ({ ...currentState, canSubmit: false }));
    } else {
      fileLabelText.current.innerText = file[0].name;
      handleFile(file);
    }
  };

  const handleFile = (incomingFiles) => {
    let f;
    let files = incomingFiles;
    let data;
    let result;
    let workbook;
    let arr = [];
    let binaryString;
    let fileReader = new FileReader();

    for (let i = 0; i < files.length; i++) {
      f = files[i];

      fileReader.onload = (e) => {
        data = new Uint8Array(e.target.result, { type: "array" });

        for (let j = 0; j < data.length; j++) {
          arr[j] = String.fromCharCode(data[j]);
        }

        binaryString = arr.join("");

        workbook = XLSX.read(binaryString, {
          type: "binary",
        });

        let winnerSheet = workbook.Sheets[workbook.SheetNames[0]];

        if (
          winnerSheet.A1.h === "Rank" &&
          winnerSheet.B1.h === "Full Name" &&
          winnerSheet.C1.h === "Email"
        ) {
          result = XLSX.utils.sheet_to_json(winnerSheet);
          if (result.length > 0) {
            setWinners(result);
            setFileForm((currentState) => ({
              ...currentState,
              canSubmit: true,
            }));
          }
        } else {
          fileLabelText.current.innerText =
            "Format Incorrect! \n Correct Column Headers --> Rank, Full Name, Email <--";
          setFileForm((currentState) => ({
            ...currentState,
            canSubmit: false,
          }));
        }

        // sheet_name_list = workbook.SheetNames;
        // sheet_name_list.forEach((y) => { /* iterate through sheets */
        //     //Convert the cell value to Json
        //     roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
        //     if (roa.length > 0) {
        //         result = roa;
        //     }
        // });
      };

      fileReader.readAsArrayBuffer(f);
    }
  };

  const sendWinnerEmail = async (e) => {
    try {
      let winnerEmails = winners.map((w) => w.Email);
      let winnerNames = winners.map((w) => w["Full Name"]);

      // postorder 0 means to run the code only if poster order is 0 in send_email.php
      const data = {
        postorder: 0,
        postemails: winnerEmails,
        postnames: winnerNames,
      };

      e.target.setAttribute("disabled", "");
      e.target.style.cursor = "not-allowed";

      await API.post("/send_email.php", data).then((res) => {
        let mailSent = res.data;

        if (mailSent === true) {
          progressModalRef.current.style.display = "block";
          submitModalRef.current.style.display = "none";

          // every 25 millisecond
          setInterval(() => {
            dataProcess();
          }, 50);
        } else {
          alert("Couldn't send email!");
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const dataProcess = () => {
    let progress = progressBarRef.current.getAttribute("data-value");

    if (progress >= 100) {
      progress = 100;

      modalMessageRef.current.innerText =
        "Email system is now running. Winners will be notified soon";
      progressBarRef.current.style.background = "#3bbc03";

      setTimeout(() => {
        // Forces a refresh of the current page admin after email submission.
        // window.location.replace('/admin');
        window.location.replace("/");
      }, 1000);
    }

    let newProgress = progress * 1 + 1.5;
    let progressbar = Math.floor(newProgress) + "%";
    progressBarRef.current.setAttribute("data-value", newProgress);
    progressBarRef.current.style.width = progressbar;
  };

  const changeRegisterStatus = async (e) => {
    try {
      e.preventDefault();
      const data = {
        updateType: "registerStatus",
        value: !values.isClosed,
      };

      await API.post("/update_pool.php", data).then((res) => {
        if (res.data == true) {
          window.location.reload(true);
        } else {
          alert("Failed to update registration status");
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const changeRegisterLink = async (e) => {
    try {
      e.preventDefault();

      const data = {
        updateType: "registerLink",
        value: values.registerLink,
      };

      await API.post("/update_pool.php", data).then((res) => {
        if (res.data == true) {
          window.location.reload(true);
        } else {
          alert("Failed to update registration link");
        }
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div id="admin-container">
        <h1 className="text-center">Ranking the Winners</h1>
        <p className="text-center">
          Now that the playoffs have came to an end, we must distribute the
          prizes to the winners
        </p>

        <div
          id="dropFileForm"
          className={fileForm.isHovering ? "fileHover" : null}
          ref={dropFileForm}
        >
          <label
            htmlFor="fileInput"
            id="fileLabel"
            onDragOver={(event) => {
              overrideDefault(event);
              fileHover();
            }}
            onDragEnter={(event) => {
              overrideDefault(event);
              fileHover();
            }}
            onDragLeave={(event) => {
              overrideDefault(event);
              fileHoverEnd();
            }}
            onDrop={(event) => {
              overrideDefault(event);
              fileHoverEnd();
              addFiles(event);
            }}
          >
            {/* <i style={{ color: "white" }} className="fa fa-download fa-5x"></i> */}
            <FontAwesomeIcon color="white" icon={faDownload} size={"5x"} />
            <br />
            <br />
            <span ref={fileLabelText} id="fileLabelText">
              {" "}
              Choose a file or drag it here{" "}
            </span>
            <br />
            <span id="uploadStatus"></span>
          </label>

          <input
            type="file"
            name="fileName"
            id="fileInput"
            onChange={(event) => addFiles(event)}
          />

          <section className="tableModule">
            <div className="table-responsive">
              <table className="table" id="rankingTable">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                  </tr>
                </thead>
                {fileForm.canSubmit ? (
                  <tbody>
                    {winners.map((winner, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{winner.Rank}</td>
                          <td>{winner["Full Name"]}</td>
                          <td>{winner.Email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : null}
              </table>
            </div>
          </section>

          <input
            type="submit"
            value="Submit"
            className="uploadButton"
            data-toggle="modal"
            data-target="#submitModal"
            disabled={!fileForm.canSubmit}
          />
        </div>

        <div id="registration">
          <h1>Registration</h1>
          <form onSubmit={changeRegisterLink}>
            <label htmlFor="registerLink">Registration Link:</label>
            <div className="input-group link-field">
              <input
                name="registerLink"
                type="text"
                id="registerLink"
                className="form-control"
                placeholder="Enter Registration Link...."
                onChange={handleChange}
                value={values.registerLink}
                required
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Change
                </button>
              </div>
            </div>
            <div className="input-group register-btn">
              <strong>Registration Status:</strong>
              <button
                id="statusButton"
                className={
                  registrationPool.isClosed
                    ? "btn btn-success"
                    : "btn btn-danger"
                }
                type="button"
                onClick={changeRegisterStatus}
              >
                {registrationPool.isClosed ? "Enable" : "Disable"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Only appears whenever #submitModal is clicked. */}
      <EmailWinnerModal
        ms={modalSettings}
        setMS={setModalSettings}
        modalMessageRef={modalMessageRef}
        progressBarRef={progressBarRef}
        sendWinnerEmail={sendWinnerEmail}
        progressModalRef={progressModalRef}
        submitModalRef={submitModalRef}
        confirmButtonRef={confirmButtonRef}
      />
    </>
  );
};

export default Admin;
