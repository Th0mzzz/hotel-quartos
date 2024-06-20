var pool = require('../../config/poolConn');

const usuariosModel = {
    create: async (dadosDoForm) => {
        try {
            const [resultados] = await pool.query(`insert into usuario set ?`, [dadosDoForm])
            return resultados;
        } catch (error) {
            return error
        }
    },
    mostrarTodos: async () => {
        try {
            const [resultados] = await pool.query(`select * from usuario`)
            return resultados;
        } catch (error) {
            return error;
        }
    },
    findById: async (idUsuario) => {
        try {
            const [resultado] = await pool.query(`select * from usuario where id_usuario = ? and status_usuario = 1`, [idUsuario])
            return resultado[0];
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            throw error
        }
    },
    findByEmailOrUser: async (valor) => {
        try {
            const [resultado] = await pool.query("select * from usuario where email_usuario = ? OR user_usuario = ?", [valor, valor])
            return resultado
        } catch (error) {
            return error;
        }
    },
    findByPhone: async (valor) => {
        try {
            const [resultado] = await pool.query("select * from usuario where email_usuario = ? OR user_usuario = ?", [valor, valor])
            return resultado
        } catch (error) {
            return error;
        }
    }
}

module.exports = usuariosModel