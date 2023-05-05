console.log('Welcome')
//Data
const account1 = {
    owner: "Sushant sharma",
    firstname:"Sushant",
    Lastname:"sharma",
    username:"SS",
    accountnumber:"1678336952990",
    opendate:"02/01/2000",
    customerId:"12345A",
    accounttype:"savings",
    status: "Active",
    ifsc: "BLUE0000042",
    dob: 2000-09-22,
    pin: 1111,
    phoneNumber: 9997773056,
    movements: [300, -400, 800, 5000, -600, -130, 570, 1300],
    interestRate: 1.2,
    
}
const account2 = {
    owner: "Rohit Roy",
    movements: [-200, 850, -400, 4500, 6500, 130, 470, 1300],
    interestRate: 1.5,
    pin: 2222
}
const account3 = {
    owner: "Rahul Sina",
    movements: [5000, -450, 340, 890, -650, -300, -460, 900],
    interestRate: 1.5,
    pin: 3333
}
const account4 = {
    owner: "Amulya Dhawan",
    movements: [430, -450, 400, 1200, -250, -800, 460, 300],
    interestRate: 1.5,
    pin: 4444
}
const accounts = [account1, account2, account3, account4];

//elements seclectors
const labelWelcome = document.querySelector('.Welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovement = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');


const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan--amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//functions

const formatCurrency=function(value,locale,currency){
    return new Intl.NumberFormat(locale,{
        style:"currency",
        currency:currency,
    }).format(value)
}

const formatMovementDate = function (date){ //,locale) {
    const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date-date1)/(1000*60*60*24))

    const daysPassed=calcDaysPassed(new Date(),date)
    console.log(daysPassed)


    const day = `${date.getDate()}`.padStart(2, 0);
     const month = `${date.getMonth()}`.padStart(2, 0);
     const year = date.getFullYear();

    //     Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    // const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
         const day = `${date.getDate()}`.padStart(2, 0);
         const month = `${date.getMonth()}`.padStart(2, 0);
         const year = date.getFullYear();
         return`${day}/${month}/${year}`
        //return new Intl.DateTimeFormat(locale).format(date)
    }
}


const displayMovements = function (movements) {
    // console.log(movements)
    containerMovement.innerHTML = ''
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const date = new Date();

        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth()}`.padStart(2, 0);
        const year = date.getFullYear();
        //const labelDate = `${day}/${month}/${year}`
        const labelDate=formatMovementDate(date)


        const html = ` <div class="movement__row">
        <div class="movement__type movement__type--${type}">${i + 1} ${type}</div>
        <div class="movement__date">${labelDate}</div>
        <div class="movement__value">  ${mov} Rs</div>
    </div>`
        containerMovement.insertAdjacentHTML('afterbegin', html)

    })

}
//displayMovements(account1.movements)


const calcDisplayBalance = function (acc) {
    //let balance=acc.movements.reduce((ac,mov)=>{//(acc.balance to be used in order to update the balance of the user account )
    acc.balance = acc.movements.reduce((ac, mov) => {
        return ac + mov
    }, 0)
    //console.log("The Final BAlance is :", balance);
    labelBalance.textContent =
     `  ${acc.balance} Rs`
}
//calcDisplayBalance(account1)

const calDisplaysummary = function (acc) {
    const income = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
    console.log(income)
    labelSumIn.textContent = ` ${income} Rs `

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)

    labelSumOut.textContent = ` ${Math.abs(out)} Rs`

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate / 100))
        .filter((int, i) => {
            return int > 1
        })
        .reduce((acc, int) => acc + int, 0)
    labelSumInterest.textContent = `${interest.toFixed(2)} Rs `

}
//calDisplaysummary(account1)



const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toUpperCase()
            .split(' ')
            .map(name => name[0]).join('')
    })
}
createUsername(accounts);
console.log(accounts)
// const startLogoutTimer=function(){
//     let time=10
//    setInterval(function(){
//     labelTimer.textContent=time;
//     time--
//    },1000)
// }


const updateUI = function (acc) {
    displayMovements(acc.movements);
    calcDisplayBalance(acc);
    calDisplaysummary(acc);
}

let currentAccount;

//Event Handlers
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Login BTN Clicked");

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    console.log(currentAccount)
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log("Login Successful")
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
        const dateNow = new Date();

        const options = {
            hours: "numeric",
            minutes: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
            year: "numeric"
        }
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(dateNow)
        containerApp.style.opacity = 100;
        //   //Clear inputs for login form
        inputLoginUsername.value = inputLoginPin.value = "";
        // startLogoutTimer();
     
        // displayMovements(currentAccount.movements);
        // calcDisplayBalance(currentAccount);
        // calDisplaysummary(currentAccount);
        updateUI(currentAccount);

    }
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Transfer BTN Clicked")
    const amount = Number(inputTransferAmount.value);
    const recievrAccount = accounts.find(acc => acc.username === inputTransferTo.value)
    // console.log(recievrAccount)
    inputTransferTo.value = inputTransferAmount.value = "";
    if (amount > 0 &&
        recievrAccount &&
        currentAccount.balance > amount &&
        recievrAccount.username !== currentAccount.username) {
        // console.log("Transfer is Valid")
        currentAccount.movements.push(-amount);
        recievrAccount.movements.push(amount);
        console.log("Current Ac", currentAccount);
        console.log("Receiver Ac", recievrAccount);
        updateUI(currentAccount)


    } else {
        console.log("Low Account Balance😟")
    }
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Account Close Requested");
    if (inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin)
        {
            const index=accounts.findIndex(
                acc=>acc.username===currentAccount.username
            )
            console.log(index)
            accounts.splice(index,1)
            containerApp.style.opacity=0;
            labelWelcome.textContent="Log in to get Started"
           // console.log("Deleting Account")
        }
        inputCloseUsername.value=inputClosePin.value="";

})

