import express from "express";

import path from "path";
import apiRoute from "./routes";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TypeError: path must be absolute or specify root to res.sendFile
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/checkout.html"));
// });
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/success.html"));
});
app.get("/cancel", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cancel.html"));
});
app.get("/failed", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/failed.html"));
});

app.use(apiRoute)

app.listen(port, () => console.log(`Server listening on port ${port}!`));
