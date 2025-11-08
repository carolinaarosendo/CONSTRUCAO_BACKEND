const yup = require('yup')
const mongoose = require('mongoose')
const schema = yup.object().shape(
    {
        nome: yup.string().required("Nome do projeto é obrigatório!"),
        descricao: yup.string().required("Descrição do projeto é obrigatória!"),
        dataInicio: yup.date().required("Data de Inicio do projeto é obrigatória!"),
        dataFim: yup.date().required("Data de Fim do projeto é obrigatória!"),
    }
)
async function validarProjeto(req,res,next) {
    try {
        await schema.validate(req.body, {abortEarly: false})
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
module.exports = {validarProjeto}