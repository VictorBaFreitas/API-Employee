const db = require("../../../database/databaseconfig");

const getAllFuncionarioTarefas = async () => {
    return (
        await db.query(
            "SELECT ft.*, f.nome_funcionario, t.titulo_tarefa FROM funcionariotarefa ft " +
            "JOIN funcionario f ON f.id_funcionario = ft.id_funcionario " +
            "JOIN tarefa t ON t.id_tarefa = ft.id_tarefa " +
            "WHERE ft.removido_funcionariotarefa = false " +
            "ORDER BY f.nome_funcionario ASC"
        )
    ).rows;
};

const getFuncionarioTarefasByFuncionarioID = async (funcionarioIDPar) => {
    return (
        await db.query(
            "SELECT ft.*, f.nome_funcionario, t.titulo_tarefa FROM funcionariotarefa ft " +
            "JOIN funcionario f ON f.id_funcionario = ft.id_funcionario " +
            "JOIN tarefa t ON t.id_tarefa = ft.id_tarefa " +
            "WHERE ft.id_funcionario = $1 AND ft.removido_funcionariotarefa = false " +
            "ORDER BY t.titulo_tarefa ASC",
            [funcionarioIDPar]
        )
    ).rows;
};

const getFuncionarioTarefasByTarefaID = async (tarefaIDPar) => {
    return (
        await db.query(
            "SELECT ft.*, f.nome_funcionario, t.titulo_tarefa FROM funcionariotarefa ft " +
            "JOIN funcionario f ON f.id_funcionario = ft.id_funcionario " +
            "JOIN tarefa t ON t.id_tarefa = ft.id_tarefa " +
            "WHERE ft.id_tarefa = $1 AND ft.removido_funcionariotarefa = false " +
            "ORDER BY f.nome_funcionario ASC",
            [tarefaIDPar]
        )
    ).rows;
};

const insertFuncionarioTarefa = async (funcionarioTarefaRegPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO funcionariotarefa (id_funcionario, id_tarefa, observacao_funcionariotarefa, " +
                "horastrabalhadas_funcionariotarefa, removido_funcionariotarefa) " +
                "VALUES ($1, $2, $3, $4, $5)",
                [
                    funcionarioTarefaRegPar.id_funcionario,
                    funcionarioTarefaRegPar.id_tarefa,
                    funcionarioTarefaRegPar.observacao_funcionariotarefa,
                    funcionarioTarefaRegPar.horastrabalhadas_funcionariotarefa,
                    funcionarioTarefaRegPar.removido_funcionariotarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionarioTarefa|insertFuncionarioTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const updateFuncionarioTarefa = async (funcionarioTarefaRegPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionariotarefa SET " +
                "observacao_funcionariotarefa = $2, " +
                "horastrabalhadas_funcionariotarefa = $3, " +
                "removido_funcionariotarefa = $4 " +
                "WHERE id_funcionariotarefa = $1",
                [
                    funcionarioTarefaRegPar.id_funcionariotarefa,
                    funcionarioTarefaRegPar.observacao_funcionariotarefa,
                    funcionarioTarefaRegPar.horastrabalhadas_funcionariotarefa,
                    funcionarioTarefaRegPar.removido_funcionariotarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionarioTarefa|updateFuncionarioTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const deleteFuncionarioTarefa = async (funcionarioTarefaRegPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionariotarefa SET removido_funcionariotarefa = true " +
                "WHERE id_funcionariotarefa = $1",
                [funcionarioTarefaRegPar.id_funcionariotarefa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionarioTarefa|deleteFuncionarioTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllFuncionarioTarefas,
    getFuncionarioTarefasByFuncionarioID,
    getFuncionarioTarefasByTarefaID,
    insertFuncionarioTarefa,
    updateFuncionarioTarefa,
    deleteFuncionarioTarefa,
};