const controls = document.getElementsByClassName('btn');
const btnResult = document.getElementById('btnResult');
const btnEsc = document.getElementById('btnEsc');
const btnChangeValue = document.getElementById('btnChangeValue');
const btnUpResult = document.getElementById('btnUpResult');
const inputFirstValue = document.getElementById('firstValue');
const inputSecondValue = document.getElementById('secondValue');
const inputResultValue = document.getElementById('resultValue');
const txtOperand = document.getElementById('operand');
const calculator = document.getElementById('calculator');
const inputs = document.getElementsByTagName('input');


const controlsArray = [...controls];


//Константы сообщений об ошибках
const errInfiniti = 'бесконечность';
const errOperand = 'нет операнда!';
const errInput = 'errorValue'; //Наименование класса для input 

//Словарь эмодзи для операндов
const operandSimbol = {
    '+': '✚',
    '-': '▬',
    '*': '✖',
    '/': '/',
    '%': '%',
}

// словарь функций калькулятора

const calculate = [
    {
        operand: '+',
        result: (x, y) => {
            let tmp = x + y;
            return +tmp.toFixed(6);
        },
    },

    {
        operand: '-',
        result: (x, y) => {
            let tmp = x - y;
            return +tmp.toFixed(6);
        },
    },

    {
        operand: '*',
        result: (x, y) => {
            let tmp = x * y;
            return +tmp.toFixed(6);
        },
    },

    {
        operand: '/',
        result: (x, y) => {
            if (y !== 0) {
                let tmp = x / y;
                return +tmp.toFixed(6);
            }
            return errInfiniti;
        },
    },

    {
        operand: '%',
        result: (x, y) => {
            if (x !== 0) {
                let tmp = y * 100 / x;
                return +tmp.toFixed(6);
            }
            return errInfiniti;
        },
    },

    {
        operand: '',
        result: (x, y) => {
            return errOperand;
        },
    },
]