const yup = require('yup')
//Crie o schema do livro com os campos: titulo, autor, editora, ano e preco.
const schemaNovoLivro = yup.object().shape(
    {
        titulo: yup.string()
        .min(5, "Nome inválido")
        .max(50, "Nome inválido")
        .required("Nome obrigatório!"),
        autor: yup.string()
        .min(5, "Nome inválido")
        .max(50, "Nome inválido")
        .required("Nome obrigatório!"),
        editora: yup.string()
        .min(5, "Nome inválido")
        .max(50, "Nome inválido")
        .required("Nome obrigatório!"),
        dataLancamento: yup.date().required("Data de Lançamento obrigatória!"),
        preco: yup.string()
        .min(1, "Valor inválido")
        .required("Valor obrigatório!")
    }
)
// Intermediario de validação
async function validarNovoLivro(req, res, next) {
    try {
        await schemaNovoLivro.validate(req.body, {abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
// Exporto o intermediario pra usar no controller
module.exports = {
    validarNovoLivro
}