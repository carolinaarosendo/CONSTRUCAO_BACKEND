// importa o express
const express = require('express')
// cria uma instância do aplication com express
const app = express()
//habilitar o browser pra mandar uma requisição
const cors = require('cors')
// configuração da minha aplicação dos intermediários (middlawares)
app.use(cors())
// habilita receber json como corpo da reuisição
app.use(express.json())
// intermediário de LOG
app.use((req, res, next) => {
    console.log("### Requisição Chegou ###")
    console.log("Time: ", new Date().toLocaleString())
    console.log("Método: ", req.method)
    console.log("Rota: ", req.url)
    next()
})
// roteadores
const PessoaController = require('./routes/PessoaController')
app.use(PessoaController)


// executa
app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000")
})