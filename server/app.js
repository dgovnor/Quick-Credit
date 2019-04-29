import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./routes";

//set up express app
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

//Wrong endpoints

app.all("*", (req, res) =>
  res.status(404).send({
    status: 404,
    error: "Endpoint doesn't Exist!"
  })
);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});

export default app;
