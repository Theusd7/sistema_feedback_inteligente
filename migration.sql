CREATE DATABASE sistema_feedback;
USE sistema_feedback;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('cliente', 'empresa') NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  nota INT CHECK (nota BETWEEN 1 AND 5),
  status ENUM('pendente', 'em_analise', 'resolvido') DEFAULT 'pendente',
  usuario_id INT,
  empresa_id INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

CREATE TABLE respostas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  feedback_id INT,
  resposta TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (feedback_id) REFERENCES feedbacks(id)
);

FOREIGN KEY (empresa_id) REFERENCES usuarios(id)