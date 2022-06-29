let factor = 10;
let decimalfactor = 10;
let decimalPoint = false;
let inputValueArr = [];
const display = document.querySelector('.input');
const output = document.getElementsByClassName('result')[0];

const numButtons = document.querySelectorAll('.numbtn');
for (let numButton of numButtons) {
    const value = Number(numButton.textContent);
    numButton.addEventListener('click', () => { clickNumber(value); });
}

const operatorButtons = document.querySelectorAll('.optbtn');
for (let operatorButton of operatorButtons) {
    const value = String(operatorButton.textContent);
    operatorButton.addEventListener('click', () => { clickOperator(value); });
}

const pointButton = document.querySelector('.point');
pointButton.addEventListener('click', () => { clickPoint();});

function reset() {
    display.textContent = '';
    output.textContent = '';
    inputValueArr = [];
}

function operation(firstValue, operator, secondValue) {
    let ans;
    if (operator === '') {
        ans = secondValue;
    } else if (operator.charCodeAt() === 47) {
        ans = firstValue / secondValue;
    } else if (operator.charCodeAt() === 215) {
        ans = firstValue * secondValue;
    } else if (operator.charCodeAt() === 43) {
        ans = firstValue + secondValue;
    } else if (operator.charCodeAt() === 45) {
        ans = firstValue - secondValue;
    } else if (operator.charCodeAt() === 37) {
        ans = firstValue % secondValue;
    } else if (operator === '//') {
        rem = firstValue % secondValue;
        ans = (firstValue - rem) / secondValue;
    }
    return ans;
}

function clickNumber(value) {
    if (output.textContent !== '') {
        reset();
    }
    if (inputValueArr.length === 0) {
        inputValueArr.push(value);
    } else if (isNaN(inputValueArr[inputValueArr.length - 1])) {
        inputValueArr.push(value);
    } else {
        if (!decimalPoint) {
            inputValueArr[inputValueArr.length - 1] = (inputValueArr[inputValueArr.length - 1] * factor) + value;
        } else {
            inputValueArr[inputValueArr.length - 1] = inputValueArr[inputValueArr.length - 1] + (value / decimalfactor);
            decimalfactor = decimalfactor * 10;
        }
    }
    display.textContent = inputValueArr.join(' ');
}

function clickOperator(value) {
    decimalPoint = false;
    decimalfactor = 10;
    if (output.textContent !== '') {
        reset();
    }
    if (inputValueArr.length === 0) {
        inputValueArr.push(0);
    }
    if (value === 'C') {
        reset();
    } else if (value === '←') {
        clickBack();
    } else if (value === '=') {
        findResult();
    } else if (isNaN(inputValueArr[inputValueArr.length - 1])) {
        inputValueArr.pop();
        inputValueArr.push(value);
    } else {
        inputValueArr.push(value);
    }
    display.textContent = inputValueArr.join(' ');
}

function clickPoint() {
    decimalPoint = true;
    if (isNaN(inputValueArr[inputValueArr.length - 1])) {
        inputValueArr.push(0);
    }
    display.textContent = inputValueArr.join(' ') + '.';
}

function clickBack() {
    if (isNaN(inputValueArr[inputValueArr.length - 1])) {
        inputValueArr.pop();
    } else {
        inputValueArr[inputValueArr.length - 1] = (inputValueArr[inputValueArr.length - 1] - (inputValueArr[inputValueArr.length - 1] % factor)) / factor;
        if (inputValueArr[inputValueArr.length - 1] === 0) {
            inputValueArr.pop();
        }
    }
}

function findResult() {
    let result = 0;
    let operator = '';
    for (let nodeValue of inputValueArr) {
        if (isNaN(nodeValue)) {
            operator = nodeValue;
        } else {
            result = operation(result, operator, nodeValue);
        }
    }
    output.textContent = '=' + result.toFixed(3);
}
