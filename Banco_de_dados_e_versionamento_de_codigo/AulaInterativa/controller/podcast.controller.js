import { db } from "../models/index.js";

const Podcast = db.podcast;

const create = async (req, res) => {
  const podcast = new Podcast({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    source: req.body.source,
    rss: req.body.rss,
    android: req.body.android,
    itunes: req.body.itunes,
    soundcloud: req.body.soundcloud,
  });

  try {
    const data = await podcast.save(podcast);
    res.send(data);
  } catch (error) {
    res.status(500).send("Erro ao inserir documento " + error);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Podcast.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send("Erro ao listar todos os podcasts " + error);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Podcast.findById({ _id: id });
    res.send(data);
  } catch (error) {
    res.status(500).send("Erro ao exibir podcast " + error);
  }
};

const update = async (req, res) => {
  const id = req.param.id;

  try {
    const data = await Podcast.findByIdAndUpdate({ _id:id }, req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send("Erro ao atualizar podcast " + error);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = Podcast.findByIdAndRemove({ _id:id });
    if (!data) {
      res.status(404).send("Pocast não encontrado");
    } else {
      res.send("Excluido com sucesso!");
    }
  } catch (error) {
    res.status(500).send("Erro ao deletar podcast " + error);
  }
};

export default {create,findAll, findOne, update, remove};
