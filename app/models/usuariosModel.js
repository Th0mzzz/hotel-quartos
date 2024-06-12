var pool = require('../../config/poolConn');

const usuariosModel = {
    create : async (dadosDoForm) =>{
        try{
            const [resultados] = await pool.query(`insert into usuario set ?`, [dadosDoForm])
            return resultados;
        }catch (error){
            return error
        }
    },
    mostrarTodos: async ()=>{
        try{
            const [resultados] = await pool.query(`select * from usuario`)
            return resultados;
        }catch (error){
            return error;
        }
    },
    buscarPorId: async (idUsuario) =>{
        try{
            const [resultado] = await pool.query(`select * from usuario where id_usuario = ? and status_usuario = 1`, [idUsuario])
            return resultado[0];
        }catch (error){
            console.error("Erro ao buscar usuário por ID:", error);
            throw error
        }
    },
    excluir: async (idUsuario)=>{
        try{
            const [resultados] = await pool.query(`delete from usuario where id_usuario = ?`, [idUsuario])
            return resultados;
        }catch (error){
            return error;
        }
    },
    atualizar: async (idUsuario, dadosDoForm)=>{
        try{
            const [resultados] = await pool.query("update usuario set ? where id_usuario = ?", [dadosDoForm,idUsuario])
            return resultados;
        }catch(error){
            return error;
        }
    }
}

module.exports = usuariosModel