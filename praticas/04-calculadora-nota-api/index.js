// importa o express
const express = require('express')
// cria uma instância do aplication com express
const app = express()
// configuração da minha aplicação dos intermediários (middlawares)

// intermediário de LOG
app.use((req, res, next) => {
    console.log("### Requisição Chegou ###")
    console.log("Time: ", new Date().toLocaleString())
    console.log("Método: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

app.get("/hello", (req, res, next) => {
    res.send("Hello! aaaaaaaaaaaaaaaaa")
})

// importar o roteador CalculadoraNota
const calculadoraNotaRouter = require('./routes/CalculadoraNota')
// configuro a minha aplicação para usar o router (CalculadoraNota) como intermediário
app.use("/", calculadoraNotaRouter)

// executo a aplicação (minha pi)
app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000")
})