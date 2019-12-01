(function () {


    let action = '';
    let focusedInput;

    /* проверяем строку ввода оператора, если введено не число, то ставим красную рамку
    вокруг строки ввода, если число - убираем */

    let checkInputValue = function (inputTarget) {
        if (!-inputTarget.value && -inputTarget.value !== 0) {
            setOnErrorBorderInput(inputTarget);
        } else {
            setOffErrorBorderInput(inputTarget);
        }
    };

    /* проверяем наличие класса errInput в элементе inputTarget формы и если класса
    нет, ставим его*/

    let setOnErrorBorderInput = function (inputTarget) {
        if (!inputTarget.classList.contains(errInput)) {
            inputTarget.classList.toggle(errInput);
        }
    };

    /* проверяем наличие класса errInput в элементе inputTarget формы и если класс
    есть, удаляем его */

    let setOffErrorBorderInput = function (inputTarget) {
        if (inputTarget.classList.contains(errInput)) {
            inputTarget.classList.toggle(errInput);
        }
    };


    /* Ставим фокус ввода на строку переданную в параметре, если параметра нет, то ставим в свободную строку
    если все занято то в первую строку */

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
    если ошибки нет или во всех строках - то в первую строку */

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
            inputResult.value = '0';
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

    /* проверяем строку ввода первого оператора, если не число, то рисуем
    красную рамку вокруг строки ввода */

    inputFirstValue.addEventListener('input', (e) => {
        checkInputValue(e.currentTarget);
    });

    /* проверяем строку ввода второго оператора, если не число, то рисуем
    красную рамку вокруг строки ввода */

    inputSecondValue.addEventListener('input', (e) => {
        checkInputValue(e.currentTarget);
    });

    //Если нажали кнопку С вызываем функцию чистки строки ввода и результата

    btnEsc.addEventListener('click', () => {
        let clearResult = true;
        clearInputValue(clearResult);
        setFocusInput(inputFirstValue);
    });

    /* Если нажата кнопка -/+ меняем знак результата
    Если в строке результата не число, выходим из функции
    оставляем фокус на строке */
    

    btnChangeValue.addEventListener('click', () => {
        if (-focusedInput.value) {
            focusedInput.value = changeValue(focusedInput.value);
        }
        focusedInput.focus();
    });

    /* Если нажата кнопка стрелка вверх, то переносим результ вычисления в строку где фокус ввода
    Если строки заняты - переписываем значение строки 
    Если в строке результата не число, выходим из функции  */

    btnUpResult.addEventListener('click', () => {
        if (!-inputResult.value) {
            return
        };
        focusedInput.value = inputResult.value;
        focusedInput.focus();
    });

    //Считаем результат, вызываем функцию чистки строк ввода, операнда и передаем фокус на первую строку ввода

    btnResult.addEventListener('click', () => {
        if (inputFirstValue.classList.contains(errInput) ||
            inputSecondValue.classList.contains(errInput)) {
            setErrorFocusInput();
            return;
        }
        let firstValue = getValue(inputFirstValue);
        let secondValue = getValue(inputSecondValue);
        inputResult.value = calculate(firstValue, secondValue, action);
        console.log(firstValue, secondValue, action);
        if (inputResult.value !== errOperand) {
            clearInputValue();
        }
        setFocusInput(inputFirstValue);
    });

    //Определяем какая кнопка операнда была нажата и выводим символ операнда в форму

    // for (let i = 0; i < controls.length; i++) {
    //     const btn = controls[i];
    //     //let action = '';
    //     //console.log(`initial ${action}`);
    //     btn.addEventListener('click', (e) => {
    //         for (let key in operandSimbol) {
    //             if (key === e.currentTarget.getAttribute('data-operand')) {
    //                 action = key;
    //                 //console.log(`set - ${action}`);
    //                 txtOperand.value = operandSimbol[key];
    //                 setFocusInput();
    //                 break;
    //             }
    //         }
    //     });
    // }

    calculator.addEventListener('click', (e) => {
        if (e.target.nodeName == 'BUTTON') {
            console.log('Clicked', e.target.getAttribute('data-operand'));
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

    /* Функция парсит отжатие кнопки на клавиатуре в div calculator и вызывает событие click для кнопки на форме
     и переводит фокус на свободную строку ввода */

    calculator.addEventListener('keyup', (e) => {
        let btnCode = getBtnCode(e.key);
        if (btnCode) {
            btnCode.click();
            //setFocusInput();
        }
    });

    // //Парсим нажатие клавиш в инпутах и оставляем только цифры с точкой разделителем дробной части, 6 цифр после точки
    // Это на будущее задел
    // inputFirstValue.addEventListener('keyup', () => {
    //     inputFirstValue.value = inputFirstValue.value.replace(/[^\-\d.-]*/g, '')
    //         .replace(/([.])[.]+/g, '$1')
    //         .replace(/^[^\d]*(\d+([.]\d{0,6})?).*$/g, '$1');
    // });

    // inputSecondValue.addEventListener('keyup', () => {
    //     inputSecondValue.value = inputSecondValue.value.replace(/[^\d.]*/g, '')
    //         .replace(/([.])[.]+/g, '$1')
    //         .replace(/^[^\d]*(\d+([.]\d{0,6})?).*$/g, '$1');
    // });



    function calculate(x, y, action) {
        switch (action) {
            case '+':
                return x + y;

            case '-':
                return x - y;

            case '*':
                let result = x * y;
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




//Переписать функцию calculate