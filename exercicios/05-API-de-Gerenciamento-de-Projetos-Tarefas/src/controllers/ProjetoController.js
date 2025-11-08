const express = require('express')
const router = express.Router()

const ProjetoModel = require('../models/ProjetoModel')
const {validarProjeto} = require('../validators/ProjetoValidator')
// buscar
router.get('/projetos', async (req,res,next) => {
    const projetos = await ProjetoModel.find()
    res.json(projetos)
})
// buscar por id
router.get('/projetos/:id', async (req,res,next) => {
    const projetoEncontrado = await ProjetoModel.findById(req.params.id)
    if(!projetoEncontrado) {
        return res(404).json({erro: "Não encontrado"})
    }
    res.json(projetoEncontrado)
})
// cadastrar
router.post('/projetos',validarProjeto, async (req,res,next) => {
    const projetoCadastrado = await ProjetoModel.create(req.body)
    res.status(201).json(projetoCadastrado)
})
// atualizar
router.put('/projetos/:id', async (req,res,next) => {
    const id = req.params.id
    const dados = req.body
    const projetoAtualizado = await ProjetoModel.findByIdAndUpdate(id, dados, {new: true})
    if(!projetoAtualizado){
        return res.status(404).json({erro: "Não encontrado."})
    }
    res.json(projetoAtualizado)
})
// delete
router.delete('/projetos/:id', async (req,res,next) => {
    await ProjetoModel.findByIdAndDelete(req.params.id)
    res.status(204).send()
})

module.exports = router