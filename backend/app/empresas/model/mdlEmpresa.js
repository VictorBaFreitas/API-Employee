const db = require("../../../database/databaseconfig");

const getAllEmpresas = async () => {
    return (
        await db.query(
            "SELECT * FROM empresa WHERE removido_empresa = false ORDER BY nome_empresa ASC"
        )
    ).rows;
};

const getEmpresaByID = async (idEmpresa) => {
    return (
        await db.query(
            "SELECT * FROM empresa WHERE id_empresa = $1 AND removido_empresa = false",
            [idEmpresa]
        )
    ).rows[0];
};

const insertEmpresa = async (empresa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO empresa (nome_empresa, cnpj_empresa, receitaanual_empresa) " +
                "VALUES ($1, $2, $3)",
                [empresa.nome_empresa, empresa.cnpj_empresa, empresa.receitaanual_empresa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|insertEmpresa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const updateEmpresa = async (empresa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE empresa SET " +
                "nome_empresa = $2, " +
                "cnpj_empresa = $3, " +
                "receitaanual_empresa = $4, " +
                "removido_empresa = $5 " +
                "WHERE id_empresa = $1",
                [
                    empresa.id_empresa,
                    empresa.nome_empresa,
                    empresa.cnpj_empresa,
                    empresa.receitaanual_empresa,
                    empresa.removido_empresa,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|updateEmpresa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const deleteEmpresa = async (idEmpresa) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE empresa SET removido_empresa = true WHERE id_empresa = $1",
                [idEmpresa]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEmpresa|deleteEmpresa] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllEmpresas,
    getEmpresaByID,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
};