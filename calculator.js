const MAXINPUT = 10;
let leftInput = null; 
let rightInput = null; 
let currOperator = null; 
let isResult = false;

// operators
const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;

function operate(a, b, operation) {
    return operation(a, b);
}


// nodes
input = document.querySelector('#input');
input.textContent = '';

digits = document.querySelectorAll('.digit');
operators = document.querySelectorAll('.operator');
clear = document.querySelector('#clear');
equal = document.querySelector('#equal');
percent = document.querySelector('#perc'); 


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

function roundValue(val) {
    if(val.toString().length <= MAXINPUT) return val;
}

function evaluate() {
    console.log(currOperator,leftInput, rightInput);
    if (leftInput == null || currOperator == null) return; 
    if (leftInput != null && rightInput == null) rightInput = leftInput; 
    output = operate(leftInput, rightInput, currOperator);
    input.textContent = output.toString();
    console.log(output);
    leftInput = output; 
    rightInput = null;
    currOperator = null; 
    isResult = true;
}


// append listeners
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        console.log(currOperator,leftInput, rightInput);
        if (input.textContent.length > MAXINPUT) { // check for maximum length
            return;
        } 

        if (currOperator == null) {
            if (isResult) { // clear input box if input after result
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
    value = parseFloat(input.textContent);
    newValue = value*0.01
    input.textContent = newValue.toString();
    if (currOperator == null) leftInput = newValue;
    else rightInput = newValue;
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (leftInput == null) return; 
        newOperator = matchOperator(operator.id)
        if (newOperator == currOperator) {
            evaluate();
            return;
        } else currOperator = newOperator;

        if (rightInput != null) evaluate();
    });
})


