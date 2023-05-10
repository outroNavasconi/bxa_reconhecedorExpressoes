/**
 * Construtor do autômata
 * @param {*} initialState Indica o estado inicial do autômata
 * @param {*} tabTransitions A tabela de transições desse autômata
 * @param {*} tabFinalStates A tabela de estado finais do autômata
 */
export default function Automaton(initialState, tabTransitions, tabFinalStates) {
  this.state = initialState
  this.initialState = initialState
  this.tabTransitions = tabTransitions
  this.tabFinalStates = tabFinalStates
}

/**
 * Inicia o processamento pelo autômata da expressão regular. Caso ela contenha algum
 * símbolo que não faça parte do alfabeto definido, o autômata irá procurar pela transição
 * 'non' definida no estado atual
 * @param {*} expression 
 */
Automaton.prototype.process = function(expression) {
  for (let symbol of expression) {
    if (!this.tabTransitions[this.state].hasOwnProperty(symbol))
      symbol = 'non'
    this.state = this.tabTransitions[this.state][symbol]
  }
}

/**
 * @returns Verdadeiro quando o estado atual for final e falso caso contrário
 */
Automaton.prototype.atualStateIsFinal = function() {
  return this.tabFinalStates[this.state]
}

/**
 * Retorna o autômata para seu estado inicial
 */
Automaton.prototype.reset = function() {
  this.state = this.initialState
}

Automaton.prototype.getState = function() {
  return this.state
}

