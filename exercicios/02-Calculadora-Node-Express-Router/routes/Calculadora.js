// importo o express
const express = require('express')
// crio um roteador
const router = express.Router()

// mapeamento das rotas e implementar a lógica

router.get("/Calculadora", (req, res, next) => {
    const v1 = parseFloat(req.query.v1)
    const v2 =  parseFloat(req.query.v2)

// valido se ele mandou os parametros e se estão dentro do intervalo
if(isNaN(v1) || isNaN(v2)){
    return res.status(400).json({erro: "Valores inválidos!"})
}
if(v1 < 0 || v1 > 1 || v2 < 0 || v2 > 3) {
    return res.status(400).json({erro: "Valores fora do intervalo!"})
}

    const resultado = v1 + v2
    res.json({resultado})
})


// exporto o roteador
module.exports = router