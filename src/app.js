const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

require("./config/database");

const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(express.json());
app.use("/feedbacks", feedbackRoutes);


app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const db = require("./config/database");

    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            res.json({ message: "Login efetuado" });
        } else {
            res.status(401).json({ message: "algo deu errado" });
        }
    });
});
app.post("/register", (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    const db = require("./config/database");

    const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";

    db.query(sql, [nome, email, senha, tipo], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Cadastro feito" });
    });
});
app.post("/feedbacks", (req, res) => {
    const { titulo, descricao, nota, empresa_id, nome_cliente, email_cliente } = req.body;

    const db = require("./config/database");

    const sql = `
        INSERT INTO feedbacks 
        (titulo, descricao, nota, empresa_id, nome_cliente, email_cliente)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [titulo, descricao, nota, empresa_id, nome_cliente, email_cliente], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ message: "Feedback criado" });
    });
});

app.post("/empresas", (req, res) => {
    const { nome, email, senha } = req.body;

    const db = require("./config/database");

    const sql = "INSERT INTO empresas (nome, email, senha) VALUES (?, ?, ?)";

    console.log(req.body);

    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ message: "Empresa cadastrada 🚀" });
    });
});
module.exports = app;