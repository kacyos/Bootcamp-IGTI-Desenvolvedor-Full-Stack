import express from "express";
import { podcastRouter } from "./routes/podcastRouter.js";
import { db } from "./models/index.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conectado no banco de dados com sucesso");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados");
  }
})();

const app = express();

app.use(express.json());
app.use(podcastRouter);

app.get("/", (req, res) => {
  res.send("API em execução");
});

app.listen( process.env.PORT || 3000, () => {
  console.log("Servidor ouvindo na porta " + process.env.PORT);
});
