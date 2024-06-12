var express = require("express");
var router = express.Router();
const usuariosController = require("../controllers/usuariosController")
const tipoQuartosController = require("../controllers/tipoQuartosController");

router.get("/", function (req, res) {
    res.render("pages/template-home", {pagina:"home", logado:null});
});

router.get("/quartos", function (req, res) {
    tipoQuartosController.listarTiposQuartosPaginados(req, res);
});

router.get("/quartos-estatico", function (req, res) {
    res.render("pages/template-home", {pagina:"quartos-estatico", logado:null});
});

router.get("/login", function (req, res) {
    res.render("pages/template-home", {pagina:"login", logado:null});
});
router.get("/cadastro", function (req, res) {
    res.render("pages/template-home", {pagina:"cadastro", logado:null});
});
router.get("/perfil", function (req, res) {
    res.render("pages/template-home", {pagina:"perfil", logado:"logado"});
});

router.post("/cadastrar", function(req,res){
    usuariosController.cadastrarUsuario(req,res)
})


// ADMIN
router.get("/adm", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "index" });
});
router.get("/adm-cliente", function (req, res) {
    usuariosController.listarUsuarios(req,res);
});

router.get("/adm-cliente-novo", function (req, res) {
    res.render("pages/adm/template-adm", { pagina: "cliente/create" , cliente: null});
});

router.get("/adm-cliente-edit", function (req, res) {
    const pagina = "/adm-cliente-edit"
    usuariosController.dadosUsuario(req,res, pagina);
});

router.get("/adm-cliente-list", function (req, res) {
    const pagina = "/adm-cliente-list"
    usuariosController.dadosUsuario(req,res, pagina);
});

router.get("/adm-cliente-del", function (req, res) {
    const pagina = "/adm-cliente-del"
    usuariosController.dadosUsuario(req,res, pagina);
});

router.post("/adicionarCliente", function (req, res) {
   usuariosController.adicionarUsuario(req,res);
});
router.post("/inativarUsuario", function(req,res){
    usuariosController.deletarUsuario(req,res)
});

router.post("/editarUsuario", function(req,res){
    usuariosController.editarUsuario(req,res)
});

module.exports = router;
