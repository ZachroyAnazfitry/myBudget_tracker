/**
 * JS functionality
 * DOM elements manipulation
 * store data into Local storage (Inspect>Apllication>Storage)
 * business logic calculations in Statistics parts
 */

// get and print data into console
const form = document.querySelector('.add');
// (improved) conditions
let transactions = localStorage.getItem("transactions") !== null ? JSON.parse(localStorage.getItem("transactions")) : [];

// 6. capture DOM elements 
const incomeList = document.querySelector('ul.income-list');
const expenseList = document.querySelector('ul.expense-list');

// 7. function for HTML templates and pass data
function generateTemplate(id,source,amount,time){
    return `  <li data-id-="${id}">
   
        <p>
            <span>${source}</span>
            <span id="time">${time}</span>
        </p>
        <!-- display amount -->
        $<span>${Math.abs(amount)}</span>
        <!-- delete icon from Bootstrap -->
        <i class="bi bi-trash delete"></i>

    </li>`;
}

// 6. new function to pass data
function addTransactionDOM(id,source,amount,time) {
    // add 4 DOM elements
    if (amount > 0) {
        // add income list
        incomeList.innerHTML += generateTemplate(id,source,amount,time);

    } else {
        // add expense list
        expenseList.innerHTML += generateTemplate(id,source,amount,time);
     
    }

}

// use function to optimize the code
function addTransaction(source, amount) {
    // 2. store data,capture information
    const time = new Date();
    const transaction = {
        // 4. adding info id & timestamp
        id: Math.floor(Math.random()*10),
        // time variable
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
        source,
        amount,
    };

    // 3. to update transaction
    transactions.push(transaction);

    // (improved)need to convert to string for storing data in JS
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // call the new function and passing information
    addTransactionDOM(transaction.id,source,amount,transaction.time);
    
}

// add event listener and print event into console
form.addEventListener("submit", event =>{
    event.preventDefault();
    // 5. use & call function
    addTransaction(form.source.value,form.amount.value);
    form.reset();
    

})
