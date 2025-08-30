// importar o código que vai ser testado
let {soma} = require('./Calculadora')

// importo as funcionalidades do JEST
let {describe, expect, test} = require('@jest/globals')

// describe para fazer o agrupamento dos testes
describe('Testando Módulo Calculadora',() => {
    //construir os testes unitários
    test('Calcular Soma -> ex 1 + 2 = 3', () => {
        expect(soma(1,2)).toBe(3)
    })
})