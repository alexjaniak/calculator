let dispValue = -1;
let func = undefined;

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
eq = document.querySelector('#eq');
eq.textContent = '';

digits = document.querySelectorAll('.digit');
operators = document.querySelectorAll('.operator');
clear = document.querySelector('#clear');

// append listeners
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        input.textContent += digit.textContent;
    })
})

clear.addEventListener('click', () => {
    input.textContent = '';
    eq.textContent = '';
    dispValue = -1;
})



function calculate() {
    if (eq.textContent === '') {
        eq.textContent = input.textContent + ' * ';
        input.textContent = '';
    }
}

operators.forEach(operator => {
    switch (operator.id) {
        case 'add':
            func = add;
            break;
        case 'sub':
            func = sub;
            break;
        case 'mult':
            func = mult;
            break;
        case 'div':
            func = div;
    }
    operator.addEventListener('click', calculate);
})

