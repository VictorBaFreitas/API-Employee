const express = require("express");
const routerApp = express.Router();

const appLogin = require("../app/login/controller/ctlLogin");
const appEmpresa = require("../app/empresas/controller/ctlEmpresa");
const appTarefa = require("../app/tarefas/controller/ctlTarefa");
const appFuncionario = require("../app/funcionarios/controller/ctlFuncionario");
const appFuncionarioTarefa = require("../app/funcionarios_tarefas/controller/ctlFuncionarioTarefa");

routerApp.use((req, res, next) => {
    next();
});

routerApp.get("/", (req, res) => {
    res.send("Olá mundo!");
});

routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);

routerApp.get("/getAllEmpresas", appLogin.AutenticaJWT, appEmpresa.getAllEmpresas);
routerApp.post("/getEmpresaByID", appLogin.AutenticaJWT, appEmpresa.getEmpresaByID);
routerApp.post("/insertEmpresa", appLogin.AutenticaJWT, appEmpresa.insertEmpresa);
routerApp.post("/updateEmpresa", appLogin.AutenticaJWT, appEmpresa.updateEmpresa);
routerApp.post("/deleteEmpresa", appLogin.AutenticaJWT, appEmpresa.deleteEmpresa);

routerApp.get("/getAllTarefas", appLogin.AutenticaJWT, appTarefa.getAllTarefas);
routerApp.post("/getTarefaByID", appLogin.AutenticaJWT, appTarefa.getTarefaByID);
routerApp.post("/insertTarefa", appLogin.AutenticaJWT, appTarefa.insertTarefa);
routerApp.post("/updateTarefa", appLogin.AutenticaJWT, appTarefa.updateTarefa);
routerApp.post("/deleteTarefa", appLogin.AutenticaJWT, appTarefa.deleteTarefa);

routerApp.get("/getAllFuncionarios", appLogin.AutenticaJWT, appFuncionario.getAllFuncionarios);
routerApp.post("/getFuncionarioByID", appLogin.AutenticaJWT, appFuncionario.getFuncionarioByID);
routerApp.post("/insertFuncionario", appLogin.AutenticaJWT, appFuncionario.insertFuncionario);
routerApp.post("/updateFuncionario", appLogin.AutenticaJWT, appFuncionario.updateFuncionario);
routerApp.post("/deleteFuncionario", appLogin.AutenticaJWT, appFuncionario.deleteFuncionario);

routerApp.get("/getAllFuncionarioTarefas", appLogin.AutenticaJWT, appFuncionarioTarefa.getAllFuncionarioTarefas);
routerApp.post("/getFuncionarioTarefaByFuncionarioID", appLogin.AutenticaJWT, appFuncionarioTarefa.getFuncionarioTarefasByFuncionarioID);
routerApp.post("/getFuncionarioTarefaByTarefaID", appLogin.AutenticaJWT, appFuncionarioTarefa.getFuncionarioTarefasByTarefaID);
routerApp.post("/insertFuncionarioTarefa", appLogin.AutenticaJWT, appFuncionarioTarefa.insertFuncionarioTarefa);
routerApp.post("/updateFuncionarioTarefa", appLogin.AutenticaJWT, appFuncionarioTarefa.updateFuncionarioTarefa);
routerApp.post("/deleteFuncionarioTarefa", appLogin.AutenticaJWT, appFuncionarioTarefa.deleteFuncionarioTarefa);

module.exports = routerApp;