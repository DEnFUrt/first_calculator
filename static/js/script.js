(function () {


    let action = '';
    let focusedInput;

    /* проверяем строку ввода оператора, если введено не число, то ставим красную рамку
    вокруг строки ввода, если число - убираем 
    */

    let checkInputValue = function (inputTarget) {
        if (!-inputTarget.value && -inputTarget.value !== 0) {
            setOnErrorBorderInput(inputTarget);
        } else {
            setOffErrorBorderInput(inputTarget);
        }
    };

    // проверяем наличие класса errInput в элементе inputTarget формы и если класса нет, ставим его

    let setOnErrorBorderInput = function (inputTarget) {
        if (!inputTarget.classList.contains(errInput)) {
            inputTarget.classList.toggle(errInput);
        }
    };

    // проверяем наличие класса errInput в элементе inputTarget формы и если класс есть, удаляем его 

    let setOffErrorBorderInput = function (inputTarget) {
        if (inputTarget.classList.contains(errInput)) {
            inputTarget.classList.toggle(errInput);
        }
    };


    /* Ставим фокус ввода на строку переданную в параметре, если параметра нет, то ставим в свободную строку
    - если все занято то в первую строку 
    */

    let setFocusInput = function (inputTarget) {
        if (inputTarget) {
            inputTarget.focus();
        } else {
            if (inputFirstValue.value !== '' && inputSecondValue.value !== '') {
                inputFirstValue.focus();
            } else if (inputFirstValue.value !== '') {
                inputSecondValue.focus();
            } else {
                inputFirstValue.focus();
            }
        }

    };

    /* Ставим фокус ввода на строку с ошибкой
    - если ошибки нет или во всех строках - то в первую строку 
    */

    let setErrorFocusInput = function () {
        if (inputFirstValue.classList.contains(errInput) && inputSecondValue.classList.contains(errInput)) {
            inputFirstValue.focus();
        } else if (!inputFirstValue.classList.contains(errInput)) {
            inputSecondValue.focus();
        } else {
            inputFirstValue.focus();
        }
    };

    //Чистим строки ввода 

    let clearInputValue = function (clearResult) {
        if (clearResult) {
            inputResultValue.value = '0';
        }
        inputFirstValue.value = '';
        inputSecondValue.value = '';
        txtOperand.textContent = '';
        action = '';
    };

    //Находим нажатой кнопке на клавиатуре соответствующую кнопку на блоке calculator

    let getBtnCode = function (currentKey) {
        let btnCode = controlsArray.find(btnCode => btnCode.getAttribute('data-operand') === currentKey);
        return btnCode;
    };

    //Устанавливаем значения переменных калькулятора перед расчетом

    let getValue = function (inputTarget) {
        let swap = 0;
        if (-inputTarget.value) {
            swap = parseFloat(inputTarget.value);
        }
        return swap;
    };

    // Убираем или добавляем минус в начале строки

    let changeValue = function (targetElementText) {
        if (targetElementText[0] === '-') {
            targetElementText = targetElementText.replace('-', '');
        } else {
            targetElementText = `-${targetElementText}`;
        }
        return targetElementText;
    };

    //при получении фокуса Input-ом запоминаем ссылку на этот Input

    let check = function () {
        focusedInput = this;
    };

    for (let inp = 0; inp < inputs.length; inp++) {
        inputs[inp].onfocus = check;
    }

    //При загрузке страницы ставим фокус на первую строку ввода

    setFocusInput(inputFirstValue);

    /* проверяем строку ввода, если не число, то рисуем
    красную рамку вокруг строки ввода 
    */

    calculator.addEventListener('input', (e) => {
        if (e.target.nodeName == 'INPUT') {
            checkInputValue(e.target);
        }
    });

    //Если нажали кнопку <С> вызываем функцию чистки строки ввода и результата

    btnEsc.addEventListener('click', () => {
        let clearResult = true;
        clearInputValue(clearResult);
        setFocusInput(inputFirstValue);
    });

    /* Если нажата кнопка -/+ меняем знак результата
    - если в строке результата не число, выходим из функции оставляем фокус на строке 
    */
    

    btnChangeValue.addEventListener('click', () => {
        if (-focusedInput.value) {
            focusedInput.value = changeValue(focusedInput.value);
        }
        focusedInput.focus();
    });

    /* Если нажата кнопка стрелка вверх, то переносим результ вычисления в строку где фокус ввода
    - если строка занята - переписываем значение строки 
    - если результат вычисления не число, выходим из функции 
    */

    btnUpResult.addEventListener('click', () => {
        if (!-inputResultValue.value) {
            focusedInput.focus();
            return
        };
        focusedInput.value = inputResultValue.value;
        focusedInput.focus();
    });

    /* Считаем результат, вызываем функцию чистки строк ввода, операнда и передаем фокус на первую строку ввода
    - если есть ошибки в строках ввода передаем фокус на строку с ошибкой, выходим из функции
    - если перед расчетом не нажата кнопка операнда, выводим сообщение, строки ввода не чистим, фокус на первую строку ввода
    */

    btnResult.addEventListener('click', () => {
        if (inputFirstValue.classList.contains(errInput) ||
            inputSecondValue.classList.contains(errInput)) {
            setErrorFocusInput();
            return;
        }
        let firstValue = getValue(inputFirstValue);
        let secondValue = getValue(inputSecondValue);
        let calc = calculate.find(calc => calc.operand === action);
        inputResultValue.value = calc.result(firstValue, secondValue);
        if (inputResultValue.value !== errOperand) {
            clearInputValue();
        }
        setFocusInput(inputFirstValue);
    });

    //Определяем какая кнопка операнда была нажата и выводим символ операнда в форму

    calculator.addEventListener('click', (e) => {
        if (e.target.nodeName == 'BUTTON') {
            for (let key in operandSimbol) {
                if (key === e.target.getAttribute('data-operand')) {
                    action = key;
                    txtOperand.textContent = operandSimbol[key];
                    setFocusInput();
                    break;
                }
            }
        }
    });

    // Функция парсит нажатие кнопки на клавиатуре в div calculator и вызывает событие focus для кнопки на форме 

    calculator.addEventListener('keydown', (e) => {
        let btnCode = getBtnCode(e.key);
        if (btnCode) {
            btnCode.focus();
        }
    });

    // Функция парсит отжатие кнопки на клавиатуре в div calculator и вызывает событие click для кнопки на форме
    
    calculator.addEventListener('keyup', (e) => {
        let btnCode = getBtnCode(e.key);
        if (btnCode) {
            btnCode.click();
        }
    });

})(); 