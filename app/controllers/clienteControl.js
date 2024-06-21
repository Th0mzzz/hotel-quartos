const clienteModel = require('../models/clienteModel');


const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { id, nome, cep,nomeUsuario, email, senha, tipo, status } = req.body;
            inserirUsuario = {
                "id_usuario": id,
                "nome_usuario": nome,
                "user_usuario": nomeUsuario,
                "senha_usuario": senha,
                "email_usuario": email,
                "status_usuario": status,
                "tipo_usuario": tipo
            }
            const resultado = await clienteModel.create(inserirUsuario)
            console.log(resultado)
            res.redirect('/adm-cliente');
        } catch (error) {
            res.json({ erro: error })
        }
    },
    listarCliente: async (req, res) => {
        try {
            const cliente = await clienteModel.mostrarTodos()
            res.render("pages/adm/template-adm", { pagina: "cliente/index", listaDeClientes: cliente });
        } catch (error) {
            res.json({ erro: error })
        }
    },
    dadosCliente: async (req, res, page) => {
        try {
            const idUsuario = req.query.id;
            const usuario = await clienteModel.buscarPorId(idUsuario);
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
    deletarCliente: async (req, res) => {
        try {
            const idUsuario = req.query.id
            const usuario = await clienteModel.buscarPorId(idUsuario);
            if (!usuario) {
                return res.json({ erro: error });
            }
            const resultado = await clienteModel.excluir(idUsuario);
            console.log(resultado)
            res.redirect('/adm-cliente');
        } catch (error) {
            console.error(error);
            res.json({ erro: error });
        }


    },
    editarCliente: async (req, res) => {
        try {
            const idUsuario = req.query.id
            const usuario = await clienteModel.buscarPorId(idUsuario);
            if (!usuario) {
                return res.render("pages/adm/error")
            }
            const { nome, nomeUsuario, email, senha, tipo, status } = req.body
            atualizarUsuario = {
                "nome_usuario": nome,
                "user_usuario": nomeUsuario,
                "senha_usuario": senha,
                "email_usuario": email,
                "status_usuario": status,
                "tipo_usuario": tipo
            }
            const resultado = await clienteModel.atualizar(idUsuario, atualizarUsuario);
            console.log(resultado)
            res.redirect('/adm-cliente');

        } catch (error) {
            res.json({ erro: error })
        }

    }
}

module.exports = clienteController