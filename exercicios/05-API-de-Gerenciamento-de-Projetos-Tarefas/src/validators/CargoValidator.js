const yup = require('yup')

const schema = yup.object().shape(
  {
    nome: yup.string().required("Nome do cargo é obrigatório!"),
    descricao: yup.string().required("Descrição do cargo é obrigatória!"),
    salario: yup.number()
      .required("Salário é obrigatório")
      .min(1518.00, "Salário minimo é de 1518.00")
  }
)

async function validarCargo(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarCargo }