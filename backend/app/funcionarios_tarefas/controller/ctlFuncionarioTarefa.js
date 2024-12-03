const mdlFuncionarioTarefa = require("../model/mdlFuncionarioTarefa");

const getAllFuncionarioTarefas = (req, res) =>
    (async () => {
        let registro = await mdlFuncionarioTarefa.getAllFuncionarioTarefas();
        res.json({ status: "ok", "registro": registro });
    })();

const getFuncionarioTarefasByFuncionarioID = (req, res) =>
    (async () => {
        const funcionarioID = parseInt(req.body.id_funcionario);
        let registro = await mdlFuncionarioTarefa.getFuncionarioTarefasByFuncionarioID(funcionarioID);
        res.json({ status: "ok", "registro": registro });
    })();

const getFuncionarioTarefasByTarefaID = (req, res) =>
    (async () => {
        const tarefaID = parseInt(req.body.id_tarefa);
        let registro = await mdlFuncionarioTarefa.getFuncionarioTarefasByTarefaID(tarefaID);
        res.json({ status: "ok", "registro": registro });
    })();

const insertFuncionarioTarefa = (request, res) =>
    (async () => {
        const funcionarioTarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.insertFuncionarioTarefa(funcionarioTarefaREG);
        res.json({ status: msg, "linhasAfetadas": linhasAfetadas });
    })();

const updateFuncionarioTarefa = (request, res) =>
    (async () => {
        const funcionarioTarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.updateFuncionarioTarefa(funcionarioTarefaREG);
        res.json({ status: msg, "linhasAfetadas": linhasAfetadas });
    })();

const deleteFuncionarioTarefa = (request, res) =>
    (async () => {
        const funcionarioTarefaREG = request.body;
        let { msg, linhasAfetadas } = await mdlFuncionarioTarefa.deleteFuncionarioTarefa(funcionarioTarefaREG);
        res.json({ status: msg, "linhasAfetadas": linhasAfetadas });
    })();

module.exports = {
    getAllFuncionarioTarefas,
    getFuncionarioTarefasByFuncionarioID,
    getFuncionarioTarefasByTarefaID,
    insertFuncionarioTarefa,
    updateFuncionarioTarefa,
    deleteFuncionarioTarefa,
};