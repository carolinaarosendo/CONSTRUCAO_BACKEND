const express = require('express')
const router = express.Router()
// importo o modelo
const LivroModel = require('../models/Livros')
// importo os validadores
const {validarNovoLivro} = require('../validators/LivroValidator')
const {validarID} = require('../validators/IDValidator')
// rotas:
// cadastro
router.post('/livros', validarNovoLivro, async (req, res, next) => {
    const dados = req.body
    const livroCadastrado = await LivroModel.create(dados)
    res.status(201).json(livroCadastrado)
})
// leitura
router.get('/livros', async (req, res, next) => {
    const livros = await LivroModel.find()
    res.json(livros)
})
router.get('/livros/:id',validarID, async (req, res, next) => {
    const livroEncontrado = await LivroModel.findById(req.params.id)
    if(!livroEncontrado){
        return res.status(404).json({erro: "Livro não encontrada!"})
    }
    res.json(livroEncontrado)
})
// atualização
router.put('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    const novosDados = req.body
    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, novosDados, {new: true})
    if(!livroAtualizado){
        return res.status(404).json({ erro: "Livro não encontrada!"})
    }
    res.json(livroAtualizado)
})
// exclusão
router.delete('/livros/:id', validarID, async (req, res, next) => {
    const id = req.params.id
    await LivroModel.findByIdAndDelete(id)
    res.status(204).send()
})
module.exports = router