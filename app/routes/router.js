var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController")
const tipoQuartosController = require("../controllers/tipoQuartosController");
const { clearSession, gravarAutenticacao, verifyAutenticado, verifyAutorizado } = require("../middlewares");
const clienteController = require("../controllers/clienteControl");

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
router.get("/perfil", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros: null }, [1, 2, 3]), function (req, res) {
    res.render("pages/template-home", { pagina: "perfil", logado: "logado" });
});
router.post("/cadastrar", usuariosController.validarCadastro, function (req, res) {
    usuariosController.cadastrarUsuario(req, res)
})
router.post("/logar", usuariosController.validarLogin, gravarAutenticacao, function (req, res) {
    usuariosController.entrar(req, res)
})

// ADMIN
router.get("/adm", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "index" });
});
router.get("/adm-cliente", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    clienteController.listarCliente(req, res);
});
router.get("/adm-cliente-novo", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/create", cliente: null });
});

router.get("/adm-cliente-edit", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-edit"
    clienteController.dadosCliente(req, res, pagina);
});

router.get("/adm-cliente-list", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-list"
    clienteController.dadosCliente(req, res, pagina);
});

router.get("/adm-cliente-del", verifyAutenticado, verifyAutorizado("pages/template-home", { pagina: "login", logado: null, alert: false, erros:null }, [2, 3]), function (req, res) {
    const pagina = "/adm-cliente-del"
    clienteController.dadosCliente(req, res, pagina);
});

router.post("/adicionarCliente", function (req, res) {
    clienteController.adicionarCliente(req, res);
});
router.post("/inativarUsuario", function (req, res) {
    clienteController.deletarCliente(req, res)
});

router.post("/editarUsuario", function (req, res) {
    clienteController.editarCliente(req, res)
});

router.get("/logOut", clearSession, function (req, res) {
    res.redirect("/")
})

module.exports = router;
