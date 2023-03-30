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

// 10. statistics, select elements id in span above
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expenses');


// 7. function for HTML templates and pass data
function generateTemplate(id,source,amount,time){
    return `  <li data-id-="${id}">
   
        <p>
            <span>${source}</span>
            <span id="time">${time}</span>
        </p>
        <!-- display amount -->
        RM <span>${Math.abs(amount)}</span>
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

    // 12. validation, trim - remove white spaces
    if (form.source.value.trim() === "" || form.amount.value === ""){
        return alert("Please enter the required inputs");
    }
    // 5. use & call function
    addTransaction(form.source.value.trim(),Number(form.amount.value));


    // 10.
    statistics();

    form.reset();
    

})

// 7. display existing transactions via looping, when refesh page this function will run
function getTransaction() {
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            // add income list
            incomeList.innerHTML += generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);
    
        } else {
            // add expense list
            expenseList.innerHTML += generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);
         
        }

        
    });
    
}


// 9. create function to delete
function deleteTransaction(id) {
    // trace transaction id
    // console.log(id); // check/debug in Console

    // filter and select specific id, overwrite transactions
    transactions = transactions.filter(transaction =>{
        console.log(transaction.id,id);  // check/debug 
        return transaction.id !== id;  // compare selected id with others, return ture conditions
    });

    // update storage for the list of transactions
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// 8. delete transaction using event listeners
// console delete class for delete icon
incomeList.addEventListener("click", event=>{
    if(event.target.classList.contains("delete")){
        
        // console.log(event.target);  //check in Console

        // select i tag
        event.target.parentElement.remove();
        // 9. call function to delete
        deleteTransaction(Number(event.target.parentElement.dataset.id));  // trace transaction id as Number data type

        // 10.
        statistics();

    }
})

// for expenses
expenseList.addEventListener("click", event=>{
    if(event.target.classList.contains("delete")){
        // console.log(event.target);
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));

         // 10.
         statistics();
    }
})

// 10. statistics, select elements id in span above
function statistics() {
    // calculate all incomes for positive number > 0
    // get latest list of incomes
    const updatedIncomes = transactions
                                .filter(transaction => transaction.amount > 0)  //filter only positive values
                                .reduce((total,transaction) => total += transaction.amount,0)  // arguments(callback function)
 
    // console.log(updatedIncomes);  // check

    // get latest list of incomes
    const updatedExpense = transactions
                                    .filter(transaction =>transaction.amount < 0)
                                    .reduce((total,transaction) => total += Math.abs(transaction.amount),0)  // remove negative using abs
    
    // console.log(updatedExpense);  // check

    // display values in html elements
    income.textContent = updatedIncomes;
    expenses.textContent = updatedExpense;

    // for balance
    updatedBalance = updatedIncomes - updatedExpense;
    balance.textContent = updatedBalance;



}

// call the function after refresh,
//  to solve issues on avoiding refresh page to get updated values, put this function inside addeventlistener fo addition,deletion and creating page
// statistics();

// 11. compile/bundle calling function
function init() {
    statistics();
    getTransaction();
}

init();

// 12. validation inside addeventlistener

