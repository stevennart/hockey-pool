import axios from "axios";

const HOST = "https://hockeypool.frankverbari.com";

// API use for php backend calls to fetch data.
// api/ will be a folder that contains all the php files on the FTP server. 
const API = axios.create({
    baseURL: `${HOST}/api/`,
    // baseURL: "http://localhost:8087/hockeypool-react/api/",
    responseType: "json"
});

// EXCEL use for fetching excel files
// path source is the hockeypools FTP server excel folder where all excels are. 
// In the scoring.js just have to provide the filename for it to fetch the right one the baseURL will be the prefix.
const EXCEL = axios.create({
    baseURL: `${HOST}/excel/`,
    responseType: "blob",
});

export {
    API,
    EXCEL
}