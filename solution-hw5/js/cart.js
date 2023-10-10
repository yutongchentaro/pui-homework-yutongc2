//create the set for shopping cart
const shoppingCart = [];
let total = 0;
let checkout = document.getElementById("cartTotalPrice");

//four cart items
let glazingAdaption = [ 
    {option:"Original", add: 0.00}, 
    {option:"Sugar Milk", add: 0.00}, 
    {option:"Vanilla Milk", add: 0.50}, 
    {option:"Double Chocolate", add: 1.50} ];

let packsPrice = [
    {size:"1", adaption:1},
    {size:"3", adaption: 3},
    {size:"6", adaption: 5},
    {size:"12", adaption: 10} ];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null;
    }
    calcPrice() {
        let adaptedPrice = 0.00;
        let adaptedSize = 0.00;
        for (const g of glazingAdaption) {
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

let originalRoll = new Roll("Original", "Sugar Milk", "1", 2.49);
let walnutRoll = new Roll("Walnut", "Vanilla Milk", "12", 3.49);
let raisinRoll = new Roll("Raisin", "Sugar Milk", "3", 2.99);
let appleRoll = new Roll("Apple", "Original", "3", 3.49);

shoppingCart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);
//console.log(shoppingCart);




for (let i = 3; i >= 0; i--) {

    let newRoll = shoppingCart[i];
    createElement(newRoll);
    newRoll.calcPrice();
    total += newRoll.calcPrice();
}

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
}

checkout.innerText = "$" + total.toFixed(2); //changed what I assigned in the previous html









