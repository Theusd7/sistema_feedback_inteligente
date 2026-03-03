const connection = require("../config/database");

const Feedback = {

    create: (dados, callback) => {
        const sql = `
            INSERT INTO feedbacks 
            (titulo, descricao, nota, usuario_id, empresa_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [
                dados.titulo,
                dados.descricao,
                dados.nota,
                dados.usuario_id,
                dados.empresa_id
            ],
            callback
        );
    },

    findAll: (callback) => {
        const sql = `
            SELECT * FROM feedbacks
        `;

        connection.query(sql, callback);
    }
};

module.exports = Feedback;