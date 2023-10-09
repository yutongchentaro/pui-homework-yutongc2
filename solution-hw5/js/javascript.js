

//product detail page
let cart = [];

const queryString = window.location.search;
//console.log(queryString);
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

}

function addtoCart() {
    let rollGlazing = glazingChoice.options[glazingChoice.selectedIndex].textContent; //*
    let packSize = packsChoice.options[packsChoice.selectedIndex].textContent;
    let currentRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    //console.log(currentRoll);
    cart.push(currentRoll);
    console.log(cart);
    
}

let addButton = document.getElementById("priceButton");
addButton.addEventListener("click", addtoCart);





