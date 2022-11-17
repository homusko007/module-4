let objects = [
    { login: 'Maks', email: 'maks@maks.com', company: 'METHED' },
    { login: 'Methed', email: 'info@methed.ru', company: 'METHED' },
    { login: 'Humidor', email: 'tomato@pomodoro.com', company: 'cucumber' }
];

const filter = (arr, key, val) => {
    const newArr = arr.filter(el => el[key] === val);
    return newArr;
};

const filtr1 = filter(objects, 'email', 'info@methed.ru');
console.log(filtr1);
const filtr2 = filter(objects, 'company', 'METHED');
console.log(filtr2);

export default filter;