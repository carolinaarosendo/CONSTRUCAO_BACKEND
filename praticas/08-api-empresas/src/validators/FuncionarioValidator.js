const yup = require('yup')
const mongoose = require('mongoose')
const schema = yup.object().shape(
    {
        nome: yup.string().required("Nome é obrigatório!"),
        cpf: yup.string().required("CPF é obrigatório!"),
        email: yup.string().email("Email é obrigatório!").required("Email é obrigatório!"),
        telefone: yup.string().required("Telefone é obrigatório!"),
        dataNascimento: yup.date().required("Data de Nascimento é obrigatório!"),
        dataContratacao: yup.date().required("Data de Contratação é obrigatório!"),
        genero: yup.string().required("Genero é obrigatório!"),
        cargo: yup.string()
        .required("Cargo é obrigatório!")
        .test(
            'id-validator',
            'ID do cargo é inválido',
            value => mongoose.Types.ObjectId.isValid(value)
        ),
        departamento: yup.string()
        .required("Departamento é obrigatório!")
        .test(
            'id-validator',
            'ID do departamento é inválido',
            value => mongoose.Types.ObjectId.isValid(value)
        ),
    }
)
async function validarFuncionario(req,res,next) {
    try {
        await schema.validate(req.body, {abortEarly: false})
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
module.exports = {validarFuncionario}