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
    const { titulo, descricao, nota, usuario_id, empresa_id } = req.body;

    const db = require("./config/database");

    const sql = `
        INSERT INTO feedbacks (titulo, descricao, nota, usuario_id, empresa_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [titulo, descricao, nota, usuario_id, empresa_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Feedback enviado" });
    });
});
module.exports = app;