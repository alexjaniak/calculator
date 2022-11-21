leftInput = null; 
rightInput = null; 
currOperator = null; 
isResult = false;

// operators
const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;

function operate(a, b, operation) {
    return operation(a, b);
}

input = document.querySelector('#input');
input.textContent = '';

digits = document.querySelectorAll('.digit');
operators = document.querySelectorAll('.operator');
clear = document.querySelector('#clear');
equal = document.querySelector('#equal');
percent = document.querySelector('#perc'); 

// append listeners
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        console.log(currOperator,leftInput, rightInput);
        if (currOperator == null) {
            if (isResult) {
                input.textContent = '';
                isResult = false;
            }
            input.textContent += digit.textContent;
            leftInput = parseFloat(input.textContent)
        } else {
            if (rightInput == null) {
                input.textContent = '';
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

equal.addEventListener('click', evaluate);

percent.addEventListener('click', () =>{
    value = parseFloat(input.textContent);
    newValue = value*0.01
    input.textContent = newValue.toString();
    if (currOperator == null) leftInput = newValue;
    else rightInput = newValue;
})

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

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (leftInput == null) return; 
        currOperator = matchOperator(operator.id)
        if (rightInput != null) evaluate();
    });
})


