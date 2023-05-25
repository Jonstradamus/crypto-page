const form = document.querySelector('#coin-form');
const coin = document.querySelector ('#coin');
const cripto = document.querySelector('#crypto');
const monto = document.querySelector('#amount');
const coinInfo = document.querySelector('.coin-info');
const tradeInfo = document.querySelector('.trade-container');
const variacion = document.querySelector('.variationprice')
const REGEX_NUMBER = /^([0-9])+$/;
const inputcoin = document.querySelector('.input-coin')
const formbtn = document.querySelector('.form-btn');
const hidden = document.querySelector('.hidden')
let inputValidation = false;



const validateInput = (input, regexValidation) => {
    if (inputValidation) {
       
        formbtn.disabled = false
        hidden.classList.replace('error','hidden');

        console.log(inputValidation)
        
    } else {
        formbtn.disabled = true;
        hidden.classList.replace('hidden','error');
        console.log(inputValidation)

    }
    }

inputcoin.addEventListener('input', e => {
    inputValidation = REGEX_NUMBER.test(e.target.value);
    validateInput (inputcoin, inputValidation)

   
});




form.addEventListener ('submit', async e =>{ 
e.preventDefault();
const coinSelected = [...coin.children].find (option => option.selected).value;
 const cryptoSelected = [...cripto.children].find (option => option.selected).value;
 const amountValue = monto.value;

 

 if (cryptoSelected === 'BTC') {
    
    tradeInfo.innerHTML =
    ` <div class="trade-container">
     <img src="img/bitcoin-btc-logo.svg" alt=""></div>`

 } else if (cryptoSelected === 'ETH') {
    
    tradeInfo.innerHTML =
    ` <div class="trade-container">
     <img src="img/ethereum-eth-logo.svg" alt=""></div>`
   
    
 } else if (cryptoSelected === 'BNB') {
    
    tradeInfo.innerHTML =
    ` <div class="trade-container">
     <img src="img/bnb-bnb-logo.svg" alt=""></div>`

 } else if (cryptoSelected === 'AXS') {

    tradeInfo.innerHTML =
    ` <div class="trade-container">
    <img src="img/axie-infinity-axs-logo.svg" alt="">
    </div>`
    
 } else {
    tradeInfo.innerHTML =
    ` <div class="trade-container">`
 }
 
 try {
    const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
    const price = (response.DISPLAY[cryptoSelected][coinSelected].PRICE);
    const highPrice = (response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR);
    const lowPrice = (response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR);
    const variation = (response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR);
    
if (amountValue !== '') {
    const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
    coinInfo.innerHTML =
    `
    <p style=style="color: white;" class="info">El precio Actual es <span style="font-weight: bolder;  class="price">${price}</span></p>
    <p class="info">El precio mas alto es <span style="color: green;" class="highprice">${highPrice}</span></p>
    <p class="info">El precio mas bajo es <span style="color: red;" class="lowprice">${lowPrice}</span></p>
    <p class="info">Variación:<span style="font-weight: bolder;" class="variationprice">${variation}</span></p>
    <p class="info">Se pueden comprar: <span style="color: green;" class="price">${result.toFixed(4)} ${cryptoSelected}</span></p>`
    
} else {
    coinInfo.innerHTML =
    `<p class="info">El precio Actual es <span class="price">${price}</span></p>
    <p class="info">El precio mas alto es <span style="color: green;" class="highprice">${highPrice}</span></p>
    <p class="info">El precio mas bajo es <span style="color: red;" class="lowprice">${lowPrice}</span></p>
    <p class="info">Variación:<span style="font-weight: bolder;" class="variationprice"></span>${variation}</p>
    `
   
 
}

    
 
} catch (error) {
    console.log(error);
 }
}
);