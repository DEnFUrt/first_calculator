(function () {


    let action = '';

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
            fieldResult.textContent = '0';
        }
        inputFirstValue.value = '';
        //firstValue = 0;
        inputSecondValue.value = '';
        //secondValue = 0;
        txtOperand.textContent = '';
        action = '';
    };

    //Определяем нажатую клавишу и находим соответствующую кнопку на блоке calculator

    let getBtnCode = function (currentKey) {
        for (let keyCode in keyCodes) {
            if (currentKey === keyCode) {
                let btnCode = controlsArray.find(btnCode => btnCode.textContent === keyCodes[keyCode]);
                return btnCode;
            }
        }
    };

    //Устанавливаем значения переменных калькулятора перед расчетом
    
    let getValue = function (inputTarget) {
        let swap = 0;
        if (-inputTarget.value) {
            swap = parseFloat(inputTarget.value);
        }
        return swap;
    };

    let changeValue = function (targetElementText) {
        if (targetElementText[0] === '-') {
            targetElementText = targetElementText.replace('-', '');
        }
        else {
            targetElementText = `-${targetElementText}`;
        }
        return targetElementText;
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
        // console.log(`onClear ${btnEsc}`)
        let clearResult = true;
        clearInputValue(clearResult);
        setFocusInput(inputFirstValue);
    });

    /* Если нажата кнопка -/+ меняем знак результата
    Если в строке результата не число, выходим из функции */

    btnChangeValue.addEventListener('click', () => {
        if (inputFirstValue.focus) {
            inputFirstValue.value = changeValue(inputFirstValue.value);
            return;
        }
        if (!-fieldResult.textContent) {
            return
        };
        fieldResult.textContent = changeValue(fieldResult.textContent);
    });


    /* Если нажата кнопка стрелка вверх, то переносим результ вычисления в первую пустую строку
    или во вторую если первая занята и присваиваем результат сответствующей переменной. Если строки заняты - ничего не переносим 
    Если в строке результат не число, выходим из функции  */

    btnUpResult.addEventListener('click', () => {
        if (!-fieldResult.textContent) {
            return
        };
        if (inputFirstValue.value === '' || inputFirstValue.value === '0') {
            inputFirstValue.value = fieldResult.textContent;
        } else if (inputSecondValue.value === '' || inputSecondValue.value === '0') {
            inputSecondValue.value = fieldResult.textContent;
            //secondValue = parseFloat(fieldResult.textContent);
        }
    });

    //Считаем результат, вызываем функцию чистки строк ввода, операнда и передаем фокус на первую строку ввода

    btnResult.addEventListener('click', () => {
        if (inputFirstValue.classList.contains(errInput) ||
            inputSecondValue.classList.contains(errInput)) {
                setErrorFocusInput ();
                return;
            }
        let firstValue = getValue(inputFirstValue);
        let secondValue = getValue(inputSecondValue);
        fieldResult.textContent = calculate(firstValue, secondValue, action);
        console.log(firstValue, secondValue, action);
        if (fieldResult.textContent !== errOperand) {
                clearInputValue();
        }
        setFocusInput(inputFirstValue);
    });

    //Определяем какая кнопка операнда была нажата и выводим символ операнда в форму

    for (let i = 0; i < controls.length; i++) {
        const btn = controls[i];
        //let action = '';
        //console.log(`initial ${action}`);
        btn.addEventListener('click', (e) => {
            for (let key in operandSimbol) {
                if (key === e.currentTarget.textContent) {
                    action = key;
                    //console.log(`set - ${action}`);
                    txtOperand.textContent = operandSimbol[key];
                    setFocusInput();
                    break;
                }
            }
        });
    }

    // Функция парсит нажатие кнопки на клавиатуре в div calculator и вызывает событие focus для кнопки на форме 

    calculator.addEventListener('keydown', (e) => {
        // console.log(`keyDown ${e.key}`)
        let btnCode = getBtnCode(e.key);
        if (btnCode) {
            btnCode.focus();
        }
    });

    /* Функция парсит отжатие кнопки на клавиатуре в div calculator и вызывает событие click для кнопки на форме
     и переводит фокус на свободную строку ввода */

    calculator.addEventListener('keyup', (e) => {
        // console.log(`keyUp ${e}`)
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