const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: "./config.env" });

exports.career_streaming_new = async (req, res) => {
    try {
        // Set up response stream
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Transfer-Encoding", "chunked"); // Enable chunked encoding

        console.log(req.body);
        const response = await axios({
            method: "post",
            url: `http://${process.env.ML_SERVER_IP}/career_streaming_new`,
            data: req.body,
            responseType: "stream",
        });

        // Pipe the streamed response to the client
        response.data.on("data", (chunk) => {
            // Send each chunk individually
            res.write(chunk);
        });
        response.data.on("end", () => {
            // End the response stream
            res.end();
        });
    }
    catch (err) {
        console.log(err);
    }
};

exports.ai_psychiatrist= async (req, res) => {
    try {
        // Set up response stream
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Transfer-Encoding", "chunked"); // Enable chunked encoding

        const response = await axios({
            method: "post",
            url: `http://${process.env.ML_SERVER_IP}/ai_psychiatrist`,
            data: req.body,
            responseType: "stream",
        });

        // Pipe the streamed response to the client
        response.data.on("data", (chunk) => {
            // Send each chunk individually
            res.write(chunk);
        });
        response.data.on("end", () => {
            // End the response stream
            res.end();
        });
    }
    catch (err) {
        console.log(err);
    }
};