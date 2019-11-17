function scope() {
    var name = 'Harry';
    var age = 19;

    function innerScope() {
        console.log('inner ' + name);
        var sername = 'Potter';

        return sername
    }

    var sername = innerScope();

    console.log(sername);
}

scope();

function secondScope() {
    let name = 'Harry'
    let age = 19

    function createUser(dataUser) { 
        let name = 'card name '+ dataUser.name
        let age = 'card age' + dataUser.age
        
        let cardData = { name: name, age: age, id: '00000' }

        return cardData
    }

    var card = createUser()

    if(name.length > 10 ) {}
    else {}
}

(function(){
    console.log('ВЫПОЛНИЛАСЬ ОДИН РАЗ')
})()



let user;

(function(name, age) {
    // Большая логика получения данных сервера и их подготовки
    user = {
        name: name,
        age: age
    }
})('Harry', 19)

console.log(user)

// arrow function

let func = function(x, y) {
    return x + y
}

console.log(func(10 + 20))


let arrowFunc = (x, y) => x + y;



// EXAMPLE THIS

function Cat(name, age) {
    this.name = name
    this.age = age
}

let bird = () => {
    this.nameWindow = 'WINDOW'
}

bird()

console.log(window.nameWindow)