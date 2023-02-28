// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelTimer = document.querySelector(".timer");
const labelTime = document.querySelector(".time");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");


const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Dummy Data
const account1 = {
  owner: "Popescu Ion",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: "Maria Andreea",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const account3 = {
  owner: "Marius Bogdan",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
};

const account4 = {
  owner: "Irina Catalina",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// display the deposits/withdrawal of users
const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = "";

  // sort the movements
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;
  console.log(sort);

  sortedMovements.forEach((move, index) => {
    // console.log(index, move);
    const typeOfAction = move > 0 ? "deposit" : "withdrawal";
    const div = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${typeOfAction}">${
      index + 1
    } ${typeOfAction}</div>
      <div class="movements__value">${move}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", div);
  });
};
// displayMovements(account1.movements);

// add event listener to sort btn
let sortbtn = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(123)
  displayMovements(userAuth.movements, !sortbtn);
  sortbtn = !sortbtn;
});

// create a string with the initials of owners that servers as username for login
const createUserName = (acc) => {
  acc.forEach((item) => {
    item.username = item.owner
      .toLowerCase()
      .split(" ")
      .map((name) => {
        return name[0];
      })
      .join("");
  });
};
createUserName(accounts);

// calculate and display the balance of accounts
const calculateAccountBalance = (acc) => {
  const printBalance = acc.movements.reduce((acc, total) => {
    return acc + total;
  }, 0);
  acc.balance = printBalance;
  // console.log(printBalance)
  labelBalance.textContent = acc.balance + " " + "EUR";
};
// calculateAccountBalance(account1.movements);

// calculate and display the total income
const calcDisplayIncomes = (movements) => {
  const incomes = movements.filter((item) => {
    return item > 0;
  });

  const incomeTotal = incomes.reduce((acc, total) => {
    return acc + total;
  }, 0);
  // console.log(incomeTotal)
  labelSumIn.textContent = incomeTotal + " " + "EUR";
};
// calcDisplayIncomes(account1.movements);

// calculate and display the total outgoings
const calcDisplayOutgoings = (movements) => {
  const outgoings = movements.filter((item) => {
    return item < 0;
  });

  const outgoingsTotal = outgoings.reduce((acc, total) => {
    return acc + total;
  }, 0);
  // console.log(incomeTotal)
  labelSumOut.textContent = Math.abs(outgoingsTotal) + " " + "EUR";
};
// calcDisplayOutgoings(account1.movements);

let userAuth;
const locale = navigator.language;
console.log(locale);
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(1234)

  // get current time and date
  let today = new Date();
  let time = new Date();
  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  // console.log(today.toLocaleDateString('ro-RO', optionsDate))
  // console.log(time.toLocaleTimeString())

  // check if the user input and dummy data matches
  userAuth = accounts.find((item) => {
    return item.username === inputLoginUsername.value.toLowerCase().trim();
  });
  // console.log(userAuth)

  // check if pin from user and pin from dummy data matches
  if (userAuth && userAuth.pin === Number(inputLoginPin.value)) {
    // console.log('it worked')
    containerApp.classList.add("show");
    labelWelcome.textContent = `Welcome back ${userAuth.owner}`;
    calcDisplayIncomes(userAuth.movements);
    calcDisplayOutgoings(userAuth.movements);
    calculateAccountBalance(userAuth);
    displayMovements(userAuth.movements);
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    labelDate.textContent = today.toLocaleDateString(locale, optionsDate);
    labelTime.textContent = time.toLocaleTimeString();
  } else {
    console.log("no good amigo");
  }

  // just for fun, example of the remainder operator
  [...document.querySelectorAll(".movements__row")].forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = "#D0D0D0";
    }
  });
});

// request loan button
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(123)
  let inputUserLoan = Number(Math.floor(inputLoanAmount.value));
  // console.log(inputUserLoan)
  if (inputUserLoan > 0 && inputUserLoan < 1000) {
    // console.log('it works')
    setTimeout(() => {
      userAuth.movements.push(inputUserLoan);
      calcDisplayIncomes(userAuth.movements);
      calculateAccountBalance(userAuth);
      displayMovements(userAuth.movements);
      [...document.querySelectorAll(".movements__row")].forEach(
        (row, index) => {
          if (index % 2 === 0) {
            row.style.backgroundColor = "#D0D0D0";
          }
        }
      );
    }, 3000);
  } else {
    console.log("loan must be between 1 and 999");
  }

  inputLoanAmount.value = "";
});



// transfer money to other accounts
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(userAuth)

  const personToReceiveTheMoney = inputTransferTo.value.toLowerCase().trim();
  const ammountOfMoneyToSend = Number(inputTransferAmount.value);
  // console.log(personToReceiveTheMoney, ammountOfMoneyToSend)

  const accountToReceiveMoney = accounts.find((person) => {
    return person.username === personToReceiveTheMoney;
  });

  // console.log(accountToReceiveMoney)

  if (
    ammountOfMoneyToSend > 0 &&
    userAuth.username !== accountToReceiveMoney &&
    userAuth.balance >= 0
  ) {
    console.log("it works");
    userAuth.movements.push(-ammountOfMoneyToSend);
    accountToReceiveMoney.movements.push(ammountOfMoneyToSend);

    // update the UI again once the tranfer is complete;
    calcDisplayOutgoings(userAuth.movements);
    calculateAccountBalance(userAuth);
    displayMovements(userAuth.movements);

    // reset input fields
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
  } else {
    console.log("transfer is not valid");
  }
});

// close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(123)
  let userNameDeleteInput = inputCloseUsername.value.toLowerCase();
  let userPinDeleteInput = Number(inputClosePin.value);

  // console.log('userName :', userNameDeleteInput, "pin:", userPinDeleteInput)
  if (
    userNameDeleteInput === userAuth.username &&
    userPinDeleteInput === userAuth.pin
  ) {
    // console.log('it s a match')
    const indexAcc = accounts.findIndex((acc) => {
      return acc.username === userAuth.username;
    });
    console.log(indexAcc);
    // delete account and hide UI
    accounts.splice(indexAcc, 1);
    containerApp.classList.remove("show");
    labelWelcome.textContent = "Log in to get started";
  } else {
    // console.log('not a match')
  }
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});
