/*
- EL usuario debe poder visualizar su informacion personal y los datos de sus tarjetas de crédito, mostrando una a la vez y permitiendole cambiar entre ellas

- para cada tarjeta se debe mostrar la fecha de vencimiento, la deduda en cada moneda existente y ofrecer el pago en una moneda elejida segun las cuentas de la persona.
  - Si la persona tiene cuenta en pesos se le debe ofrecer pagar toda su deuda en esa moneda, convirtiendo el valor el valor de     cualquier deuda en otra moneda a pesos y sumandolo al total a pagar.
  - Si la persona tiene cuenta en dolares hay que hace lo mismo en el punto anterior pero convirtiendo todo a dolares. 

- la persona debe poder elegir una opcion de monto a pagar entre total o pago minimo (tiene pago minimo). en caso de hacer el pago minimo hay que mostrar el saldo restante.

tip: las opcionnes de moneda a pagar y monto de pago podrian mostrarse como selectes independientes en los que le sumamos diferentes options segun las condiciones y las opciones conn las que el usuario pueda contar. 
*/

let data = {
  user:'Calixta Ochoa',
  hasPesosAccount: true,
  hasDollarsAccount: true,
  cards:[
    {
      brand:'Visa',
      pesosDebt: 25689,
      dollarsDebt:58.50,
      minimunPayment: 1800,
      expirationDate: '24/07/2019'
    },
    {
      brand:'Amex',
      pesosDebt: 1850,
      dollarsDebt:0,
      minimunPayment: 800,
      expirationDate: '22/07/2019'
    },
    {
      brand:'Master',
      pesosDebt: 0,
      dollarsDebt:117.25,
      minimunPayment: 1500,
      expirationDate: '23/07/2019'
    }
  ],
  dollarExchange:43.50
}

let currentCard = data.cards[0].brand

const initialize = () => {
  printInitialData()
  printCurrentCard()
}

const printInitialData = () => {
  console.log(currentCard)
  let h1 = document.getElementById('greet')
  let select = document.getElementById('selectCard')
  select.innerHTML = ''
  h1.innerText = `Hola ${data.user}`

  data.cards.forEach( card => {
    let option = document.createElement('option')
    option.innerText = card.brand
    option.value = card.brand
    option.selected = card.brand === currentCard ? true : false 
    select.appendChild(option)
  })
}

const printCurrentCard = () => {
  let container = document.getElementById('payment')
  container.innerHTML = ''
  let card = data.cards.find( 
    e => e.brand === currentCard
  )
  let title = document.createElement('h3')
  let date = document.createElement('em')
  title.innerText = card.brand
  date.innerText = card.expirationDate
  container.appendChild(title)
  container.appendChild(date)
}

const changeCard = () => {
  currentCard = event.target.value
  initialize()
}