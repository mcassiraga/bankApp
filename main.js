let data = {
  user: 'Calixta Ochoa',
  hasPesosAccount: true,
  hasDollarsAccount: true,
  cards: [{
      brand: 'Visa',
      pesosDebt: 25689,  // opcion de pagar en las dos monedas. sumar pesos a dolares y pagar todo en pesos o en dolares
      dollarsDebt: 58.50,
      minimumPayment: 1800,
      expirationDate: '24/07/2019'
    },
    {
      brand: 'Amex',
      pesosDebt: 1850,
      dollarsDebt: 0,
      minimumPayment: 800,
      expirationDate: '22/07/2019'
    },
    {
      brand: 'Master',
      pesosDebt: 0,
      dollarsDebt: 117.25,
      minimumPayment: 1500,
      expirationDate: '23/07/2019'
    }
  ],
  dollarExchange: 43.50
}

let currentCard = data.cards[0].brand // tarjeta por defecto

const initialize = () => {
  printInitialData()
  printCurrentCard()
  fillModal()
}

const printInitialData = () => {
  let h1 = document.getElementById('greet')
  let select = document.getElementById('selectCard')
  select.innerHTML = ''
  h1.innerText = `Hola ${data.user}`

  data.cards.forEach(card => {
    let option = document.createElement('option')
    option.innerText = card.brand
    option.value = card.brand
<<<<<<< HEAD
    option.selected = card.brand === currentCard
=======
    option.selected = card.brand === currentCard // ? true : false (innecesario)
>>>>>>> e6f44ebd55c4e598f4c55ed74ecb139881814858
    select.appendChild(option)
  })
}

const printCurrentCard = () => {
  let container = document.getElementById('info')
  container.innerHTML = ''
  let card = data.cards.find(
    e => e.brand === currentCard
  )
<<<<<<< HEAD
  let date = document.createElement('em')
  let pesosDebt = document.createElement('p')
  let dollarsDebt = document.createElement('p')

  pesosDebt.innerText = `Pesos: ${card.pesosDebt}`
  dollarsDebt.innerText = `Dólares: ${card.dollarsDebt}`
  date.innerText = card.expirationDate

  container.appendChild(date)
  container.appendChild(pesosDebt)
  container.appendChild(dollarsDebt)
  container.appendChild(selectPaymentCurrency(card))
}

const selectPaymentCurrency = ({pesosDebt, dollarsDebt}) =>{
  //let {pesosDebt, dollarsDebt} = card

  let selector = document.createElement('select')
  if( data.hasPesosAccount && pesosDebt){
    let pesos = document.createElement('option')
    pesos.innerText = 'Pagar en pesos'
    pesos.value = 'pesos'
    selector.appendChild(pesos)
  }

  if(data.hasDollarsAccount && dollarsDebt){
    let dollars = document.createElement('option')
    dollars.innerText = 'Pagar en dolares'
    dollars.value = 'dollars'
    selector.appendChild(dollars)
  }

  return selector
=======
  let title = document.createElement('h3')
  let date = document.createElement('p')
  let pesosDebt = document.createElement('p')
  let dollarsDebt = document.createElement('p')
  title.innerText = card.brand
  date.innerText = `Expira el: ${card.expirationDate}`
  pesosDebt.innerText = `Deuda en pesos: ${card.pesosDebt}`
  dollarsDebt.innerText = `Deuda en dólares: ${card.dollarsDebt}`
  container.appendChild(title)
  container.appendChild(date)
  container.appendChild(pesosDebt)
  container.appendChild(dollarsDebt)
>>>>>>> e6f44ebd55c4e598f4c55ed74ecb139881814858
}

const changeCard = () => {
  currentCard = event.target.value // target hace referencia al elemento que disparó el event
  initialize()
}

const changeCurrency = () => {
  let currencySelector = document.getElementById('currencySelector')
  currencySelector.value = event.target.value
  fillAmountSelector() // recarga las opciones disponibles en el selector de monto al cambiar la moneda
}

