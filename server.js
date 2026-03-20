import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connection.js";
import errorHandler from "./middleware/error.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connectDb();
