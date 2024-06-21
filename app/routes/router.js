var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController")
const tipoQuartosController = require("../controllers/tipoQuartosController");
const middleWares = require("../models/middlewares");

router.get("/", function (req, res) {
    res.render("pages/template-home", { pagina: "home", logado: null });
});
router.get("/quartos", function (req, res) {
    tipoQuartosController.paginarQuartos(req, res);
});
router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", { pagina: "quartos-estatico", logado: null });
});
router.get("/login", function (req, res) {
    res.render("pages/template-home", { pagina: "login", logado: null, alert: false, erros: null });
});
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", { pagina: "cadastro", logado: null, erros: null });
});
router.get("/perfil", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home",{ pagina: "login", logado: null, alert: false, erros: null }, [1, 2, 3]), function (req, res) {
        res.render("pages/template-home", { pagina: "perfil", logado: "logado" });
    });
router.post("/cadastrar", usuariosController.validarCadastro, function (req, res) {
    usuariosController.cadastrarUsuario(req, res)
})
router.post("/logar", usuariosController.validarLogin, middleWares.gravarAutenticacao, function (req, res) {
    usuariosController.entrar(req, res)
})

// ADMIN
router.get("/adm", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "index" });
});
router.get("/adm-cliente", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    usuariosController.listarUsuarios(req, res);
});
router.get("/adm-cliente-novo", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/create", cliente: null });
});

router.get("/adm-cliente-edit", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-edit"
    usuariosController.dadosUsuario(req, res, pagina);
});

router.get("/adm-cliente-list", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-list"
    usuariosController.dadosUsuario(req, res, pagina);
});

router.get("/adm-cliente-del", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-del"
    usuariosController.dadosUsuario(req, res, pagina);
});

router.post("/adicionarCliente", function (req, res) {
    usuariosController.adicionarUsuario(req, res);
});
router.post("/inativarUsuario", function (req, res) {
    usuariosController.deletarUsuario(req, res)
});

router.post("/editarUsuario", function (req, res) {
    usuariosController.editarUsuario(req, res)
});

router.get("/logOut", middleWares.clearSession, function (req, res) {
    res.redirect("/")
})

module.exports = router;
