const usuariosModel = require('../models/usuariosModel');
const { body, validationResult } = require("express-validator")
const usuariosController = {
    validarCadastro: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("nome deve ter entre 3 a 45 caractéres!")
        ,
        body("nomeUsuario")
            .isLength({ min: 3, max: 45 }).withMessage("Usuário necessário ter pelo menos 3 e até 45 digitos!")
            .bail()
            .custom(async (nomeUsuario) => {
                const usuarioExistente = await usuariosModel.findByEmailOrUser(nomeUsuario)
                if (usuarioExistente[0]) {
                    throw new Error("Usuário já existe! Tente outro");
                }
                return true;
            })
        ,
        body("email")
            .isLength({ min: 3, max: 45 }).withMessage("Email necessário ter pelo menos 3 e até 45 digitos!")
            .bail()
            .custom(async (email) => {
                const emailExistente = await usuariosModel.findByEmailOrUser(email)
                if (emailExistente[0]) {
                    throw new Error("E-mail já em uso! Tente outro");
                }
                return true;
            })
        ,
        body("fone")
            .isMobilePhone('pt-BR').withMessage("Número de telefone inválido")
            .bail()
            .custom(async (fone) => {
                const phoneExistente = await usuariosModel.findByPhone(fone)
                if (phoneExistente[0]) {
                    throw new Error("Telefone já em uso! Tente outro");
                }
                return true;
            })
        ,
        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número inteiro.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    validarLogin: [
        body("emailOrUser")
            .isLength({ min: 3, max: 45 }).withMessage("Usuário necessário ter pelo menos 3 e até 45 digitos!")
        ,
        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número inteiro.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    entrar: async (req, res) => {
        try {
            const { emailOrUser, senha } = req.body;
            const userBd = await usuariosModel.findByEmailOrUser(emailOrUser)
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
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            const jsonResult = {
                pagina: "cadastro",
                valores: req.body,
                erros: errors,
                alert: null,
                logado: null
            }
            res.render("pages/template-home", jsonResult);
        } else {
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

        }
    },

}

module.exports = usuariosController