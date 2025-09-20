// importo o express
const express = require('express')
// crio um roteador
const router = express.Router()

// mapeamento dos endpoints e a lógica
// lista de pessoas para simular o banco e dados
let pessoas = [
    {
        id: 1,
        nome: "Ana CLara",
        cpf: "12345678912",
        email: "anaarolina@gmail.com",
        dataNascimento: "01/01/2001"
    },
    {
        id: 2,
        nome: "Luana",
        cpf: "12345678854",
        email: "luama@gmail.com",
        dataNascimento: "01/01/2002"
    }
]
// criar post/pessoas
router.post('/pessoas', (req, res, next) => {
    const {nome, cpf, email, dataNascimento} = req.body
// validar se os dados vinheram
    if(!nome || !cpf || !email || !dataNascimento) {
        return res.status(400).json({ error: "nome, cpf, email e dataNascimento são obrigatórios!"})
    }
// validar se o cpf já existe
    const pessoa = pessoas.find(pessoa => pessoa.cpf == cpf)
    if(pessoa){
        return res.status(409).json({ error: "CPF já cadastrado!"})
    }
// cadastrar a nova pessoa na lista
const novaPessoa = {
    id: Date.now(),
    nome,
    cpf,
    email,
    dataNascimento
}
// inserir a nova pessoa montada na lista
pessoas.push(novaPessoa)
res.status(201).json({message: "Pessoa cadastrada!", novaPessoa})
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
// atualizar put/pessoas/id
router.put('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const {nome, email, dataNascimento} = req.body
// validar se os dados vinheram
    if(!nome || !email || !dataNascimento){
        return res.status(400).json({error: "nome, email e dataNascimento são obrigatórios!"})
    }
// validar se a pessoa com aquele id existe na lista
    const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
    if(!pessoa){
        return res.status(404).json({error: "Pessoa não encontrada!"})
    }
// sobrescrevo os dados da pessoa para atualizar
    pessoa.nome = nome
    pessoa.email = email
    pessoa.dataNascimento = dataNascimento
    res.json({message: "Pessoa atualizada com sucesso!"})
})
// deletar delete/pessoas/id
router.delete('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(pessoa => pessoa.id == idRecebido)
    if(!pessoa){
        return res.status(404).json({error: "Pessoa não encontrada!"})
    }

    pessoas = pessoas.filter(pessoa => pessoa.id != idRecebido)

    res.json({message: "Pessoa excluída com sucesso!"})
})
// exportar o roteador
module.exports = router