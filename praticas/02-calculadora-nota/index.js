console.log("## Projeto 02 - Calculadora de Nota ##")

//import e executo o prompt-sync
let prompt = require('prompt-sync')()

// Pergunta pro usuário o nom dele e captura a resposta para dentro da variavel nome
let nome = prompt("Qual é o seu nome? ")
//Usando o nome capturado
console.log("Olá, " + nome)
// Calculo da nota do IESB baseado no peso
let calculadora = require('./CalculadoraNota.js')

console.log("### Calculado Nota A1 ###")
let exerciciosA1 = parseFloat(prompt("Qual a sua nota e exercicios? "))
let trabalhoA1 = parseFloat(prompt("Qual e sua nota de trabalho? "))
let provaA1 = parseFloat(prompt("Qual e sua nota de prova? "))
let notaA1 = calculadora.calcularNotaA1(exerciciosA1, trabalhoA1, provaA1)
console.log("Nota A1 Calculada: " + notaA1)
console.log("### Finalizado calculo nota A1 ###")

console.log("### Calculado Nota A2 ###")
let exerciciosA2 = parseFloat(prompt("Qual a sua nota e exercicios? "))
let trabalhoA2 = parseFloat(prompt("Qual e sua nota de trabalho? "))
let provaA2 = parseFloat(prompt("Qual e sua nota de prova? "))
let notaA2 = calculadora.calcularNotaA2(exerciciosA2, trabalhoA2, provaA2)
console.log("Nota A2 Calculada: " + notaA2)

console.log("### Finalizado calculo nota A2 ###")

console.log("### Calculando a Média Final ###")
let media = calculadora.calcularNotaFinal(notaA1, notaA2)

console.log("Média Final: " + media)

if(media >= 5) {
    console.log("Parabéns! " + nome + ", você foi aprovado!")
} else {
    console.log(nome + ", estude mais! Infelizmente voc~e fio reprovado.")
}