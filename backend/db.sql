-- Database: postgres
CREATE DATABASE api_employee;

-- Conexão com o banco de dados
\c api_employee;

-- Tabela de empresas
CREATE TABLE empresa (
    empresaid SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    datacriacao DATE DEFAULT CURRENT_DATE,
    receitaanual NUMERIC(15, 2),
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela de funcionários
CREATE TABLE funcionario (
    funcionarioid SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    datanascimento DATE,
    salario NUMERIC(10, 2),
    cargo VARCHAR(100),
    datacontratacao DATE DEFAULT CURRENT_DATE,
    removido BOOLEAN DEFAULT FALSE,
    empresaid INT NOT NULL,
    FOREIGN KEY (empresaid) REFERENCES empresa(empresaid) ON DELETE CASCADE
);

-- Tabela de tarefas
CREATE TABLE tarefa (
    tarefaid SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    datacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prioridade NUMERIC(2, 1),
    removido BOOLEAN DEFAULT FALSE
);

-- Tabela de relacionamento muitos-para-muitos
CREATE TABLE funcionariotarefa (
    funcionariotarefaid SERIAL PRIMARY KEY,
    funcionarioid INT NOT NULL,
    tarefaid INT NOT NULL,
    observacao TEXT,
    dataatribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    horastrabalhadas NUMERIC(5, 2),
    removido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (funcionarioid) REFERENCES funcionario(funcionarioid) ON DELETE CASCADE,
    FOREIGN KEY (tarefaid) REFERENCES tarefa(tarefaid) ON DELETE CASCADE
);

-- Tabela de usuários
CREATE TABLE usuarios (
    usuarioid BIGSERIAL PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    removido BOOLEAN DEFAULT FALSE
);

-- Extensão para criptografia de senha

CREATE EXTENSION pgcrypto;

-- Inserção de usuário admin com senha criptografada
INSERT INTO usuarios (username, password)
VALUES ('admin', crypt('admin', gen_salt('bf')))
ON CONFLICT DO NOTHING;
