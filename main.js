/*
- EL usuario debe poder visualizar su informacion personal y los datos de sus tarjetas de crédito, mostrando una a la vez y permitiendole cambiar entre ellas

- para cada tarjeta se debe mostrar la fecha de vencimiento, la deduda en cada moneda existente y ofrecer el pago en una moneda elejida segun las cuentas de la persona.
  - Si la persona tiene cuenta en pesos se le debe ofrecer pagar toda su deuda en esa moneda, convirtiendo el valor el valor de     cualquier deuda en otra moneda a pesos y sumandolo al total a pagar.
  - Si la persona tiene cuenta en dolares hay que hace lo mismo en el punto anterior pero convirtiendo todo a dolares. 

- la persona debe poder elegir una opcion de monto a pagar entre total o pago minimo (tiene pago minimo). en caso de hacer el pago minimo hay que mostrar el saldo restante.

tip: las opcionnes de moneda a pagar y monto de pago podrian mostrarse como selectes independientes en los que le sumamos diferentes options segun las condiciones y las opciones conn las que el usuario pueda contar. 
*/

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

let currentCard = data.cards[0].brand

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
    option.selected = card.brand === currentCard // ? true : false (innecesario)
    select.appendChild(option)
  })
}

const printCurrentCard = () => {
  let container = document.getElementById('info')
  container.innerHTML = ''
  let card = data.cards.find(
    e => e.brand === currentCard
  )
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
}

const changeCard = () => {
  currentCard = event.target.value // target hace referencia al elemento que disparó el event
  initialize()
}

const fillModal = () => {
  // 1. capturar qué tarjeta está seleccionada
  let selectCard = document.getElementById('selectCard')
  let currentCard = selectCard.value
  let card = data.cards.find(e => e.brand === currentCard)
  let {pesosDebt, dollarsDebt, minimumPayment} = card // extraigo las propiedades del objeto que me interesan
  
  // 2. localizar selectores
  let currencySelector = document.getElementById('currencySelector')
  currencySelector.innerHTML = ''
  let amountSelector = document.getElementById('amountSelector')
  amountSelector.innerHTML = ''

  // 3. options de los selects
  if (pesosDebt) {
    let pesosOption = document.createElement('option')
    pesosOption.innerText = 'Pagar en pesos'
    pesosOption.value = 'Pesos'
    currencySelector.appendChild(pesosOption)

    let amountPesosOption = document.createElement('option')
    amountPesosOption.innerText = `Total (ARS ${pesosDebt})`
    amountPesosOption.value = pesosDebt
    amountSelector.appendChild(amountPesosOption)

    let minimumPesos = document.createElement('option')
    minimumPesos.innerText = `Mínimo (ARS ${minimumPayment})`
    minimumPesos.value = minimumPayment
    amountSelector.appendChild(minimumPesos)
  }

  if (dollarsDebt) {
    let dollarOption = document.createElement('option')
    dollarOption.innerText = 'Pagar en dólares'
    dollarOption.value = 'Dólares'
    currencySelector.appendChild(dollarOption)

    let amountDollarOption = document.createElement('option')
    amountDollarOption.innerText = `Total (USD ${dollarsDebt})`
    amountDollarOption.value = dollarsDebt
    amountSelector.appendChild(amountDollarOption)

    let minimumDollars = document.createElement('option')
    minimumDollars.innerText = `Mínimo (ARS ${minimumPayment})`
    minimumDollars.value = Math.round(minimumPayment / data.dollarExchange)
    amountSelector.appendChild(minimumDollars)
  }

  let payButton = document.getElementById('payButton')
  payButton.disabled = false
}

const payDebt = () => {
  let amountSelector = document.getElementById('amountSelector')
  let amountPaid = amountSelector.value
  let find = data.cards.find(e => e.brand === currentCard)
  let totalDebt = currencySelector.value === 'Pesos' ? find.pesosDebt : find.dollarsDebt
  let currency = currencySelector.value === 'Pesos' ? 'ARS' : 'USD'

  let infoSaldo = document.createElement('p')
  infoSaldo.innerText = `Pagó ${currency} ${amountPaid}. Su nuevo saldo es de ${currency} ${totalDebt - amountPaid}.`
  let accountSummary = document.getElementById('account-summary')
  accountSummary.appendChild(infoSaldo)

  let payButton = document.getElementById('payButton')
  payButton.disabled = true
}

const clearModal = () => {
  let accountSummary = document.getElementById('account-summary')
  accountSummary.innerHTML = ''
}