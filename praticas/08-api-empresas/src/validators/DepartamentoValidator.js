const yup = require('yup')
const schema = yup.object().shape(
    {
        nome: yup.string()
        .min(3, "O nome precisa de pelo menos 3 caracteres!")
        .max(50, "O nome precisa de no máximo 50 caracteres")
        .required("Nome é obrigatório!"),
        descricao: yup.string()
        .min(3, "A descrição precisa de pelo menos 3 caracteres!")
        .max(50, "A descrição precisa de no máximo 50 caracteres")
        .required("Descrição é obrigatória!"),
    }
)
async function validarDepartamento(req,res,next) {
    try {
        await schema.validate(req.body, {abortEarly: false})
        next()
    } catch (error) {
        return res.status(400).json({erros: error.errors})
    }
}
module.exports = { validarDepartamento }