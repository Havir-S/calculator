/* WORK VALUES */
let currentValue = "";
let officialValue = "";
let historyValue = "";
let actionHistoryDiv = document.getElementsByClassName('action-history')[0];
let currentValueDiv = document.getElementsByClassName('current-outcome')[0];


/* basic functions */

function add(x,y) {
  console.log('i was used');
  return Number(x) + Number(y);
}

function subtract(x,y) {
  return Number(x) - Number(y);
}

function multiply(x,y) {
  return Number(x) * Number(y);
}

function divide(x,y) {
  return Number(x) / Number(y);
}

function modulo(x,y) {
  return Number(x) % Number(y);
}

/* operate function */

function operate(operator, x, y) {
  return operator(x,y);
}


/* OPERATIONS FUNCTION */

function operations(arr) {
  var official = [];
  var k = 0;
  var whatDo = arr.filter(el => {
    if (arr.indexOf(el) % 2 == 1) {return true;}
  });
  var numbers = arr.filter(el => {
    if (arr.indexOf(el) % 2 == 0) {return true;}
  });
  for (; k < whatDo.length; k++) {
    var result;
    switch (whatDo[k]) {
      case '÷':
      result = operate(divide,numbers[0],numbers[1]);
      break;
      case '×':
      result = operate(multiply,numbers[0],numbers[1]);
      break;
      case '+':
      result = operate(add,numbers[0],numbers[1]);
      break;
      case '-':
      result = operate(subtract,numbers[0],numbers[1]);
      break;
      case '%':
      result = operate(modulo,numbers[0],numbers[1]);
      break;
      default:
      break;
    }
    numbers.shift();
    numbers.shift();
    official.push(result);
    console.log(official);
  }
}

/* KEYPRESS EVENT */

const acceptableValues = ["0","1","2","3","4","5","6","7","8","9",".","+","/",
                          "%","*","-", "+/-","×",'÷','Enter','='];
const factors = [".","+","/","%","×","-","×",'÷'];
const finishers = ["=", 'Enter'];

document.addEventListener('keydown', function(e) {
  if (e.key == 'Backspace') {
    currentValue = currentValue.substr(0,currentValue.length-1);
    officialValue = currentValue;
    currentValueDiv.innerHTML = officialValue;
  }
  if (acceptableValues.includes(e.key)) {
    //IF ENTER OR EQUALS
    if (e.key == "=" && !currentValue || e.key == "Enter" && !currentValue) {
      console.log('YIkes, nie mam co dodac');
      return;
    } else if (e.key == "=" && currentValue || e.key == 'Enter' && currentValue) {
      console.log(currentValue);
      if(currentValue.split(' ').length <= 1) {
        console.log('wtf');
        return;
      } else {
        currentValue = currentValue.replace('/','÷').replace('*','×').split(/\s/);
        console.log(currentValue);
        currentValue = currentValue.filter((el) => {
          return Boolean(el);
        });
          // ALL LOGIC STARTS HERE

        currentValue = operations(currentValue);





      }
    }

    // ADDING NEW VALUE TO THE STRING
    if (factors.includes(currentValue[currentValue.length-1]) && factors.includes(e.key)) {
      console.log('no more adding');
    } else if(factors.includes(e.key) && e.key != '.') {
      currentValue += " " + e.key + " ";
    } else {
      currentValue += e.key;
    }
    officialValue = currentValue;
    currentValueDiv.innerHTML = officialValue;
  }
});

/* BUTTON PRESS EVENTS */

let buttons = document.getElementsByTagName('button');
let i = 0;

for (; i< buttons.length; i++) {
  buttons[i].addEventListener('click', buttonFunctionality);
}

function buttonFunctionality(event) {
  if (this.innerHTML == '&lt;-') {
    console.log('click');
    currentValue = currentValue.substr(0,currentValue.length-1);
    officialValue = currentValue;
    currentValueDiv.innerHTML = officialValue;
  }
  if (this.innerHTML == 'AC') {
    currentValue = "";
    officialValue = currentValue;
    currentValueDiv.innerHTML = officialValue;
  }
  if (acceptableValues.includes(this.innerHTML)) {
    //IF ENTER OR EQUALS
    if (this.innerHTML == "=" && !currentValue || this.innerHTML == "Enter" && !currentValue) {
      console.log('YIkes, nie mam co dodac');
      return;
    } else if (this.innerHTML == "=" && currentValue) {
      if(currentValue.split(' ').length <= 1) {return;} else {
        currentValue = currentValue.replace(' ', '').split(/\D/);
        console.log(currentValue);
        currentValue = currentValue.filter((el) => {
          return Boolean(el);
        });
        console.log(currentValue);
          // ALL LOGIC STARTS HERE








      }
    }

    // ADDING NEW VALUE TO THE STRING
    if(factors.includes(this.innerHTML) && this.innerHTML != '.') {
      currentValue += " " + this.innerHTML + " ";
    } else {
      currentValue += this.innerHTML;
    }
    officialValue = currentValue;
    currentValueDiv.innerHTML = officialValue;
  }
}
