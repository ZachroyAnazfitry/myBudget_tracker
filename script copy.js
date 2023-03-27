/**
 * JS functionality
 * DOM elements manipulation
 * store data into Local storage (Inspect>Apllication>Storage)
 * business logic calculations in Statistics parts
 */

// get and print data into console
const form = document.querySelector('.add');
// 3. (initial)empty list for new transactions
// let transactions = [];
// (improved) conditions
let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];

// add event listener and print event into console
form.addEventListener("submit", event =>{
    event.preventDefault();
    // 2. store data,capture information
    const time = new Date();
    const transaction = {
        // 4. adding info id & timestamp
        id: Math.floor(Math.random()*10),
        // time variable
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
        // create objects
        source: form.source.value,
        amount: form.amount.value,
        

    };

    // 3. to update transaction
    transactions.push(transaction);


    // (initial)store transaction data above
    // localStorage.setItem("transaction", transaction);
    // (improved)need to convert to string for storing data in JS
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // 1. test and see in Console
    // console.log(form.source.value, form.amount.value);
})