const fillCurrencySelector = () => {
  let card = data.cards.find(e => e.brand === currentCard)
  let {pesosDebt, dollarsDebt} = card // extraigo las propiedades del objeto que me interesan
  let currencySelector = document.getElementById('currencySelector')
  currencySelector.innerHTML = ''

  if (pesosDebt) {
      let pesosOption = document.createElement('option')
      pesosOption.innerText = 'Pagar en pesos'
      pesosOption.value = 'Pesos'
      currencySelector.appendChild(pesosOption)
  }

  if (dollarsDebt) {
      let dollarOption = document.createElement('option')
      dollarOption.innerText = 'Pagar en dólares'
      dollarOption.value = 'Dólares'
      currencySelector.appendChild(dollarOption)
  }
}

const fillAmountSelector = () => {
  let card = data.cards.find(e => e.brand === currentCard)
  let {pesosDebt, dollarsDebt, minimumPayment} = card // extraigo las propiedades del objeto que me interesan
  let totalDebtinPesos = pesosDebt + (dollarsDebt * data.dollarExchange)
  let totalDebtinDollars = Math.round(totalDebtinPesos / data.dollarExchange)
  let amountSelector = document.getElementById('amountSelector')
  amountSelector.innerHTML = ''
  let currencySelector = document.getElementById('currencySelector')

  if (currencySelector.value === 'Pesos') {  
      let amountPesosOption = document.createElement('option')
      amountPesosOption.innerText = dollarsDebt ? `Total (ARS ${totalDebtinPesos})` : `Total (ARS ${pesosDebt})`
      amountPesosOption.value = dollarsDebt ? totalDebtinPesos : pesosDebt
      amountSelector.appendChild(amountPesosOption)
  
      let minimumPesos = document.createElement('option')
      minimumPesos.innerText = `Mínimo (ARS ${minimumPayment})`
      minimumPesos.value = minimumPayment
      amountSelector.appendChild(minimumPesos)
    }

  if (currencySelector.value === 'Dólares') {  
      let amountDollarOption = document.createElement('option')
      amountDollarOption.innerText = pesosDebt ? `Total (USD ${totalDebtinDollars})` : `Total (USD ${dollarsDebt})`
      amountDollarOption.value = pesosDebt ? totalDebtinDollars : dollarsDebt
      amountSelector.appendChild(amountDollarOption)
  
      let minimumDollars = document.createElement('option')
      minimumDollars.innerText = `Mínimo (USD ${Math.round(minimumPayment / data.dollarExchange)})`
      minimumDollars.value = Math.round(minimumPayment / data.dollarExchange)
      amountSelector.appendChild(minimumDollars)
    }
}

const fillModal = () => {
  fillCurrencySelector()
  fillAmountSelector()

  let payButton = document.getElementById('payButton')
  payButton.disabled = false
}

const payDebt = () => {
  let amountSelector = document.getElementById('amountSelector')
  let amountPaid = amountSelector.value

  let card = data.cards.find(e => e.brand === currentCard)
  let {pesosDebt, dollarsDebt} = card
  let totalDebtinPesos = pesosDebt + (dollarsDebt * data.dollarExchange)
  let totalDebtinDollars = totalDebtinPesos / data.dollarExchange
  let totalDebt = currencySelector.value === 'Pesos' ? totalDebtinPesos : totalDebtinDollars
  let currencySymbol = currencySelector.value === 'Pesos' ? 'ARS' : 'USD'

  let infoSaldo = document.createElement('p')
  infoSaldo.innerText = `Pagó ${currencySymbol} ${amountPaid}. Su nuevo saldo es de ${currencySymbol} ${Math.round(totalDebt - amountPaid)}.`
  let accountSummary = document.getElementById('account-summary')
  accountSummary.appendChild(infoSaldo)

  let payButton = document.getElementById('payButton')
  payButton.disabled = true
}

const clearModal = () => {
  let accountSummary = document.getElementById('account-summary')
  accountSummary.innerHTML = ''
}