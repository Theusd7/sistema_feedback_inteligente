const Feedback = require("../models/feedbackModel");

exports.createFeedback = (req, res) => {
    const dados = req.body;

    Feedback.create(dados, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Feedback criado com sucesso 🚀",
            id: result.insertId
        });
    });
};

exports.getFeedbacks = (req, res) => {
    Feedback.findAll((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};