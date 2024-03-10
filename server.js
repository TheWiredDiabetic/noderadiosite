// Requirements & Envs
const PORT = process.env.PORT || 3000
const express = require("express");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

const webPath = 'public';

const wApp = express();
wApp.use(express.json());
wApp.use(express.static(path.join(__dirname, webPath)));
wApp.listen(PORT, () => {
    if (PORT == undefined) {
        console.error("[FUSE RADIO] ERROR - PORT is undefined, or cannot be read correctly.");
        return
    } else {
        console.log(`[FUSE RADIO] Initalizing wApp for requests on ${PORT}`);
        console.log(`[FUSE RADIO] Initalized, listening for requests on PORT ${PORT}`);
    };
});

wApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

wApp.get('/api/v1/onair', async (req, res) => {
    let onairJson = await axios.get('https://fuseradio.xyz/api/onair');
    if (onairJson.data) {
        console.log(`[GET Success] Recieved data from https://fuseradio.xyz/api/onair, sending to /api/v1/nowplaying.`);
        res.status(200).json(onairJson.data);
    } else {
        console.log(`[GET FAIL] Failed to recieve data from https://fuseradio.xyz/api/onair, returning a 500.`);
        res.status(500).json({'errorCode':"500", 'errorMessage':"Axios was unable to make a successfull 'GET' request, returning a internal server error (500)."});
        return
    }
});