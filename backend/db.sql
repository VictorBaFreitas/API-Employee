-- Database: postgres
CREATE DATABASE api_employee;

-- Conexão com o banco de dados
\c api_employee;

-- Tabela de empresas
CREATE TABLE empresa (
    id_empresa SERIAL PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    cnpj_empresa VARCHAR(14) UNIQUE NOT NULL,
    datacriacao_empresa DATE DEFAULT CURRENT_DATE,
    receitaanual_empresa NUMERIC(15, 2),
    removido_empresa BOOLEAN DEFAULT FALSE
);

-- Tabela de funcionários
CREATE TABLE funcionario (
    id_funcionario SERIAL PRIMARY KEY,
    nome_funcionario VARCHAR(255) NOT NULL,
    salario_funcionario NUMERIC(10, 2),
    cargo_funcionario VARCHAR(100),
    datacontratacao_funcionario DATE DEFAULT CURRENT_DATE,
    removido_funcionario BOOLEAN DEFAULT FALSE,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa) ON DELETE CASCADE
);

-- Tabela de tarefas
CREATE TABLE tarefa (
    id_tarefa SERIAL PRIMARY KEY,
    titulo_tarefa VARCHAR(255) NOT NULL,
    descricao_tarefa TEXT,
    datacriacao_tarefa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prioridade_tarefa NUMERIC(2, 1),
    removido_tarefa BOOLEAN DEFAULT FALSE
);

-- Tabela de relacionamento muitos-para-muitos
CREATE TABLE funcionariotarefa (
    id_funcionariotarefa SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_tarefa INT NOT NULL,
    observacao_funcionariotarefa TEXT,
    dataatribuicao_funcionariotarefa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    horastrabalhadas_funcionariotarefa NUMERIC(5, 2),
    removido_funcionariotarefa BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario) ON DELETE CASCADE,
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id_tarefa) ON DELETE CASCADE
);

-- Tabela de usuários
CREATE TABLE usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    username_usuario VARCHAR(10) UNIQUE,
    password_usuario TEXT,
    removido_usuario BOOLEAN DEFAULT FALSE
);

-- Extensão para criptografia de senha

CREATE EXTENSION pgcrypto;

-- Inserção de usuário admin com senha criptografada
INSERT INTO usuarios (username_usuario, password_usuario)
VALUES ('admin', crypt('admin', gen_salt('bf')))
ON CONFLICT DO NOTHING;
