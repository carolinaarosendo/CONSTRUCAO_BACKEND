const yup = require('yup')

const schema = yup.object().shape(
  {
    nome: yup.string().required("Nome do departamento é obrigatório!"),
    descricao: yup.string().required("Descrição do departamento é obrigatória!"),
  }
)

async function validarDepartamento(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarDepartamento }