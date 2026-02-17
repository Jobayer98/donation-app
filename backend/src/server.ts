import express from "express";
import { authRoute, campaignRoute, donationRoute, paymentRoute } from "./routes";
import path from "path";

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
app.use(paymentRoute);


app.use(donationRoute);
app.use(authRoute);
app.use(campaignRoute);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
