

//product detail page
let cart = [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");
console.log(rollType);


let eachImg = rolls[rollType]["imageFile"];
console.log(eachImg);

const headerElement = document.querySelector("#detailTitle");
headerElement.innerText = rollType + " Cinnamon Roll";

const rollImage = document.querySelector("#imgDetail");
rollImage.src = "../assets/products/" + eachImg;
console.log(rollImage.src);

rollImage.alt = rollType + " Cinnamon Roll";




let basePrice = rolls[rollType]["basePrice"];

let glazingChoice = document.querySelector("#glazin");
let packsChoice = document.querySelector("#packs");



//console.log(glazingChoice);

let glazingPrice = [ 
    {option:"Keep original", add: 0.00}, 
    {option:"Sugar milk", add: 0.00}, 
    {option:"Vanilla milk", add: 0.50}, 
    {option:"Double chocolate", add: 1.50} ];

let packsPrice = [
    {size:"1", adaption:1},
    {size:"3", adaption: 3},
    {size:"6", adaption: 5},
    {size:"12", adaption: 10} ];

//create option for glazing dropdown in html doc
for (g of glazingPrice) {
    let glazingOption = document.createElement("option");
    glazingOption.value = g.add.toFixed(2); 
    glazingOption.textContent = g.option;
    glazingChoice.appendChild(glazingOption);   
}

//create option for packs dropdown in html doc
for (p of packsPrice) {
    let packsOption = document.createElement("option");
    packsOption.value = p.adaption;
    packsOption.textContent = p.size;
    packsChoice.appendChild(packsOption);
}


//parseFloat
function calculate() {
    let priceChange = parseFloat(glazingChoice.options[glazingChoice.selectedIndex].value);
    let packsChange = parseFloat(packsChoice.options[packsChoice.selectedIndex].value);
    let addCost = basePrice + priceChange;
    //console.log(addCost);
    //console.log(packsChange);

    let finalPrice = addCost * packsChange;
    //textContent or innerHTML?
    document.getElementById("totalPrice").textContent = "$" + finalPrice.toFixed(2);
}

calculate();

//class for cart array
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }

    calcPrice() {
        let adaptedPrice = 0.00;
        let adaptedSize = 0.00;
        for (const g of glazingPrice) {
            if (this.glazing == g.option) {
                adaptedPrice = this.basePrice + g.add;
            }
        }
        
        for (const p of packsPrice) {
            if (this.size == p.size) {
                adaptedSize = p.adaption;
            }
        }
        const calculatedPrice = adaptedPrice * adaptedSize;
        return(calculatedPrice);
    }

}

function addtoCart() {
    let rollGlazing = glazingChoice.options[glazingChoice.selectedIndex].textContent; //*
    let packSize = packsChoice.options[packsChoice.selectedIndex].textContent;
    let currentRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    //console.log(currentRoll);
    cart.push(currentRoll);
    console.log(cart);
    saveToLocalStorage();
}

let addButton = document.getElementById("priceButton");
addButton.addEventListener("click", addtoCart);

function createElement(newRoll) {
    const template = document.querySelector("#roll-template");
    const templateRoll = template.content;
    const clone = templateRoll.cloneNode(true);

    newRoll.element = clone.querySelector(".cart_item");

    const rollDelete = newRoll.element.querySelector(".remove");
    rollDelete.addEventListener('click', () => {
        deleteRoll(newRoll);
    });

    const shoppingCartListElement = document.querySelector(".shoppingCart");
    shoppingCartListElement.prepend(newRoll.element);

    updateElement(newRoll);



}

function updateElement(newRoll) {
    const rollTypeElement = newRoll.element.querySelector(".rollName");
    const rollGlazingElement = newRoll.element.querySelector(".rollGlazing");
    const rollPackElement = newRoll.element.querySelector(".rollPack");
    const rollPriceElement = newRoll.element.querySelector(".cart_price");
    const rollImageElement = newRoll.element.querySelector(".rollImage");

    let rollImage = rolls[newRoll.type]["imageFile"];
    let calculatedPrice;
    rollImageElement.src = "../assets/products/" + rollImage;
    rollTypeElement.innerText = newRoll.type + " Cinnamon Roll";
    rollGlazingElement.innerText = newRoll.glazing;
    rollPackElement.innerText = "Pack Size: " + newRoll.size;
    rollPriceElement.innerText = "$" + parseFloat(newRoll.calcPrice()).toFixed(2);
    


}

function deleteRoll(newRoll) {
    let rollIndex = shoppingCart.indexOf(newRoll);
    if (rollIndex !== -1) {
        shoppingCart.splice(rollIndex, 1) //from array
    }
    newRoll.element.remove(); //from HTML
    total = total - newRoll.calcPrice(); 
    checkout.innerText = "$" + total.toFixed(2);
    saveToLocalStorage();
}


function saveToLocalStorage() {
    const rollCart = cart;
    console.log(rollCart);
    
    const rollCartString = JSON.stringify(rollCart);
    console.log(rollCartString);
  
    localStorage.setItem('storedRolls', rollCartString);
  }

  function retrieveFromLocalStorage() {
    const rollCartString = localStorage.getItem('storedRolls');
    const rollCart = JSON.parse(rollCartString);
    for (const rollData of rollCart) {
        console.log(rollData.basePrice);
        const storeRoll = new Roll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        createElement(storeRoll);
    }
  }
  
  if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
  }