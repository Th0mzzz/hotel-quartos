const usuariosModel = require('../models/usuariosModel');


const usuariosController = {
    adicionarUsuario: async (req, res) => {
        try {
            const { nome, fone, nomeUsuario, email, senha, tipo, status } = req.body;
            inserirUsuario = {
                "nome_usuario": nome,
                "user_usuario": nomeUsuario,
                "senha_usuario": senha,
                "email_usuario": email,
                "fone_usuario": fone,
                "tipo_usuario": tipo,
                "status_usuario": status
            }
            const resultado = await usuariosModel.create(inserirUsuario)
            console.log(resultado)
            res.redirect('/adm-cliente');
        } catch (error) {
            res.json({ erro: error })
        }
    },
    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await usuariosModel.mostrarTodos()
            res.render("pages/adm/template-adm", { pagina: "cliente/index", listaDeClientes: usuarios });
        } catch (error) {
            res.json({ erro: error })
        }
    },
    dadosUsuario: async (req, res, page) => {
        try {
            const idUsuario = req.query.id;
            const usuario = await usuariosModel.buscarPorId(idUsuario);
            if (!usuario) {
                return res.render("pages/adm/error")
            }
            let paginaResult = ''

            switch (true) {
                case page === "/adm-cliente-del": paginaResult = "cliente/delete";
                    break;
                case page === "/adm-cliente-list": paginaResult = "cliente/detalhes";
                    break;
                case page === "/adm-cliente-edit": paginaResult = "cliente/edit"
                    break;
                default:
                    paginaResult = "cliente/index"
            }

            res.render("pages/adm/template-adm", { pagina: paginaResult, cliente: usuario, erro: null });
        } catch (error) {
            res.json({ erro: error })
        }
    },
    deletarUsuario: async (req, res) => {
        try {
            const idUsuario = req.query.id
            const usuario = await usuariosModel.buscarPorId(idUsuario);
            if (!usuario) {
                return res.json({ erro: error });
            }
            const resultado = await usuariosModel.excluir(idUsuario);
            console.log(resultado)
            res.redirect('/adm-cliente');
        } catch (error) {
            console.error(error);
            res.json({ erro: error });
        }


    },
    editarUsuario: async (req, res) => {
        try {
            const idUsuario = req.query.id
            const usuario = await usuariosModel.buscarPorId(idUsuario);
            if (!usuario) {
                return res.render("pages/adm/error")
            }
            const { nome, cep, nomeUsuario, email, senha, tipo, status } = req.body
            atualizarUsuario = {
                "nome_usuario": nome,
                "user_usuario": nomeUsuario,
                "senha_usuario": senha,
                "email_usuario": email,
                "fone_usuario": fone,
                "tipo_usuario": tipo,
                "status_usuario": status
            }
            const resultado = await usuariosModel.atualizar(idUsuario, atualizarUsuario);
            res.redirect('/adm-cliente');

        } catch (error) {
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
            res.render("pages/template-home", { pagina: "perfil", logado: "logado" });
        } catch (error) {
            console.log(error)
            res.json({ erro: error })
        }

    }
}

module.exports = usuariosController