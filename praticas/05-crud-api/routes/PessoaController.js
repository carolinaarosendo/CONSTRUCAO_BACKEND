// importo o express
const express = require('express')
// crio um roteador
const router = express.Router()

// mapeamento dos endpoints e a lógica
// lista de pessoas para simular o banco e dados
let pessoas = [
    {
        id: 1,
        nome: "Ana Carolina",
        cpf: "12345678912",
        email: "anaarolina@gmail.com",
        dataNascimento: "01/01/2001"
    },
    {
        id: 5,
        nome: "Luana",
        cpf: "12345678854",
        email: "luama@gmail.com",
        dataNascimento: "01/01/2002"
    }
]
// criar post/pessoas
router.post('/pessoas', (req, res, next) => {

})
// listar todos get/pessoas
router.get('/pessoas', (req, res, next) => {
    res.json(pessoas)
})
// buscar um get/pessoas/id
router.get('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(p => p.id == idRecebido)
    if(!pessoa){
        return res.status(404).json({ error: "Pessoas não encontrada."})
    }
    res.json(pessoa)
})
// editar put/pessoas/id
router.put('/pessoas/:id', (req, res, next) => {

})
// deletar delete/pessoas/id
router.delete('/pessoas/:id', (req, res, next) => {

})
// exportar o roteador
module.exports = router