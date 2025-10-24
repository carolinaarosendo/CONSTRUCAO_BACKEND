const express = require('express')
const router = express.Router()
// importo o modelo
const PessoaModel = require('../models/PessoaModel')
// importo os validadores

// rotas:
// cadastro
router.post('/pessoas', async (req, res, next) => {
    const dados = req.body
    const pessoaCadastrada = await PessoaModel.create(dados)
    res.status(201).json(pessoaCadastrada)
})
// leitura
router.get('/pessoas', async (req, res, next) => {
    const pessoas = await PessoaModel.find()
    res.json(pessoas)
})
router.get('/pessoas/:id', async (req, res, next) => {
    const pessoaEncontrada = await PessoaModel.findById(req.params.id)
    if(!pessoaEncontrada){
        return res.status(404).json({erro: "Pessoa não encontrada!"})
    }
    res.json(pessoaEncontrada)
})
// atualização
router.put('/pessoas/:id', async (req, res, next) => {
    const id = req.params.id
    const novosDados = req.body
    const pessoaAtualizada = await PessoaModel.findByIdAndUpdate(id, novosDados, {new: true})
    if(!pessoaAtualizada){
        return res.status(404).json({ erro: "Pessoa não encontrada!"})
    }
    res.json(pessoaAtualizada)
})
// exclusão
router.delete('/pessoas/:id', async (req, res, next) => {
    const id = req.params.id
    await PessoaModel.findByIdAndDelete(id)
    res.status(204).send()
})
module.exports = router