import React, { useState, useEffect } from "react";
import "./Scoring.scss";
import ScoringStyles from "./Scoring.module.scss";
import { EXCEL } from "../../utils/API";
import XLSX from "xlsx";

const Scoring = () => {
  const FILENAME = "HockeyPool_Scoring2021.xlsx";

  const [scoreData, setScoreData] = useState([{}]);

  useEffect(() => {
    fetchScoreData(FILENAME); // needs a file name
  }, []);

  const fetchScoreData = async (FILENAME) => {
    if (!FILENAME) {
      throw new Error("Function requires a filename");
    }

    try {
      await EXCEL.get(FILENAME).then(async (res) => {
        res.data.arrayBuffer().then(async (res) => {
          let data = new Uint8Array(res);
          let arr = [];

          for (let i = 0; i < data.length; i++) {
            arr[i] = String.fromCharCode(data[i]);
          }

          let binaryString = arr.join("");

          const workbook = XLSX.read(binaryString, {
            type: "binary",
          });

          convertToJSON(workbook);
        });
      });
    } catch (error) {
      throw error;
    }
  };

  const convertToJSON = (workbook) => {
    let sheetName = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[sheetName];

    let scoredata = XLSX.utils.sheet_to_json(worksheet, {
      raw: true,
    });

    addBlanks(scoredata);
    setScoreData(scoredata);
  };

  const addBlanks = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].GOALIE == null) {
        data[i].GOALIE = "";
        data[i].POINTS_2 = "";
      }
    }
  };

  return (
    <>
      <section className="content-section bg-light text-center" id="scoring">
        <h1>Scoring</h1>
        <section className="tableModule">
          <div className="table-responsive">
            <table className="table tableizer-table" id="scoringTable">
              <thead>
                <tr>
                  <th>FORWARD</th>
                  <th>POINTS</th>
                  <th></th>
                  {/* <th>ROOKIE</th>
                                <th>POINTS</th>
                                <th></th> */}
                  <th>DEFENCE</th>
                  <th>POINTS</th>
                  <th></th>
                  <th>GOALIE</th>
                  <th>POINTS</th>
                </tr>
              </thead>
              <tbody>
                {scoreData.map((score, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{score.FORWARDS}</td>
                      <td className={ScoringStyles.centerColumnText}>
                        {score.POINTS}
                      </td>
                      <td
                        style={{
                          borderBottom: "2px solid white",
                          background: "white",
                        }}
                        className={ScoringStyles.blankColumn}
                      ></td>
                      <td>{score.DEFENCE}</td>
                      <td className={ScoringStyles.centerColumnText}>
                        {score.POINTS_1}
                      </td>
                      <td
                        style={{
                          borderBottom: "2px solid white",
                          background: "white",
                        }}
                        className={ScoringStyles.blankColumn}
                      ></td>
                      <td>{score.GOALIE}</td>
                      <td className={ScoringStyles.centerColumnText}>
                        {score.POINTS_2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
};

export default Scoring;
