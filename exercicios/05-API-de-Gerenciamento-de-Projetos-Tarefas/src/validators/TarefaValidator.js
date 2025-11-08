const yup = require('yup')
const mongoose = require('mongoose')
const schema = yup.object().shape(
    {
        titulo: yup.string().required("Título da tarefa é obrigatório!"),
        descricao: yup.string().required("Descrição da tarefa é obrigatória!"),
        dataInicio: yup.date().required("Data de Inicio da tarefa é obrigatória!"),
        dataFim: yup.date().required("Data de Fim da tarefa é obrigatória!"),
        responsavel: yup.string()
        .required("Responsável pela tarefa é obrigatório!")
        .test(
            'id-validator',
            'ID do funcionario é inválido',
            value => mongoose.Types.ObjectId.isValid(value)
        ),
        projeto: yup.string()
        .required("Projeto é obrigatório!")
        .test(
            'id-validator',
            'ID do projeto é inválido',
            value => mongoose.Types.ObjectId.isValid(value)
        ),
    }
)
async function validarTarefa(req,res,next) {
    try {
        await schema.validate(req.body, {abortEarly: false})
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
module.exports = {validarTarefa}