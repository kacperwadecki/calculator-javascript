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
var operator2 = '';
var isResult = false;
var isClear = true;
var isZero = false;
var flaga = true;

const addNumber = (number) => {
    if(number === '.' || currentResult == ''){
        if(currentResult.toString().includes('.')){
            return;
        }
    }
    currentResult = currentResult.toString() + number.toString();
}

const updateResult = () => {
    firstResult.innerText = currentResult;
    secondResult.innerText = previousResult;
    if(previousResult !== '' && operator2 != '%' && operator2 != '^' && operator2 != '√'&& operator2 != 'NEG'){
        secondResult.innerText = previousResult + operator2;
    }
}

const chooseOperator = (oper) => {
    if(currentResult !== '' && previousResult !== ''){
        calculate(oper);
        if(oper !== 'NEG' && oper !== '%'){
            operator2 = oper;
        }
    }
    else if((previousResult === '' && currentResult !== '' && oper === '√') || (previousResult === '' && currentResult !== '' && oper === '^') || (previousResult === '' && currentResult !== '' && oper === '%') || (previousResult === '' && currentResult !== '' && oper === 'NEG')){
        calculate(oper);
        isResult = true;
        if(oper !== 'NEG' && oper !== '%'){
            operator2 = oper;
        }
    }
    else if(previousResult === '' && currentResult !== ''){
        previousResult = currentResult;
        currentResult = '';
        if(oper !== 'NEG' && oper !== '%'){
            operator2 = oper;
        }
    }
    else if(previousResult !== '' && currentResult ===''){
        if(oper !== 'NEG' && oper !== '%'){
            operator2 = oper;
        }
    }
    
}

const calculate = (oper) => {
    switch(oper){
        case '+':
            if(!isResult){
                if(flaga){
                    mainResult = Number(currentResult) + Number(previousResult);
                    previousResult2 = currentResult;
                    previousResult = '';
                }
                else{
                    mainResult = Number(currentResult) + Number(previousResult2);
                }
                currentResult = mainResult;
                isResult = true;
            }
            updateResult();
            break;
        case '-':
            if(!isResult){
                if(flaga){
                    mainResult = Number(previousResult) - Number(currentResult);
                    previousResult2 = currentResult;
                    previousResult = '';
                }
                else{
                    mainResult = Number(currentResult) - Number(previousResult2);
                }
                currentResult = mainResult;
                isResult = true;
            }
            updateResult();
            break;
        case '*':
            if(!isResult){
                if(flaga){
                    mainResult = Number(currentResult) * Number(previousResult);
                    previousResult2 = currentResult;
                    previousResult = '';
                }
                else{
                    mainResult = Number(currentResult) * Number(previousResult2);
                }
                currentResult = mainResult;
                isResult = true;
            }
            updateResult();
            break;
        case '/':
            if(!isResult){
                if(currentResult == '0' || previousResult2 == '0'){
                    mainResult = "Nie dziel przez zero!";
                    currentResult = mainResult;
                    updateResult();
                    isResult = false;
                    isClear = true;
                    currentResult = '0';
                    previousResult = '';
                    previousResult2 = '';
                    mainResult = 0;
                    operator2 = '';
                    return;
                }
                else{
                    if(flaga){
                        mainResult = Number(previousResult) / Number(currentResult);
                        previousResult2 = currentResult;
                        previousResult = '';
                    }
                    else{
                        mainResult = Number(currentResult) / Number(previousResult2);
                    }
                }
                currentResult = mainResult;
                isResult = true;
            }
            updateResult();
            break;
        case '√':
                mainResult = Math.sqrt(Number(currentResult));
                currentResult = mainResult;
                previousResult = '';
                isResult = true;
            updateResult();
            break;
        case '^':
                mainResult = Math.pow(Number(currentResult), 2);
                currentResult = mainResult;
                previousResult = '';
                isResult = true;
            updateResult();
            break;
        case '%':
                mainResult = currentResult * 0.01;
                currentResult = mainResult;
            updateResult();
            break;
        case 'NEG':
                mainResult = currentResult * -1;
                currentResult = mainResult;
            updateResult();
            break;
        default: 
    }
}

clearAll.addEventListener('click', () => {
    isResult = false;
    isClear = true;
    currentResult = '0';
    previousResult = '';
    previousResult2 = '';
    mainResult = 0;
    operator2 = '';
    updateResult();
});

clear.addEventListener('click', () => {
    currentResult = currentResult.toString().slice(0, -1);
    if(currentResult.length === 0 && previousResult === '') {
        currentResult = '0';
        isClear = true;
    }
    else if(currentResult.length === 0 && previousResult !== '') {
        isZero = true;
        currentResult = '0';
    }
    updateResult();
});

equal.addEventListener('click', () => {
    if(currentResult !== '' && previousResult !== ''){
        flaga = true;
        calculate(operator2);
        isResult = false;
    }
    else if(currentResult !== '' && previousResult === ''){
        isResult = false;
        flaga = false;
        calculate(operator2);
    }
    if(currentResult == '0'){
        isResult = true;
    }
});


numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(isZero){
            isZero = false;
            currentResult = '';
        }
        else if(isResult || isClear){
            if(currentResult !== '' && currentResult != '0') previousResult = currentResult;
            currentResult = '';
            if(isClear){
                previousResult = ''; 
            }
            isResult = false;
            isClear = false;
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