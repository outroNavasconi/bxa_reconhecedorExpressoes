import Automaton from './automaton/automaton.js'
import * as info from './automaton/automatonInfo.js'

const SEND = document.getElementById('send')
const ERASER = document.getElementById('eraser')
const INPUT = document.getElementById('textarea')
const RESULTS = document.getElementById('results')
const SINGLE_LINE = document.getElementById('singleLine')
const DOUBLE_LINE = document.getElementById('doubleLine')

INPUT.oninput = function() {
  if (this.value.length > 0)
    enableButtons()
  else
    disableButtons()
  var el = this
  setTimeout(function( ){
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }, 0)
}

INPUT.onkeydown = function(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const end = this.selectionEnd;
    const start = this.selectionStart;
    this.value = this.value.substring(0, start) + '\t' + this.value.substring(end)
    this.selectionStart = this.selectionEnd = start + 1
  }
}

ERASER.onclick = function() {
  if (!this.classList.contains('disabled')) {
    disableButtons()
    INPUT.value = ''
    RESULTS.innerHTML = ''
    INPUT.style.cssText = 'height: auto'
  }
}

SEND.onclick = function() {
  if (!this.classList.contains('disabled')) {
    RESULTS.innerHTML = ''
    const automaton = new Automaton(info.initial, info.trans, info.finals)
    const expressions = extractExpressions(INPUT.value)
    const evalExpressions = startAnalysisOnExpressions(automaton, expressions)
    showEvaluetedExpressions(evalExpressions)
  }
}

/**
 * Habilita os botões
 */
function enableButtons() {
  SEND.classList.remove('disabled')
  ERASER.classList.remove('disabled')
}

/**
 * Desabilita os botões
 */
function disableButtons() {
  SEND.classList.add('disabled')
  ERASER.classList.add('disabled')
}

/**
 * Inicia o processo de análise das expressões digitadas
 * @param {*} automaton Autômata que será utilizado para avaliar as expressões
 * @param {*} expressions A lista de expressões a serem avaliadas pelo autômata
 * @returns Um objeto contento um mapeamento da expressão e sua categoria
 */
function startAnalysisOnExpressions(automaton, expressions) {
  const evalExpressions = []
  expressions.forEach(expression => {
    let category = 'Operador Aritmético'
    if (!isMathOperator(expression)) {
      automaton.process(expression)
      category = checkCategoryForExpression(automaton)
    }
    evalExpressions.push({category: category, value: expression})
    automaton.reset()
  });
  return evalExpressions
}

/**
 * Verifica se uma expressão é um dos seguintes operadores aritméticos: +, -, *, /
 * @param {*} expression Epressão que será avaliada
 * @returns Verdadeiro quando for um operador aritmetico e falso caso contrário
 */
function isMathOperator(expression) {
  return "+-/*".includes(expression)
}

/**
 * Avalia o autômata e seu estado atua para determinar a categoria da expressão regular.
 * 'Sentença Válida' será retornada quando o estado atual do autômata for final.
 * 'Símbolo(s) Inválido(s)' será retornada quando o estado atual do autômata indicar um erro
 * por símbolo desconhecido ao alfabeto.
 * 'Sentença Inválida' será retornada quando o estado atual do autômata não for final ou quando
 * seu estado indicar um erro de transição.
 * @param {*} automaton Autômata que será utilizado para avaliação
 * @returns Retorn a categoria da expressão baseado no estado do autômata
 */
function checkCategoryForExpression(automaton) {
  if (automaton.atualStateIsFinal())
    return 'Sentença Válida'
  else if (automaton.getState() === 'smb')
    return 'Símbolo(s) Inválido(s)'
  return 'Sentença Inválida'
}

/**
 * Remove caracteres de controle e espaços de um texto. Além disso, separa
 * as expressões regulares e operadores aritméticos
 * @param {*} text Texto contendo as expressões
 * @returns Uma lista contendo as expressões isoladas do texto
 */
function extractExpressions(text) {
  return Array.from(text.matchAll(/([a-zA-Z0-9]+)|[+-/*]/g), group => group[0])
}

/**
 * Adiciona um timer em cada linha de resultado (categoria + expressão) para exibir
 * elas em tempos diferentes
 * @param {*} evalExpressions lista com o mapeamento entre categoria e expressões 
 */
function showEvaluetedExpressions(evalExpressions) {
  let timeOffset = 0
  let lastCategory = ''
  for (const expression of evalExpressions) {
    setTimeout(insertLineInResultArea.bind(this, lastCategory, expression), timeOffset)
    timeOffset += 300
    lastCategory = expression.category
  }
}

/**
 * Insere as linhas de resultados (categoria + expressão) na seção de resultados
 * @param {*} lastCategory Última categoria inserida na seção
 * @param {*} expression Expressão que será inserida
 */
function insertLineInResultArea(lastCategory, expression) {
  const div = document.createElement('div')
  if (lastCategory === expression.category) {
    appendSpanCategoryModel(div, '')
    appendDoubleLine(div)
  } else {
    appendSpanCategoryModel(div, expression.category)
    appendSingleLine(div)
  }
  appendSpanExpressionModel(div, expression.category, expression.value)
  RESULTS.append(div)
}

/**
 * Cria um elemento <span> para exibir a categoria de uma expressão regular
 * @param {*} node Nó HTML que irá receber o <span>
 * @param {*} content Descrição da categoria
 */
function appendSpanCategoryModel(node, content) {
  const span = document.createElement('span')
  span.textContent = content
  node.append(span)
}

/**
 * Cria um elemento <img> dentro de uma <div> para apresentar a ligação entre a 
 * categoria e a expressão
 * @param {*} node nó HTML que irá receber a <div>
 */
function appendSingleLine(node) {
  const div = document.createElement('div')
  const img = SINGLE_LINE.cloneNode()
  img.classList.remove('off')
  div.classList.add('line')
  div.append(img)
  node.append(div)
}

/**
 * Cria um elemento <img> dentro de uma <div> para apresentar a ligação contínua
 * entre a categoria atual e a expressão
 * @param {*} node nó HTML que irá receber a <div>
 */
function appendDoubleLine(node) {
  const div = document.createElement('div')
  const img = DOUBLE_LINE.cloneNode()
  img.classList.remove('off')
  div.classList.add('line', 'doubleLine')
  div.append(img)
  node.append(div)
}

/**
 * Cria um elemento <span> para exibir uma espressão regular
 * @param {*} node Nó HTML que irá receber o <span>
 * @param {*} category Categoria da expressão após análise
 * @param {*} content Expressão regular
 */
function appendSpanExpressionModel(node, category, content) {
  const span = document.createElement('span')
  span.classList.add(getCategoryColorClass(category))
  span.textContent = content
  node.append(span)
}

/**
 * @param {*} category Categoria da expressão
 * @returns A classe de CSS especificando o estilo para a categoria
 */
function getCategoryColorClass(category) {
  if (category === 'Operador Aritmético')
    return 'operator'
  else if (category === 'Sentença Válida')
    return 'valid'
  return 'invalid'
}

