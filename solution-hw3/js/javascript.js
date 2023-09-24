
let basePrice = 2.49;

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
    let priceChange = parseFloat(glazingChoice.value);
    let addCost = basePrice + priceChange;
    let packsChange = parseFloat(packsChoice.value);
    let finalPrice = addCost * packsChange;
    //textContent or innerHTML?
    document.getElementById("totalPrice").textContent = "$" + finalPrice.toFixed(2);
}

calculate();


