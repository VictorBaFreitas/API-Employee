const mdlFuncionario = require("../model/mdlFuncionario");

const getAllFuncionarios = (req, res) =>
    (async () => {
        try {
            let registros = await mdlFuncionario.getAllFuncionarios();
            for (let i = 0; i < registros.length; i++) {
                const row = registros[i]; // Linha atual
                const formattedDate = row.datacontratacao_funcionario.toISOString().split('T')[0];
                row.datacontratacao_funcionario = formattedDate; // Formatação da data de contratação
            }
            res.json({ status: "ok", registros });
        } catch (error) {
            console.error("[funcionarioController|getAllFuncionarios]", error.message);
            res.status(500).json({ status: "error", message: "Erro ao buscar funcionários" });
        }
    })();

const getFuncionarioByID = (req, res) =>
    (async () => {
        try {
            const funcionarioID = parseInt(req.params.id);
            let registro = await mdlFuncionario.getFuncionarioByID(funcionarioID);
            if (registro.length === 0) {
                return res.status(404).json({ status: "error", message: "Funcionário não encontrado" });
            }
            // Formatação da data de contratação
            const formattedDate = registro[0].datacontratacao_funcionario.toISOString().split('T')[0];
            registro[0].datacontratacao_funcionario = formattedDate;

            res.json({ status: "ok", registro: registro[0] });
        } catch (error) {
            console.error("[funcionarioController|getFuncionarioByID]", error.message);
            res.status(500).json({ status: "error", message: "Erro ao buscar funcionário" });
        }
    })();

const insertFuncionario = (req, res) =>
    (async () => {
        try {
            const funcionarioREG = req.body;
            let { msg, linhasAfetadas } = await mdlFuncionario.insertFuncionario(funcionarioREG);
            res.json({ status: msg, linhasAfetadas });
        } catch (error) {
            console.error("[funcionarioController|insertFuncionario]", error.message);
            res.status(500).json({ status: "error", message: "Erro ao inserir funcionário" });
        }
    })();

const updateFuncionario = (req, res) =>
    (async () => {
        try {
            const funcionarioREG = req.body;
            let { msg, linhasAfetadas } = await mdlFuncionario.updateFuncionario(funcionarioREG);
            res.json({ status: msg, linhasAfetadas });
        } catch (error) {
            console.error("[funcionarioController|updateFuncionario]", error.message);
            res.status(500).json({ status: "error", message: "Erro ao atualizar funcionário" });
        }
    })();

const deleteFuncionario = (req, res) =>
    (async () => {
        try {
            const funcionarioREG = req.body;
            let { msg, linhasAfetadas } = await mdlFuncionario.deleteFuncionario(funcionarioREG);
            res.json({ status: msg, linhasAfetadas });
        } catch (error) {
            console.error("[funcionarioController|deleteFuncionario]", error.message);
            res.status(500).json({ status: "error", message: "Erro ao excluir funcionário" });
        }
    })();

module.exports = {
    getAllFuncionarios,
    getFuncionarioByID,
    insertFuncionario,
    updateFuncionario,
    deleteFuncionario
};