const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const firstResult = document.querySelector('.first-result');
const secondResult = document.querySelector('.second-result');
const clearAll = document.querySelector('.clear-all');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');

var currentResult = '';
var previousResult = '';

var previousResult2 = '';

var mainResult = 0;
var operator2 = undefined;
var isResult = false;

const addNumber = (number) => {
    currentResult = currentResult.toString() + number.toString();
}

const updateResult = () => {
    firstResult.innerText = currentResult;
    secondResult.innerText = previousResult;
}

const chooseOperator = (oper) => {
    if(currentResult !== '' && previousResult !== ''){
        calculate(oper);
    }
    else if(previousResult === '' && currentResult !== ''){
        previousResult = currentResult;
        currentResult = '';
    }
    operator2 = oper;
    
}

const calculate = (oper) => {
    switch(oper){
        case '+':
            if(!isResult){
                mainResult = Number(currentResult) + Number(previousResult);
                currentResult = mainResult;
                previousResult = '';
                isResult = true;
            }
            updateResult();
        default: 
    }
}

clearAll.addEventListener('click', () => {
    isResult = false;
    currentResult = '';
    previousResult = '';
    previousResult2 = '';
    mainResult = 0;
    updateResult();
});

clear.addEventListener('click', () => {
    currentResult = currentResult.slice(0, -1);
    updateResult();
});

equal.addEventListener('click', () => {
    if(currentResult !== '' && previousResult !== ''){
        previousResult2 = currentResult;
        calculate(operator2);
        operator2 = undefined;
        isResult = false;
    }
    else if(currentResult !== '' && previousResult === ''){
        currentResult += Number(previousResult2);
        updateResult();
    }
});


numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(isResult){
            if(currentResult !== '') previousResult = currentResult;
            currentResult = '';
            isResult = false;
            updateResult();
        }
        addNumber(number.innerText);
        updateResult();
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        chooseOperator(operator.innerText);
        updateResult();
    })
});