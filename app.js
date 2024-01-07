import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/route.js";
import routerTwo from "./routes/routeTwo.js";
import routerThree from "./routes/routeThree.js";

dotenv.config()

const app = express()

app.use(express.json());
app.use(cors());


app.use('/joke', router);
app.use('/drJoke', routerTwo);
app.use('/erJoke', routerThree);


mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('Databse Connected');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });