const MAXINPUT = 10;
let leftInput = null; 
let rightInput = null; 
let currOperator = null; 
let isResult = false;
let isError = false;
let activeButton = null;

// operators
const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;

function operate(a, b, operation) {
    return operation(a, b);
}

// nodes
let input = document.querySelector('#input');
input.textContent = '';

let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let clear = document.querySelector('#clear');
let equal = document.querySelector('#equal');
let percent = document.querySelector('#perc'); 
let negate = document.querySelector('#negate');

function matchOperator(id) {
    switch (id) {
        case 'add':
            return add;
        case 'sub':
            return sub;
        case 'mult':
            return mult;
        case 'div':
            return div; 
    }
}

function activate(button) {
    if (button == null) return;
    if (button.classList.contains("active")) {
        button.classList.remove("active");
        activeButton = null;
      } else {
        button.classList.add("active");
        activeButton = button;
      }
}

function roundValue(val) {
    if(val.toString().length <= MAXINPUT) return val;
    let newVal = val.toPrecision(MAXINPUT)
    if (newVal.toString().length > MAXINPUT) {
        newVal = val.toPrecision(MAXINPUT-(newVal.toString().length-MAXINPUT));
    }
    return newVal;
}

function evaluate() {
    console.log(currOperator,leftInput, rightInput);
    if (leftInput == null || currOperator == null) return; 
    if (leftInput != null && rightInput == null) rightInput = leftInput; 
    if (currOperator == div && rightInput == 0) {
        input.textContent = "DIV ERROR";
        leftInput = null;
    } else {
        let output = roundValue(operate(leftInput, rightInput, currOperator));
        input.textContent = output.toString();
        console.log(output);
        leftInput = output; 
    }
    rightInput = null;
    currOperator = null; 
    isResult = true;
    activate(activeButton);
}


// append listeners
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        console.log(currOperator,leftInput, rightInput);
        if (input.textContent.length > MAXINPUT) return;// check for maximum length

        if (currOperator == null) {
            if (isResult || isError) { // clear input box if input after result
                input.textContent = '';
                isResult = false;
            }
            if (digit.textContent == '.') { // check for double decimals
                if (input.textContent.includes('.')) return; 
            }
            input.textContent += digit.textContent;
            leftInput = parseFloat(input.textContent)
        } else {
            if (rightInput == null) { // clear input box if second second argument
                input.textContent = '';
            }
            if (digit.textContent == '.') { // check for double decimals
                if (input.textContent.includes('.')) return; 
            }
            input.textContent += digit.textContent;
            rightInput = parseFloat(input.textContent);
        }
        
    })
})

clear.addEventListener('click', () => {
    input.textContent = '';
    leftInput = null; 
    rightInput = null; 
    currOperator = null; 
})

equal.addEventListener('click', evaluate);

percent.addEventListener('click', () =>{
    if (input.textContent.length == 0) return;
    let value = parseFloat(input.textContent);
    let newValue = roundValue(value*0.01)
    input.textContent = newValue.toString();
    if (currOperator == null) leftInput = newValue;
    else rightInput = newValue;
})

negate.addEventListener('click', () => {
    if (input.textContent.length == 0) return;
    let value = parseFloat(input.textContent);
    let newValue = roundValue(value*-1);
    input.textContent = newValue.toString();
    if (currOperator == null) leftInput = newValue;
    else rightInput = newValue;
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (leftInput == null) return;
        let newOperator = matchOperator(operator.id)
        if (newOperator == currOperator) {
            evaluate();
            return;
        } else {
            currOperator = newOperator;
            activate(activeButton);
            activate(operator); 
        }

        if (rightInput != null) evaluate();
    });
})


