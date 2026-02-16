import express from "express";
import { authRoute, campaignRoute, donationRoute } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use(donationRoute);
app.use(authRoute);
app.use(campaignRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server listening on port ${port}!`));
