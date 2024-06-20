const usuariosModel = require("./usuariosModel")

const middleWares = {
    verifyAutenticado: (req, res, next) => {
        if (req.session.autenticado) {
            var aut = req.session.autenticado
            req.session.logado = req.session.logado + 1
        } else {
            var aut = { autenticado: null, id: null, tipo: null }
            req.session.logado = 0
        }
        req.session.autenticado = aut
        next();
    },
    clearSession: (req, res, next) => {
        req.session.destroy();
        next()
    },
    verifyAutorizado: (destinoFalha, destinoJson, tipoPermitido) => {
        return (req, res, next) => {
            if (req.session.autenticado.autenticado != null &&
                tipoPermitido.find(element => { return element == req.session.autenticado.tipo }) != undefined) {
                next();
            } else {
                res.render(destinoFalha, destinoJson)
            }
        };
    },
    gravarAutenticacao: async (req, res, next) => {

        var userBd = await usuariosModel.findByEmailOrUser(req.body.emailOrUser)

        if (Object.keys(userBd).length == 1) {
            if (req.body.senha == userBd[0].senha_usuario) {
                var aut = { autenticado: userBd[0].user_usuario, id: userBd[0].id_usuario, tipo: userBd[0].tipo_usuario }
            } else {
                var aut = { autenticado: null, id: null, tipo: null }
            }
        } else {
            var aut = { autenticado: null, id: null, tipo: null }
        }

        req.session.autenticado = aut
        req.session.logado = 0
        next();
    },
}

module.exports = middleWares