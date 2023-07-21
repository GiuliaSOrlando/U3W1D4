class Clothes {
  saleInEuro!: number
  constructor(
    public id: number,
    public type: string,
    public priceWithVAT: number,
    public priceWithoutVAT: number,
    public collection: string,
    public color: string,
    public model: string,
    public quantity: number,
    public available: string,
    public sale: number
  ) {
    this.getSale()
    this.getTotal()
  }
  getSale() {
    this.saleInEuro = (this.priceWithVAT * this.sale) / 100
    return `${this.saleInEuro.toFixed(2)} €`
  }
  getTotal() {
    return `${(this.priceWithVAT - this.saleInEuro).toFixed(2)} €`
  }
}

fetch("starter/Abbigliamento.json")
  .then((res: any) => {
    if (res.ok) {
      console.log(res)
      return res.json()
    } else {
      throw new Error(res.statusText)
    }
  })
  .then((data: any) => {
    console.log(data)
    let clothesArray: Clothes[] = []
    data.forEach((clothes: any, i: any) => {
      clothes = new Clothes(
        data[i].codprod,
        data[i].capo,
        data[i].prezzoivaesclusa,
        data[i].prezzoivainclusa,
        data[i].collezione,
        data[i].colore,
        data[i].modello,
        data[i].quantita,
        data[i].disponibile,
        data[i].saldo
      )
      clothesArray.push(clothes)
    })
    console.log(clothesArray)
    console.log(clothesArray[0])
    console.log(clothesArray[0].getTotal())
    clothesArray.forEach((clothes: Clothes, i) => {
      let clothesEl = document.createElement(`div`)
      clothesEl.classList.add(`col-7`, `container`)
      clothesEl.style.width = "500px"
      clothesEl.innerHTML = `
    <div class="clothes p-5 border border-danger border-2 my-5 bg-body-tertiary w-100" style="border-radius: 35px; width: 250px;">
    <div class="clothes-name">
    Tipo di capo: <span class="fw-bold text-danger">${clothes.type}</span>
    </div>
    <div class="clothes-price-with-vat">
    Prezzo inclusa iva: ${clothes.priceWithVAT} €
    </div>
    <div class="clothes-price-without-vat">
    Prezzo esclusa iva: ${clothes.priceWithoutVAT} €
    </div>
    <div class="clothes-sale">
    Sconto applicato sul capo: ${clothes.getSale()}
    (<span class="fw-bold text-white">${clothes.sale}%</span>)
    </div>
    <div class="clothes-total">
    Totale, dopo l'applicazione dello sconto: ${clothes.getTotal()}
    <img src="https://img.freepik.com/free-photo/portrait-queen-with-royal-crown_23-2150306020.jpg?w=740&t=st=1689863072~exp=1689863672~hmac=2f183eeb24d65e6a358b05ea4a044bb92219ca0f86c9ed94ed4cdd694f376b9c" style="width:250px" class="d-block">
    </div>
      </div>`
      console.log(clothesEl)
      let row = document.getElementById(`row`) as HTMLElement
      row.appendChild(clothesEl)
    })
  })
  .catch((err) => {
    console.log(err)
  })
