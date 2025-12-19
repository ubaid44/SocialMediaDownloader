const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.json({ success: false, message: "URL required" });
    }

    const command = `yt-dlp "${url}" -o "downloads/%(title)s.%(ext)s"`;

    exec(command, (error) => {
        if (error) {
            console.log(error);
            return res.json({ success: false, message: "Download failed" });
        }

        res.json({ success: true, message: "Download started successfully" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
