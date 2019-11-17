(function () {
    const controls = document.getElementsByClassName('btn');
    const btnResult = document.getElementById('btnResult');
    const btnPercent = document.getElementById('btnPercent');
    const btnEsc = document.getElementById('btnEsc');
    const btnChangeValue = document.getElementById('btnChangeValue');
    const inputFirstValue = document.getElementById('firstValue');
    const inputSecondValue = document.getElementById('secondValue');
    const fieldResult = document.getElementById('result');
    const txtOperand = document.getElementById('operand');

    let firstValue = 0;
    let secondValue = 0;
    let action = '+';
    

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

    inputFirstValue.addEventListener('input', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0' 
            && e.currentTarget.value !== '-')) {
            firstValue = 0;
            e.currentTarget.value = 'не число!';
        } else {
            firstValue = parseFloat(e.currentTarget.value);
        }
    });

    inputFirstValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0')) {
            firstValue = 0;
            e.currentTarget.value = 'не число!';
        } else {
            firstValue = parseFloat(e.currentTarget.value);
        }
    });

    inputSecondValue.addEventListener('input', (e) => {
        if (e.currentTarget.value.length === 0 
            || (!Number(e.currentTarget.value) 
            && e.currentTarget.value !== '0'
            && e.currentTarget.value !== '-')) {
            secondValue = 0;
            e.currentTarget.value = 'не число!';
        } else {
            secondValue = parseFloat(e.currentTarget.value);
        }
    });

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

    btnResult.addEventListener('click', () => {
        console.log(firstValue, secondValue, action);

        fieldResult.innerHTML = calculate(firstValue, secondValue, action);
        clearValue();
    });

    btnEsc.addEventListener('click', () => {
        //console.log(firstValue, secondValue, action);
        clearValue();
    });

    btnChangeValue.addEventListener('click', () => {
        if (fieldResult.textContent[0] === '-') {
            fieldResult.textContent = fieldResult.textContent.replace('-', '');
        } else {
            fieldResult.textContent = `-${fieldResult.textContent}`;
        }
    });

    for (let i = 0; i < controls.length; i++) {
        const btn = controls[i];
        btn.addEventListener('click', (e) => {
            action = e.currentTarget.innerHTML;
        });
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
        }
    }
})();