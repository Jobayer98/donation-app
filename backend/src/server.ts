import express from "express";
import apiRoute from "./routes/routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use(apiRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server listening on port ${port}!`));
