const usuariosModel = require('../models/usuariosModel');

const usuariosController = {
    logar: async (req, res) => {
        try {
            const { emailOrUser, senha } = req.body;
            const userBd = await usuariosModel.buscarPorEmailouUsuario(emailOrUser)
            console.log(userBd[0])
            if (userBd[0] && userBd[0].senha_usuario == senha) {
                res.redirect("/perfil")
            } else {
                res.render("pages/template-home", { pagina: "login", logado: null, alert: true });

            }
        } catch (error) {
            console.log(error)
            res.json({ erro: error })
        }

    },
    cadastrarUsuario: async (req, res) => {
        try {
            const { nome, fone, nomeUsuario, email, senha } = req.body;
            usuario = {
                "nome_usuario": nome,
                "user_usuario": nomeUsuario,
                "senha_usuario": senha,
                "email_usuario": email,
                "fone_usuario": fone,
                "tipo_usuario": 1,
                "status_usuario": 1
            }
            const resultado = await usuariosModel.create(usuario)
            console.log(resultado)
            req.session.autenticado = { autenticado: nomeUsuario, id: resultado.insertId, tipo: 1 }
            res.redirect("/perfil")
        } catch (error) {
            console.log(error)
            res.json({ erroCadastro: error })
        }

    },

}

module.exports = usuariosController