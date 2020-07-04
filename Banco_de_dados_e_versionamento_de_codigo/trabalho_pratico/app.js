import express from "express";
import mongoose from "mongoose";
import { accountsRouter } from "./routers/accountsRouter.js";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:password@igti-30den.mongodb.net/accounts?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("Erro ao conectar " + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountsRouter);

app.listen(3000, () => console.log("API Iniciada"));
