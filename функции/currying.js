// Частичное прменение

const partial = (fn, ...rest) => (...args) => fn(...rest, ...args);

const max = (x, y, z) => Math.max(x, y, z);

const one = partial(max, 15); // запишет 15 в х, т.е. передали частично параметры
// новая функция one, полученна частичным применением функции partial к числу 15
const two = partial(max, 12);  // 12 в y
const three = partial(max, 31);  //
console.log(three);


// Кaррирование

const curry = (fn, ...par) => {    //получаем ф-цию и аргументы
    const curried = (...args) => (
        fn.length > args.length ? 
        curry(fn.bind(null, ...args)) : // если арг. не достаточно, то передаем их в ф-цию fn (накапливаем), но не вызываем ее 
        fn(...args)                     // т.е применяем частичное применение
    );
    return partial.length ? curried(...par) : curried;   // если аргументы не передавали, то выз. ф-цию curried
};

const sum = (a, b, c, d) => a + b + c + d;
const sumCurry = curry(sum);

console.log(sumCurry(1, 2, 3, 4));
console.log(sumCurry(1)(2, 3, 4));
console.log(sumCurry(1, 2) (3, 4));
console.log(sumCurry(1, 2, 3) (4));
