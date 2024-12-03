const mdlEmpresa = require("../model/mdlEmpresa");

const getAllEmpresas = (req, res) =>
    (async () => {
        let registros = await mdlEmpresa.getAllEmpresas();
        res.json({ status: "ok", registros });
    })();

const getEmpresaByID = (req, res) =>
    (async () => {
        const idEmpresa = parseInt(req.body.id_empresa);
        let registro = await mdlEmpresa.getEmpresaByID(idEmpresa);
        res.json({ status: "ok", registro });
    })();

const insertEmpresa = (req, res) =>
    (async () => {
        const empresa = req.body;
        let { msg, linhasAfetadas } = await mdlEmpresa.insertEmpresa(empresa);
        res.json({ status: msg, linhasAfetadas });
    })();

const updateEmpresa = (req, res) =>
    (async () => {
        const empresa = req.body;
        let { msg, linhasAfetadas } = await mdlEmpresa.updateEmpresa(empresa);
        res.json({ status: msg, linhasAfetadas });
    })();

const deleteEmpresa = (req, res) =>
    (async () => {
        const idEmpresa = parseInt(req.body.id_empresa);
        let { msg, linhasAfetadas } = await mdlEmpresa.deleteEmpresa(idEmpresa);
        res.json({ status: msg, linhasAfetadas });
    })();

module.exports = {
    getAllEmpresas,
    getEmpresaByID,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
};