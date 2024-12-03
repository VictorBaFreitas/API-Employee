const mdlTarefa = require("../model/mdlTarefa");

const getAllTarefas = (req, res) =>
    (async () => {
        let registros = await mdlTarefa.getAllTarefas();
        res.json({ status: "ok", registros });
    })();

const getTarefaByID = (req, res) =>
    (async () => {
        const idTarefa = parseInt(req.body.id_tarefa);
        let registro = await mdlTarefa.getTarefaByID(idTarefa);
        res.json({ status: "ok", registro });
    })();

const insertTarefa = (req, res) =>
    (async () => {
        const tarefa = req.body;
        let { msg, linhasAfetadas } = await mdlTarefa.insertTarefa(tarefa);
        res.json({ status: msg, linhasAfetadas });
    })();

const updateTarefa = (req, res) =>
    (async () => {
        const tarefa = req.body;
        let { msg, linhasAfetadas } = await mdlTarefa.updateTarefa(tarefa);
        res.json({ status: msg, linhasAfetadas });
    })();

const deleteTarefa = (req, res) =>
    (async () => {
        const idTarefa = parseInt(req.body.id_tarefa);
        let { msg, linhasAfetadas } = await mdlTarefa.deleteTarefa(idTarefa);
        res.json({ status: msg, linhasAfetadas });
    })();

module.exports = {
    getAllTarefas,
    getTarefaByID,
    insertTarefa,
    updateTarefa,
    deleteTarefa,
};