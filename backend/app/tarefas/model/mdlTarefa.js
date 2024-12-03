const db = require("../../../database/databaseconfig");

const getAllTarefas = async () => {
    return (
        await db.query(
            "SELECT * FROM tarefa WHERE removido_tarefa = false ORDER BY datacriacao_tarefa DESC"
        )
    ).rows;
};

const getTarefaByID = async (idTarefa) => {
    return (
        await db.query(
            "SELECT * FROM tarefa WHERE id_tarefa = $1 AND removido_tarefa = false",
            [idTarefa]
        )
    ).rows[0];
};

const insertTarefa = async (tarefa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO tarefa (titulo_tarefa, descricao_tarefa, prioridade_tarefa) " +
                "VALUES ($1, $2, $3)",
                [tarefa.titulo_tarefa, tarefa.descricao_tarefa, tarefa.prioridade_tarefa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|insertTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const updateTarefa = async (tarefa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE tarefa SET " +
                "titulo_tarefa = $2, " +
                "descricao_tarefa = $3, " +
                "prioridade_tarefa = $4, " +
                "removido_tarefa = $5 " +
                "WHERE id_tarefa = $1",
                [
                    tarefa.id_tarefa,
                    tarefa.titulo_tarefa,
                    tarefa.descricao_tarefa,
                    tarefa.prioridade_tarefa,
                    tarefa.removido_tarefa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|updateTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const deleteTarefa = async (idTarefa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE tarefa SET removido_tarefa = true WHERE id_tarefa = $1",
                [idTarefa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlTarefa|deleteTarefa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllTarefas,
    getTarefaByID,
    insertTarefa,
    updateTarefa,
    deleteTarefa,
};