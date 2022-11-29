// Суперпозиция
{ 
    const {pow, sqrt } = Math; // вытащили эти методы из объекта Math с пом. деструктуризации
    const add = (a, b) => a + b;
    const rem = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;

    const res1 = pow(6 / 3, 2) + ((sqrt(49) * 3) - 1); // 1-й сп.суперпозиция с пом. математ. операторов
    // console.log('res1:', res1);

    const res2 = add(pow((div(6, 3)), 2), rem((mul(sqrt(49), 3)), 1)); // 2-й спос. суперпозиция без пом. математ. операторов
    // console.log('res2', res2);

}
{
    const compose = (f, g) => x => f(g(x));       // принимает только 2 ф-ции
    const upperFirst = word => word[0].toUpperCase() + word.slice(1);
    const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
    const lower = s => s.toLowerCase();

    const capitalize = compose(upperCapital, lower);

    const str = 'ЛеСкин максим ЭДУАРДОВИЧ';
    // console.log(capitalize(str));

}
{
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);   // принимает любое кол-во ф-ций

    const upperFirst = word => word[0].toUpperCase() + word.slice(1);
    const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
    const lower = s => s.toLowerCase();
    const trim = s => s.trim();

    const capitalizeTrim = compose(upperCapital, lower, trim);

    const str = '  ЛесКин максим ЭДУАРДОВИЧ  ';
    console.log(capitalizeTrim(str));
}

{
    const compose = (...fns) => x => {
        const last = fns.length - 1;
        let res = x;
        for (let i = last; i >= 0; i--) {
            res = fns[i](res);
        }
        return res;
    };
    const upperFirst = word => word[0].toUpperCase() + word.slice(1);
    const upperCapital = s => s.split(' ').map(upperFirst).join(' ');
    const lower = s => s.toLowerCase();
    const trim = s => s.trim();
    const capitalizeTrim = compose(upperCapital, lower, trim);

    const str = '  ЛесКин максим ЭДУАРДОВИЧ  ';
    console.log(capitalizeTrim(str));
}

{
    const upperCase = str => str.toUpperCase();
    const exclaim = str => `${str}!`;
    const repeat = str => `${str} `.repeat(3);

    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

    const withСompose = compose(
        repeat,
        exclaim,
        upperCase
    );

    // console.log(withСompose("I love coding"));
}
{
    const upperCase = str => str.toUpperCase();
    const exclaim = str => `${str}!`;
    const repeat = str => `${str} `.repeat(3);

    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

    const withСompose2 = pipe(
        upperCase,
        exclaim,
        repeat
    );

    // console.log(withСompose2("I love coding"));
}