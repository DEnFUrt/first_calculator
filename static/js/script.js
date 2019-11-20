(function () {
    const controls = document.getElementsByClassName('btn');
    const btnResult = document.getElementById('btnResult');
    const btnEsc = document.getElementById('btnEsc');
    const btnChangeValue = document.getElementById('btnChangeValue');
    const btnUpResult = document.getElementById('btnUpResult');
    const inputFirstValue = document.getElementById('firstValue');
    const inputSecondValue = document.getElementById('secondValue');
    const fieldResult = document.getElementById('result');
    const txtOperand = document.getElementById('operand');

    const errInfiniti = 'бесконечность';
    const errNumber = 'не число!';
    const errOperand = 'нет операнда!';

    let firstValue = 0;
    let secondValue = 0;
    let action = '';

    setFocus();
    

    //Чистим первую строку ввода и обнуляем переменную с ней связанную при клике мышкой

    inputFirstValue.addEventListener('click', (e) => {  
        e.currentTarget.value = '';
        firstValue = 0;
    });

    //Чистим вторую строку ввода и обнуляем переменную с ней связанную при клике мышкой

    inputSecondValue.addEventListener('click', (e) => { 
        e.currentTarget.value = '';
        secondValue = 0;
    });

    /* проверяем строку ввода первого оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    и выводим соответствующее сообщение */

    inputFirstValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0')) {
            firstValue = 0;
            e.currentTarget.value = errNumber;
        } else {
            firstValue = parseFloat(e.currentTarget.value);
        }
    });

    /* проверяем строку ввода второго оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    и выводим соответствующее сообщение */

    inputSecondValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0')) {
            secondValue = 0;
            e.currentTarget.value = errNumber;
        } else {
            secondValue = parseFloat(e.currentTarget.value);
        }
    });

    //Считаем результат, вызываем функцию чистки строк ввода оператора, передаем фокус на первую строку ввода

    btnResult.addEventListener('click', () => {
        console.log(firstValue, secondValue, action);
        if (inputFirstValue.value !== errNumber && inputSecondValue.value !== errNumber) {
            fieldResult.textContent = calculate(firstValue, secondValue, action);
            if (fieldResult.textContent !== errOperand) {
                clearValue();
            }
        }
        setFocus();
    });

        //Если нажали кнопку С вызываем функцию чистки строки ввода и результата
    
    btnEsc.addEventListener('click', () => {
        let clearResult = true;
        clearValue(clearResult);
        setFocus();
    });

    /* Если нажата кнопка -/+ меняем знак результата
    Если в строке результата не число, выходим из функции */

    btnChangeValue.addEventListener('click', () => {
        if (!Number(fieldResult.textContent)) {return};
        if (fieldResult.textContent[0] === '-') {
            fieldResult.textContent = fieldResult.textContent.replace('-', '');
        } else {
            fieldResult.textContent = `-${fieldResult.textContent}`;
        }
    });

    
    /* Если нажата кнопка стрелка вверх, то переносим результ вычисления в первую пустую строку
    или во вторую если первая занята и присваиваем результат сответствующей переменной. Если строки заняты - ничего не переносим 
    Если в строке результат не число, выходим из функции  */

    btnUpResult.addEventListener('click', () => {
        if (!Number(fieldResult.textContent)) {return};
        if (inputFirstValue.value === '' || inputFirstValue.value === '0') {
            inputFirstValue.value = fieldResult.textContent;
            firstValue = parseFloat(fieldResult.textContent);
        } else if (inputSecondValue.value === '' || inputSecondValue.value === '0') {
            inputSecondValue.value = fieldResult.textContent;
            secondValue = parseFloat(fieldResult.textContent);
        }
    });

    //Ставим фокус ввода на первую строку, если там не число то чистим строку ввода

    function setFocus () {
        if (inputFirstValue.value === errNumber) {
            inputFirstValue.value = '';
        }
        inputFirstValue.focus();
    }

    //Чистим строки ввода и переменные и экшен

    function clearValue(clearResult) { 
        if (clearResult) {
            fieldResult.textContent = '0';
        }
        inputFirstValue.value = '';
        firstValue = 0;
        inputSecondValue.value = '';
        secondValue = 0;
        txtOperand.textContent = '';
        action = '';
    }

    //Определяем какая кнопка операнда была нажата

    for (let i = 0; i < controls.length; i++) {
        const btn = controls[i];
        btn.addEventListener('click', (e) => {
            action = e.currentTarget.textContent;
            switch (action) {
                case '+': 
                    txtOperand.textContent = '➕';
                    break;

                case '-': 
                    txtOperand.textContent = '➖';
                    break;

                case '*':
                    txtOperand.textContent = '✖';
                    break;

                case '/': 
                    txtOperand.textContent = '➗';
                    break;

                case '%': 
                    txtOperand.textContent = '％';
                    break;
            } 
        });
    }

    function calculate(x, y, action) {
        switch (action) {
            case '+':
                return x + y;

            case '-':
                return x - y;

            case '*': 
                let result = x* y;
                return +result.toFixed(6);
            
            case '/':
                if (y !== 0) {
                    let result = x / y;
                    return +result.toFixed(6);
                }
                return errInfiniti;

            case '%': 
                if (x !== 0) {
                let result = y * 100 / x;
                return +result.toFixed(6);
                }
                return errInfiniti;

            default:
                return errOperand;
        }
    }
})();


// привязать нажатие кнопки ентер к = а ескейп на С

