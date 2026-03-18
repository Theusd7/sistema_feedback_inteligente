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

module.exports = app;