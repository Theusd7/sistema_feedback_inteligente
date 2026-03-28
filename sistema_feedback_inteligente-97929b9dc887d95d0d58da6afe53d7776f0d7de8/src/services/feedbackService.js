let feedbacks = [];

exports.criar = async (dados) => {
    const novoFeedback = {
        id: feedbacks.length + 1,
        nome: dados.nome || null,
        email: dados.email || null,
        empresa: dados.empresa,
        nota: dados.nota,
        mensagem: dados.mensagem,
        data: new Date()
    };

    feedbacks.push(novoFeedback);

    return novoFeedback;
};

exports.listar = async () => {
    return feedbacks;
};