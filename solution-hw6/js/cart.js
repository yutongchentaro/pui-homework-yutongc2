//create the set for shopping cart
const shoppingCart = [];
let total = 0;
let checkout = document.getElementById("cartTotalPrice");


// class Roll {
//     constructor(rollType, rollGlazing, packSize, basePrice) {
//         this.type = rollType;
//         this.glazing =  rollGlazing;
//         this.size = packSize;
//         this.basePrice = basePrice;

//         this.element = null;
//     }
//     calcPrice() {
//         let adaptedPrice = 0.00;
//         let adaptedSize = 0.00;
//         for (const g of glazingAdaption) {
//             if (this.glazing == g.option) {
//                 adaptedPrice = this.basePrice + g.add;
//             }
//         }
        
//         for (const p of packsPrice) {
//             if (this.size == p.size) {
//                 adaptedSize = p.adaption;
//             }
//         }
//         const calculatedPrice = adaptedPrice * adaptedSize;
//         return(calculatedPrice);
//     }
// }

let originalRoll = new Roll("Original", "Sugar milk", "1", 2.49);
let walnutRoll = new Roll("Walnut", "Vanilla milk", "12", 3.49);
let raisinRoll = new Roll("Raisin", "Sugar milk", "3", 2.99);
let appleRoll = new Roll("Apple", "Original", "3", 3.49);

shoppingCart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);
//console.log(shoppingCart);




for (let i = shoppingCart.length - 1; i >= 0; i--) {

    let newRoll = shoppingCart[i];
    createElement(newRoll);
    newRoll.calcPrice();
    total += newRoll.calcPrice();
}



checkout.innerText = "$" + total.toFixed(2); //changed what I assigned in the previous html

let selectedGlazing = glazingChoice.options[glazingChoice.selectedIndex];
let selectedPackSize = packsChoice.options[packsChoice.selectedIndex].textContent;
//update the cart based on input







