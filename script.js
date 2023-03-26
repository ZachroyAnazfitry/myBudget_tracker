/**
 * JS functionality
 * DOM elements manipulation
 * store data into Local storage (Inspect>Apllication>Storage)
 * business logic calculations in Statistics parts
 */

// get and print data into console
const form = document.querySelector('.add');

// add event listener and print event into console
form.addEventListener("submit", event =>{
    event.preventDefault();
    // 2. store data
    const transaction = {
        // create objects
        source: form.source.value,
        amount: form.amount.value,
    };

    // store transaction data above
    // localStorage.setItem("transaction", transaction);

    // need to convert to string for storing db in JS
    localStorage.setItem("transaction", JSON.stringify(transaction));

    // to store multiple objects





    // 1. test and see in Console
    // console.log(form.source.value, form.amount.value);
})
