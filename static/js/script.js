(function () {
    const controls = document.getElementsByClassName('btn');
    const btnResult = document.getElementById('btnResult');
    const btnPercent = document.getElementById('btnPercent');
    const btnEsc = document.getElementById('btnEsc');
    const btnChangeValue = document.getElementById('btnChangeValue');
    const btnUpResult = document.getElementById('btnUpResult');
    const inputFirstValue = document.getElementById('firstValue');
    const inputSecondValue = document.getElementById('secondValue');
    const fieldResult = document.getElementById('result');
    const txtOperand = document.getElementById('operand');

    let firstValue = 0;
    let secondValue = 0;
    let action = '';

    setFocus();
    

    //Чистим строку ввода и переменную с ней связанную при клике мышкой
    inputFirstValue.addEventListener('click', (e) => {  
        e.currentTarget.value = '';
        firstValue = 0;
    });

    //Чистим строку ввода и переменную с ней связанную при клике мышкой
    inputSecondValue.addEventListener('click', (e) => { 
        e.currentTarget.value = '';
        secondValue = 0;
    });

    //проверяем строку ввода первого оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    inputFirstValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0')) {
            // && e.currentTarget.value !== '-')) {
            firstValue = 0;
            e.currentTarget.value = 'не число!';
        } else {
            firstValue = parseFloat(e.currentTarget.value);
        }
    });

    ////проверяем строку ввода второго оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    inputSecondValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0')) {
            secondValue = 0;
            e.currentTarget.value = 'не число!';
        } else {
            secondValue = parseFloat(e.currentTarget.value);
        }
    });

    //Считаем результат, вызываем функцию чистки строк ввода оператора, передаем фокус на первую строку ввода
    btnResult.addEventListener('click', () => {
        console.log(firstValue, secondValue, action);
        if (inputFirstValue.value !== 'не число!' && inputSecondValue.value !== 'не число!') {
            fieldResult.innerHTML = calculate(firstValue, secondValue, action);
            if (fieldResult.textContent !== 'нет операнда!') {
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

    //Если нажата кнопка -/+ меняем знак результата
    btnChangeValue.addEventListener('click', () => {
        if (fieldResult.textContent[0] === '-') {
            fieldResult.textContent = fieldResult.textContent.replace('-', '');
        } else {
            fieldResult.textContent = `-${fieldResult.textContent}`;
        }
    });

    btnUpResult.addEventListener('click', () => {
        if (inputFirstValue.value === '' || inputFirstValue.value === '0') {
            inputFirstValue.value = fieldResult.textContent;
            firstValue = parseFloat(fieldResult.textContent);
        } else if (inputSecondValue.value === '' || inputSecondValue.value === '0') {
            inputSecondValue.value = fieldResult.textContent;
            secondValue = parseFloat(fieldResult.textContent);
        }
    });

    //Ставим фокус ввода на первую строку
    function setFocus () {
        if (inputFirstValue.value === 'не число!') {
            inputFirstValue.value = '';
        }
        inputFirstValue.focus();
    }

    //Чистим строки ввода и переменные
    function clearValue(clearResult) { 
        if (clearResult) {
            fieldResult.innerHTML = '0';
        }
        inputFirstValue.value = '';
        firstValue = 0;
        inputSecondValue.value = '';
        secondValue = 0;
        action = '';
    }

    //Определяем какая кнопка операнда была нажата
    for (let i = 0; i < controls.length; i++) {
        const btn = controls[i];
        btn.addEventListener('click', (e) => {
            action = e.currentTarget.innerHTML;
        });
    }

    function calculate(x, y, action) {
        switch (action) {
            case '+':
                return x + y;

            case '-':
                return x - y;

            case '*':
                return x * y;

            case '/':
                if (y !== 0) {
                    return x / y;
                }
                return 'бесконечность';
            default:
                return 'нет операнда!';
        }
    }
})();