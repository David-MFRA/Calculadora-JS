let primerOperando = ''
let segundoOperando = ''
let operacionActual = null
let resetearPantalla = false

const botonesNumeros = document.querySelectorAll('[data-numero]')
const botonesOperadores = document.querySelectorAll('[data-operador]')
const botonIgual = document.getElementById('botonIgual')
const botonLimpiar = document.getElementById('botonLimpiar')
const botonBorrar = document.getElementById('botonBorrar')
const botonPunto = document.getElementById('botonPunto')
const pantallaUltima = document.getElementById('pantallaUltima')
const pantallaActual = document.getElementById('pantallaActual')

window.addEventListener('keydown', inputTeclado)
botonIgual.addEventListener('click', evaluar)
botonLimpiar.addEventListener('click', limpiar)
botonBorrar.addEventListener('click', borrar)
botonPunto.addEventListener('click', agregarPunto)

botonesNumeros.forEach((boton) => 
    boton.addEventListener('click', () => agregarNumero(boton.textContent))
)

botonesOperadores.forEach((boton) => 
    boton.addEventListener('click', () => agregarOperador(boton.textContent))
)

function agregarNumero(numero) {
    if(pantallaActual.textContent === '0' || resetearPantalla) resetear()
    pantallaActual.textContent += numero
}

function resetear() {
    pantallaActual.textContent = ''
    resetearPantalla = false
}

function limpiar() {
    pantallaActual.textContent = '0'
    pantallaUltima.textContent = ''
    primerOperando = ''
    segundoOperando = ''
    operacionActual = null
}

function agregarPunto() {
    if(resetearPantalla) resetear()
    if(pantallaActual.textContent === '') pantallaActual.textContent = '0'
    if(pantallaActual.textContent.includes('.')) return
    pantallaActual.textContent += '.'
}

function borrar() {
    pantallaActual.textContent = pantallaActual.textContent.toString().slice(0, -1)
}

function agregarOperador(operador) {
    if(operacionActual !== null) evaluar()
    primerOperando = pantallaActual.textContent
    operacionActual = operador
    pantallaUltima.textContent = `${primerOperando} ${operacionActual}`
    resetearPantalla = true
}

function evaluar() {
    if(operacionActual === null || resetearPantalla) return
    if(operacionActual === '÷' && pantallaActual.textContent === '0') {
        alert("No puedes dividir por 0")
        return
    }
    segundoOperando = pantallaActual.textContent
    pantallaActual.textContent = redondear(operar(operacionActual, primerOperando, segundoOperando))
    pantallaUltima.textContent = `${primerOperando} ${operacionActual} ${segundoOperando} = `
    operacionActual = null
}

function redondear(numero) {
    return Math.round(numero * 1000) / 1000
}

function inputTeclado(e) {
    if(e.key >0 && e.key<= 9) agregarNumero(e.key)
    if(e.key === '.') agregarPunto()
    if(e.key === '=' || e.key === 'Enter') evaluar()
    if(e.key === 'Backspace') borrar()
    if(e.key === 'Escape') limpiar()
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') agregarOperador(convertirOperador(e.key))
}

function convertirOperador(operador) {
    if(operador === '/') return '÷'
    if(operador === '*') return '×'
    if(operador === '-') return '−'
    if(operador === '+') return '+'  
}

function sumar(a, b) {
    return a + b
}

function restar(a, b) {
    return a - b
}

function multiplicar(a, b) {
    return a * b
}

function dividir(a, b) {
    return a / b
}

function operar(operador, a, b) {
    a = Number(a)
    b = Number(b)
    switch(operador){
        case '+':
            return sumar(a, b)
        case '−':
            return restar(a, b)
        case '×':
            return multiplicar(a, b)
        case '÷':
            if (b === 0) return null
            else return dividir(a, b)
        default:
            return null
    }
}