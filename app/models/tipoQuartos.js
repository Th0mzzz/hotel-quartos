var pool = require("../../config/poolConn");

const tipoQuartosModel = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tipo_quartos WHERE status_quarto = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    },
    findPage: async (inicioDaPagina, totalPorPagina) => {
        try {
            const [results] = await pool.query("SELECT * FROM tipo_quartos WHERE status_quarto = 1 limit ?,?", [inicioDaPagina, totalPorPagina])
            return results;
        } catch (error) {
            console.log(error)
            return error;
        }
    },
    totalRegistros: async () => {
        try {
            const [result] = await pool.query("SELECT count(*) AS total FROM tipo_quartos WHERE status_quarto = 1")
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }


};


module.exports = tipoQuartosModel