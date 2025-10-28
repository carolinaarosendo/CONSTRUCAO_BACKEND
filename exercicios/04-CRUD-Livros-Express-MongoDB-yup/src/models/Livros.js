const mongoose = require('mongoose')
const schema = new mongoose.Schema(
    // estrutura do registro
    {
        titulo: {type: String, required: true},
        autor: {type: String, required: true},
        editora: {type: String, required: true},
        dataLancamento: {type: Date, required: true},
        preco: {type: String, required: true}
    },
    // parametros
    {
        timestamps: true
    }
)
// modelo
const LivroModel = mongoose.model('Livros',schema)

// exportar o modelo
module.exports = LivroModel
