const db = require("../../../database/databaseconfig");

const getAllFuncionarios = async () => {
    return (
        await db.query(
            "SELECT *, " +
            "(SELECT nome_empresa FROM empresa WHERE id_empresa = funcionario.id_empresa) " +
            "FROM funcionario " +
            "WHERE removido_funcionario = false " +
            "ORDER BY nome_funcionario ASC"
        )
    ).rows;
};

const getFuncionarioByID = async (idFuncionarioPar) => {
    return (
        await db.query(
            "SELECT *, " +
            "(SELECT nome_empresa FROM empresa WHERE id_empresa = funcionario.id_empresa) " +
            "FROM funcionario " +
            "WHERE id_funcionario = $1 AND removido_funcionario = false " +
            "ORDER BY nome_funcionario ASC",
            [idFuncionarioPar]
        )
    ).rows;
};

const insertFuncionario = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO funcionario " +
                "VALUES (default, $1, $2, $3, $4, false)",
                [
                    funcionarioREGPar.nome_funcionario,
                    funcionarioREGPar.salario_funcionario,
                    funcionarioREGPar.cargo_funcionario,
                    funcionarioREGPar.id_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|insertFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const updateFuncionario = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionario SET " +
                "nome_funcionario = $2, " +
                "salario_funcionario = $3, " +
                "cargo_funcionario = $4, " +
                "id_empresa = $5, " +
                "removido_funcionario = $6 " +
                "WHERE id_funcionario = $1",
                [
                    funcionarioREGPar.id_funcionario,
                    funcionarioREGPar.nome_funcionario,
                    funcionarioREGPar.salario_funcionario,
                    funcionarioREGPar.cargo_funcionario,
                    funcionarioREGPar.id_empresa,
                    funcionarioREGPar.removido_funcionario,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|updateFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const deleteFuncionario = async (funcionarioREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE funcionario SET removido_funcionario = true " +
                "WHERE id_funcionario = $1",
                [funcionarioREGPar.id_funcionario]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|deleteFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllFuncionarios,
    getFuncionarioByID,
    insertFuncionario,
    updateFuncionario,
    deleteFuncionario,
};