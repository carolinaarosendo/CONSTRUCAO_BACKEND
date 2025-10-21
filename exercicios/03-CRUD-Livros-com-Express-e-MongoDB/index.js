// Crio aplucação express
const express = require('express')
const app = express()

app.use(express.json())

// Conectar no MongoDB
const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
 .then(() => {
    console.log("Conectado ao banco MongoDB!")
 })
 .catch(erro => {
    console.log("Erro ao conetar no banco MongoDB: ", erro)
 })
// Model (Modelo) - Interface com o meu banco de dados
// Cade Model representa uma Collection (Tabela)
// O CRUD de livros, com os campos: título, autor, editora, ano e preço
const LivrosModel = mongoose.model('Livros', new mongoose.Schema(
   {
       titulo: String,
       autor: String,
       editora: String,
       ano: Date,
       preco: Number,
       dataCriacao: {type: Date, default: Date.now() }
   }
))
// Os endpoints para criar, listar, buscar por id, atualizar e remover livros
// CRUD
// Criação
app.post('/livros', async (req, res, next) => {
   const livros = req.body
   if(!livros.titulo || !livros.autor || !livros.editora || !livros.ano || !livros.preco){
       return res.status(400).json({erro: "Campos titulo, autor, editora, ano e preço são obrigatórios!"})
   }
   const livroCriado = await LivrosModel.create(livros)
   res.status(201).json(livroCriado)
})
// Leitura
app.get('/livros/:id', async (req, res, next) => {
   const id = req.params.id
   const livro = await LivrosModel.findById(id)
   res.json(livro)
})

// Atualização
app.put('/livros/:id', async (req, res, next) => {
   const id = req.params.id
   const livros = req.body
   if(!livros.titulo || !livros.autor || !livros.editora || !livros.ano || !livros.preco){
       return res.status(400).json({erro: "Campos titulo, autor, editora, ano e preço são obrigatórios!"})
   }
   const livroAtualizado = await LivrosModel.findByIdAndUpdate(id, livros, {new: true})
   if(!livroAtualizado){
       return res.status(404).json({ erro: "Livro não encontrado!"})
   }
   res.json(livroAtualizado)
})

// Exclusão
app.delete('/livros/:id', async (req, res, next) => {
   const id = req.params.id
   await LivrosModel.findByIdAndDelete(id)
   res.status(204).send()
})

 app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})