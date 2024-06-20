const tipoQuartosModel = require("../models/tipoQuartos");
const tipoQuartosController = {
  regrasValidacao: [],
  paginarQuartos: async (req, res) => {
    try {
      let page = req.query.page == undefined ? 1 : req.query.page;
      let results = null
      let regPorPage = 3
      let inicioPage = parseInt(page - 1) * regPorPage
      let totalRegistros = await tipoQuartosModel.totalRegistros();
      let totalPages = Math.ceil(totalRegistros[0].total / regPorPage)
      results = await tipoQuartosModel.findPage(inicioPage, regPorPage)
      let paginador = totalRegistros[0].total <= regPorPage
        ? null
        : {
          "pageAtual": page,
          "totalRegistros": totalRegistros[0].total,
          "totalPages": totalPages
        }
      console.log('totalRegistros:', totalRegistros[0]);
      res.render("pages/template-home", { listaTipoQuartos: results, pagina: "quartos", logado: null, paginador: paginador });

    } catch (erros) {
      console.log(erros)
      res.redirect("pages/error")
    }
  }


};

module.exports = tipoQuartosController;
