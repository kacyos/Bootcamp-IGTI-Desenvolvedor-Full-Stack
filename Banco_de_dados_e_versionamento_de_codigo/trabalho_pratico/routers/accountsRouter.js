import express from "express";
import { usersModel } from "../models/userSchema.js";
const app = express();

app.patch("/users/deposito/:agencia/:conta/:value", async (req, res) => {
  try {
    const user = await usersModel.findOne({ conta: req.params.conta });
    if (!user) {
      res.status(404).send("Conta não existente");
    }
    user.balance += parseInt(req.params.value);
    await user.save();
    res.status(200).send(`${user.name} seu saldo é ${user.balance}`);
  } catch (error) {
    res.status(500).send("nada encontrado " + error);
  }
});

//Saque
app.patch("/users/saque/:agencia/:conta/:value", async (req, res) => {
  try {
    const user = await usersModel.findOne({ conta: req.params.conta });
    const value = parseInt(req.params.value);

    if (!user) {
      res.status(404).send("Conta não existente");
    } else if (user.balance < value) {
      res.status(401).send(`Saldo insuficiente, saldo: ${user.balance}`);
    }

    user.balance -= value + 1;
    await user.save();
    res.status(200).send(`${user.name} seu saldo é ${user.balance}`);
  } catch (error) {
    res.status(500).send("nada encontrado " + error);
  }
});

//Consulta saldo
app.get("/users/saldo/:agencia/:conta", async (req, res) => {
  try {
    const user = await usersModel.findOne({ conta: req.params.conta });
    if (!user) {
      res.status(404).send("Conta não encontrada!");
    }
    res.status(200).send(`${user.name} seu saldo é: ${user.balance}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Deleta usuario
app.delete("/users/delete/:agencia/:conta", async (req, res) => {
  try {
    const user = await usersModel.findOne({ conta: req.params.conta });
    if (user) {
      await usersModel.deleteOne({ conta: req.params.conta });
      const sum = await usersModel.countDocuments({
        agencia: req.params.agencia,
      });
      res
        .status(200)
        .send(`Conta excluida com sucesso! O nº de contas ativas é de: ${sum}`);
    }
    res.status(404).send("Conta não encontrada!");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Realiza transferencia
app.post(
  "/users/transferencia/:depositante/:beneficiario/:valor",
  async (req, res) => {
    try {
      const depositante = await usersModel.findOne({
        conta: req.params.depositante,
      });
      const beneficiario = await usersModel.findOne({
        conta: req.params.beneficiario,
      });

      if (depositante.agencia !== beneficiario.agencia) {
        depositante.balance -= 8;
      } 
        depositante.balance -= req.params.valor;
        beneficiario.balance += parseInt(req.params.valor);
        res.status(200).send("Seu saldo é " + depositante.balance + "Saldo beneficiado: " + beneficiario.balance);
        depositante.save();
        beneficiario.save();
      
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// retorna media das contas
app.get("/users/media/:agencia", async (req, res) => {
  try {
    
    const filter = [
      {$match:{agencia: parseInt(req.params.agencia)}},
     {$group:{_id:null, total:{$avg:"$balance"}}}
    ]

    let result = await usersModel.aggregate(filter);
    res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error);
  }
});

//Lista clientes com menor saldo em conta
app.get("/users/listar/:value", async (req, res) => {
  let value = parseInt(req.params.value)
  try {
    const filter = await usersModel.find().sort({balance: 1}).limit(value);
    
    res.status(200).send(filter)
  } catch (error) {
    
  }
})

//Lista clientes mais ricos do banco
app.get("/users/especial/:value", async (req, res) => {
  let value = parseInt(req.params.value)
  try {
    const filter = await usersModel.find().sort({balance: -1, name: 1}).limit(value);
    
    res.status(200).send(filter)
  } catch (error) {
    
  }
})

app.patch("/users/trasfere/especial", async (req, res) => {
  
  try {
    const accounts = await usersModel
      .aggregate()
      .group({
        _id: '$agencia',
        data: {
          $max: {
            balance: '$balance',
            name: '$name',
            conta: '$conta',
            agencia: '$agencia',
          },
        },
      })
      .project({
        _id: 0,
        data: 1,
      });

    accounts.map(async (item) => {
      const account = await usersModel.findOneAndUpdate(
        { conta: item.data.conta },
        { agencia: 99 },
        { new: true }
      );
    });

    res.send(accounts);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
})

export { app as accountsRouter };
