const controls = document.getElementsByClassName('btn');
const btnResult = document.getElementById('btnResult');
const btnEsc = document.getElementById('btnEsc');
const btnChangeValue = document.getElementById('btnChangeValue');
const btnUpResult = document.getElementById('btnUpResult');
const inputFirstValue = document.getElementById('firstValue');
const inputSecondValue = document.getElementById('secondValue');
const fieldResult = document.getElementById('result');
const txtOperand = document.getElementById('operand');
const calculator = document.getElementById('calculator');


const controlsArray = [...controls];


//Константы сообщений об ошибках
const errInfiniti = 'бесконечность';
const errNumber = 'не число!';
const errOperand = 'нет операнда!';
const errInput = 'errorValue'; //Наименование класса для input 

//Словарь соответствия кодов клавиатуры тексту на клавишах калькулятора 
const keyCodes = {
    'Enter': '=',
    'Escape': 'C',
    '+': '+',
    '/': '/',
    '*': '*',
    '-': '-',
}

//Словарь эмодзи для операндов
const operandSimbol = {
    '+': '✚',
    '-': '▬',
    '*': '✖',
    '/': '/',
    '%': '%',
}



const calculate_ = {
    addition: {
        operand: '+',
        result: (x, y) => {
            return x + y
        },
    },

    subtraction: {
        operand: '-',
        result: (x, y) => {
            return x - y
        },
    },

    multiplication: {
        operand: '*',
        result: (x, y) => {
            let tmp = x * y;
            return +tmp.toFixed(6);
        },
    },

    division: {
        operand: '/',
        result: (x, y) => {
            if (y !== 0) {
                let tmp = x / y;
                return +tmp.toFixed(6);
            }
            return errInfiniti;
        },
    },

    percent: {
        operand: '%',
        result: (x, y) => {
            if (x !== 0) {
                let tmp = y * 100 / x;
                return +tmp.toFixed(6);
            }
            return errInfiniti;
        },
    },

    notOperand: {
        operand: '',
        result: (x, y) => {
            return errOperand;
        },
    },
}