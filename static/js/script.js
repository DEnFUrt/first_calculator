(function () {


    let firstValue = 0;
    let secondValue = 0;
    let action = '';

    //При загрузке страницы вызываем функцию и ставим фокус на первую строку ввода

    setFocusInput(inputFirstValue);


    //Чистим первую строку ввода если значение не цифра и обнуляем переменную с ней связанную при переводе фокуса

    inputFirstValue.addEventListener('focus', (e) => {
        if (e.currentTarget.value === errNumber) {
            e.currentTarget.value = '';
            firstValue = 0;
        }
    });

    //Чистим вторую строку ввода если значение не цифра и обнуляем переменную с ней связанную при переводе фокуса

    inputSecondValue.addEventListener('focus', (e) => {
        if (e.currentTarget.value === errNumber) {
            e.currentTarget.value = '';
            secondValue = 0;
        }
    });

    /* проверяем строку ввода первого оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    и выводим соответствующее сообщение */

    inputFirstValue.addEventListener('change', (e) => {
        if (e.currentTarget.value.length === 0 ||
            (!Number(e.currentTarget.value) &&
                e.currentTarget.value !== '0')) {
            firstValue = 0;
            e.currentTarget.value = errNumber;
        } else {
            firstValue = parseFloat(e.currentTarget.value);
        }
    });

    /* проверяем строку ввода второго оператора после потери фокуса ввода, если не число, то сбрасываем значение на 0
    и выводим соответствующее сообщение */

    // inputSecondValue.addEventListener('change', (e) => {
    //     if (e.currentTarget.value.length === 0 ||
    //         (!Number(e.currentTarget.value) &&
    //             e.currentTarget.value !== '0')) {
    //         secondValue = 0;
    //         e.currentTarget.value = errNumber;
    //     } else {
    //         secondValue = parseFloat(e.currentTarget.value);
    //     }
    // });

    inputSecondValue.addEventListener('input', (e) => {
        checkInputNaN(e.currentTarget.value);
    });

    // Проверка на валидность строки ввода, если не цифры, ставим красную рамку вокруг инпута

    let checkInputNaN = function (inputValue) {
        if(inputValue.length === 0 || !Number(inputValue)) {
            
        } 
    };

    //Считаем результат, вызываем функцию чистки строк ввода, операнда и передаем фокус на первую строку ввода

    btnResult.addEventListener('click', () => {
        // console.log(`onResult ${btnUpResult}`)
        // console.log(firstValue, secondValue, action);
        if (inputFirstValue.value !== errNumber && inputSecondValue.value !== errNumber) {
            fieldResult.textContent = calculate(firstValue, secondValue, action);
            if (fieldResult.textContent !== errOperand) {
                clearValue();
            }
        }
        setFocusInput(inputFirstValue);
    });

    //Если нажали кнопку С вызываем функцию чистки строки ввода и результата

    btnEsc.addEventListener('click', () => {
        // console.log(`onClear ${btnEsc}`)
        let clearResult = true;
        clearValue(clearResult);
        setFocusInput(inputFirstValue);
    });

    /* Если нажата кнопка -/+ меняем знак результата
    Если в строке результата не число, выходим из функции */

    btnChangeValue.addEventListener('click', () => {
        if (!Number(fieldResult.textContent)) {
            return
        };
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
        if (!Number(fieldResult.textContent)) {
            return
        };
        if (inputFirstValue.value === '' || inputFirstValue.value === '0') {
            inputFirstValue.value = fieldResult.textContent;
            firstValue = parseFloat(fieldResult.textContent);
        } else if (inputSecondValue.value === '' || inputSecondValue.value === '0') {
            inputSecondValue.value = fieldResult.textContent;
            secondValue = parseFloat(fieldResult.textContent);
        }
    });

    //Ставим фокус ввода на строку переданную в параметре, если параметра нет, то ставим в свободную строку
    //если все занято то в первую строку

    function setFocusInput(nameInput) {
        if (nameInput) {
            nameInput.focus();
        } else {
            if (inputFirstValue.value !== '' && inputSecondValue.value !== '') {
                inputFirstValue.focus();
            } else if (inputFirstValue.value !== '') {
                inputSecondValue.focus();
            } else {
                inputFirstValue.focus();
            }
        }

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

    //Определяем какая кнопка операнда была нажата и выводим символ операнда в форму

    for (let i = 0; i < controls.length; i++) {
        const btn = controls[i];
        btn.addEventListener('click', (e) => {
            for (let key in operandSimbol) {
                if (key === e.currentTarget.textContent) {
                    action = key;
                    txtOperand.textContent = operandSimbol[key];
                    break;
                }
            }
        });
    }

    // Функция парсит нажатие кнопки на клавиатуре в div calculator и вызывает событие focus для кнопки на форме 

    calculator.addEventListener('keydown', (e) => {
        // console.log(`keyDown ${e.key}`)
        for (let keyCode in keyCodes) {
            if (e.key === keyCode) {
                let btnCode = controlsArray.find(btnCode => btnCode.textContent === keyCodes[keyCode]);
                if (btnCode) {
                    btnCode.focus()
                }
                break;

            }
        }

    });

    // Функция парсит отжатие кнопки на клавиатуре в div calculator и вызывает событие click для кнопки на форме

    calculator.addEventListener('keyup', (e) => {
        // console.log(`keyUp ${e}`)
        for (let keyCode in keyCodes) {
            if (e.key === keyCode) {
                let btnCode = controlsArray.find(btnCode => btnCode.textContent === keyCodes[keyCode]);
                if (btnCode) {
                    btnCode.click()
                    setFocusInput();
                }
                break;
            }
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



    console.log(calculate_.notOperand.result(10, 3));

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