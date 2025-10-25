const yup = require('yup')
const schemaNovaPessoa = yup.object().shape(
    {
        nome: yup.string()
        .min(5, 'Nome inválido')
        .max(50, 'Nome inválido')
        .required('Nome obrigatório!'),
        cpf: yup.string()
        .length(11, "CPF inválido!")
        .matches(/[0-9]/, 'CPF inválido!')
        .required('CPF é obrigatório!'),
        email: yup.string().email('Email inválido'). required("Email é obrigatório!"),
        dataNascimento: yup.date().required('Data de Nascimento é obrigatório!'),
        telefone: yup.string().required('Telefone é obrigatório!'),
        genero: yup.string().required('Gênero é obrigatório!')
    }
)
// Intermediario de validação
async function validarNovaPessoa(req, res, next) {
    try {
        await schemaNovaPessoa.validate(req.body, {abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
// Exporto o intermediario pra usar no controller
module.exports = {
    validarNovaPessoa
}