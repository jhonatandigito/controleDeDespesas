const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inpultransactionAmount = document.querySelector('#amount')

const localStoragetransaction = JSON.parse(localStorage.getItem('transaction'))
let transactions = localStorage.getItem('transaction') !== null ? localStoragetransaction : []

  const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
  }


const addTransactionIntoDOM = transaction => {
const operator = transaction.amount < 0 ? '-': '+'
const CSSClass = transaction.amount < 0 ?'minus' : 'plus'
const amountWithoutOperator = Math.abs(transaction.amount)
const li = document.createElement('li')

li.classList.add(CSSClass)
li.innerHTML = `
${transaction.name}
 <span> ${operator} R$ ${amountWithoutOperator}</span>
 <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
 x
 </button>
`
transactionsUl.append(li)
  }

const updateBalanceVelues = () => {
  const transactionsAmounts = transactions.map(transaction => transaction.amount)
  const total = transactionsAmounts.reduce((accumulator,transaction) => accumulator + transaction, 0).toFixed(2)
  const income = transactionsAmounts.filter(value => value > 0).reduce((accumulator,value) => accumulator + value, 0).toFixed(2)
  const expense = Math.abs( transactionsAmounts.filter(value => value < 0).reduce((accumulator,value)=>accumulator + value,0)).toFixed(2)   

 balanceDisplay.textContent = `R$ ${total}`
 incomeDisplay.textContent = `R$ ${income}`
 expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceVelues()
}
  init()

  const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }

const generateID = () => Math.random(Math.random() *1000) 


  form.addEventListener('submit', event =>{
    event.preventDefault()

const TransactionName = inputTransactionName.value.trim()
const transactionsAmount = inpultransactionAmount.value.trim()

    if(TransactionName === '' || transactionsAmount === '' ){
      alert('Por favor,preencha tanto o nome quanto o valor da transação.')
      return
    }

    const transaction = {id:generateID(),name: TransactionName, amount: Number(transactionsAmount)}
   
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value =''
    inpultransactionAmount.value  = ''
  })