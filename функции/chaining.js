const thrice = (x) => x * 3;
const inc = (x) => x + 1;
const bis = (x) => x / 2;
//  функциональный обьект  - обьект функционального типа, который является функцией и обьектом одновременно. 
//может быть вызван как функция и может иметь свойства и методы как обьект 
//реализация ниже как класс, но может быть и как функция коструктор
{
    class Maybe{
        constructor(x) {
            this.x = x;
        }

        map(fn) {
          return new Maybe(this.x && fn ? fn(this.x) : null);
        };
    }
    //new Maybe(9).map(inc).map(bis).map(console.log);// ответ будет 5
    //new Maybe(10).map(thrice).map(bis).map(console.log);// ответ будет 15
}
//функтор - функциональный обьект, который является рекурсивным замыканием
{
    const maybe = (x) => (fn) => maybe(x && fn ? fn(x) : null);

   // maybe(9)(inc)(bis)(console.log);// ответ будет 5
   // maybe(10)(thrice)(bis)(console.log);// ответ будет 15
}

{
    const maybe = (x) => {
        const map = (fn) => maybe(x ? fn(x) : null);
        const ap = (functor) => functor.map((f) => (x && f ? f(x) : null)); 
        //метод ар  аппликативный функтор, принимает другой функтор и у функтора вызвает метод map
        const chain = (f) => f(x);// реализация монады, монада - функтор, который имеет метод chain
        return Object.assign(map, { map, ap, chain });
    };
   // maybe(10)(thrice)(bis)(console.log);
   // maybe(10).map(thrice).map(bis).map(console.log);

   // maybe(10)(thrice).ap(maybe(bis))(console.log);
   // maybe(10)(thrice).ap(maybe(bis))(console.log);
//
   // maybe(10).chain((x) => maybe(x * 2))(bis)(console.log);
   // maybe(10).chain((x) => maybe(x * 2)).map(bis)(console.log);
}
//ФУНКЦИОНАЛЬНЫЙ СТИЛЬ
{
    const foo = a => b => c => a + b + c;
    
    const foo1 = foo(1);
    const foo2 = foo1(2);
    const res1 = foo2(3);
   // console.log('res1:', res1);

    const res2 = foo(1)(2)(3);
   // console.log('res2:', res2);
    // ченинг chainig паттерн
    //ченинг можеть быть протитов, классов и функторов
}
//ПРОТОТИПНЫЙ СТИЛЬ
{
    // у нас есть пляж, мы выдаем шезлонги,
const Beach = function(count) {
    this.count = count;// количество шезлонгов
    this.clients = []; //клиенты
};
Beach.prototype.addClient = function(name) {
    if (this.count <= 0) {// если шезлонги закончились
        console.log('Шезлонгов больше нет');
        return this;
    }

    this.clients.push(name);
    this.count--;

    console.log(this.clients);

    return this;// возвращает наш обьект и поэтому мы можем заново вызывать addClient

};

Beach.prototype.removeClient = function(name) {
    if (!this.clients.length || !this.clients.includes(name)) {
        console.log('Это не наш шезлонг');
        return this;
    }

    this.clients = this.clients.filter(client => client !==name);

    this.count++;

    console.log(this.clients);

    return this;// возвращает наш обьект и поэтому мы можем заново вызывать addClient

};
const curonianSpit = new Beach(2);
//curonianSpit
//.addClient('Вася')
//.addClient('Петя')
//.removeClient('Вася')
//.removeClient('maks')
//.addClient('ваня');

}
//ООП
{
  class Beach {
    constructor(count) {
        this.count = count;// количество шезлонгов
        this.clients = [];
    }
    addClient(name) {
        if (this.count <= 0) {// если шезлонги закончились
            console.log('Шезлонгов больше нет');
            return this;
        }
    
        this.clients.push(name);
        this.count--;
    
        console.log(this.clients);
    
        return this;
    }
    removeClient(name) {
        if (!this.clients.length || !this.clients.includes(name)) {
            console.log('Это не наш шезлонг');
            return this;
        }
    
        this.clients = this.clients.filter(client => client !==name);
    
        this.count++;
    
        console.log(this.clients);
    
        return this;
    }
  }
    const curonianSpit = new Beach(2);
//curonianSpit
//.addClient('Вася')
//.addClient('Петя')
//.removeClient('Вася')
//.removeClient('maks')
//.addClient('ваня');
}
//структура использует функтор
{
//функциональное программирование
}
 const beach = (count = 0, clients = []) => ({
    addClient: name => {
        if(count <= 0) {
            console.log('Шезлонгов больше нет');
            return beach(count, clients);
        }
        clients.push(name);
        count--;
    
        console.log(clients);
        return beach(count, clients);
    },
    removeClient: name =>  {
        if (!clients.length || !clients.includes(name)) {
            console.log('Это не наш шезлонг');
            return beach(count, clients);
        }
    
        clients = clients.filter(client => client !==name);
    
        count++;
    
        console.log(clients);
    
        return beach(count, clients);
    }
 });
    
        const curonianSpit = beach(2);
        curonianSpit
        .addClient('Вася')
        .addClient('Петя')
        .removeClient('Вася')
        .removeClient('maks')
        .addClient('ваня');
{
    const beach = (count = 0, clients = [], obj = {
        addClient: name => {
            if(count <= 0) {
                console.log('Шезлонгов больше нет');
                return beach(count, clients, obj);
            }
            clients.push(name);
            count--;
        
            console.log(clients);
            return beach(count, clients, obj);
        },
        removeClient: name =>  {
            if (!clients.length || !clients.includes(name)) {
                console.log('Это не наш шезлонг');
                return beach(count, clients, obj);
            }
        
            clients = clients.filter(client => client !==name);
        
            count++;
        
            console.log(clients);
        
            return beach(count, clients, obj);
        }
    }) => obj;
    
        const curonianSpit = beach(2);
        curonianSpit
        .addClient('Вася')
        .addClient('Петя')
        .removeClient('Вася')
        .removeClient('Макс')
        .addClient('Ваня');
    }
    //ченинг применяется в jquery 

   