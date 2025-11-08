const express = require('express')
const router = express.Router()

const TarefaModel = require('../models/TarefaModel')
const {validarTarefa} = require('../validators/TarefaValidator')
const {validarID} = require('../validators/IDValidator')

// buscar
router.get('/tarefas', async (req,res,next) => {
    const tarefas = await TarefaModel.find()
    res.json(tarefas)
})
// buscar por id
router.get('/tarefas/:id', validarID, async (req,res,next) => {
    const tarefaEncontrada = await TarefaModel.findById(req.params.id)
    if(!tarefaEncontrada) {
        return res(404).json({erro: "Não encontrado"})
    }
    res.json(tarefaEncontrada)
})
// cadastrar
router.post('/tarefas',validarTarefa, async (req,res,next) => {
    const tarefaCadastrada = await TarefaModel.create(req.body)
    res.status(201).json(tarefaCadastrada)
})
// atualizar
router.put('/tarefas/:id', validarID, async (req,res,next) => {
    const id = req.params.id
    const dados = req.body
    const tarefaAtualizada = await TarefaModel.findByIdAndUpdate(id, dados, {new: true})
    if(!tarefaAtualizada){
        return res.status(404).json({erro: "Não encontrado."})
    }
    res.json(tarefaAtualizada)
})
// delete
router.delete('/tarefas/:id', validarID, async (req,res,next) => {
    await TarefaModel.findByIdAndDelete(req.params.id)
    res.status(204).send()
})

module.exports = router