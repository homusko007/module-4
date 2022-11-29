const isValidPhone = (str) => {
    const test = str.toString();
    const regExpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const result = test.replace(/\D+/g, '');

    if(!regExpPhone.test(test) || result.length !== 11) {
        return 'Номер не корректный';
    }

    return result[0] === '7' ? `8${result.slice(1)}` : result;
};
{
    /*console.log(isValidPhone('+7(958)1536214'));
    console.log(isValidPhone('+7(958)310-12-23'));
    console.log(isValidPhone('89581536214'));
    console.log(isValidPhone('8-901-153-62-14'));
    console.log('----');
    console.log(isValidPhone('5(999)3455234'));
    console.log(isValidPhone('+7-080)-10-1223'));
    console.log(isValidPhone('8958153621'));
    console.log(isValidPhone('+89903456543'));*/

   /* if (isValidPhone('+7(958)1536214') === '89581536214') {
        console.log('Тест пройден');
    } else console.warn('Тест не пройден');
    if (isValidPhone('+7-080)-10-1223') === 'Номер не корректный') {
        console.log('Тест пройден');
    } else console.warn('Тест не пройден');
    if (isValidPhone('+7(958)310-12-23') === '89583101223') {
        console.log('Тест пройден');
    } else console.warn('Тест не пройден');
    if (isValidPhone('+7(958)153621') === 'Номер не корректный') {
        console.log('Тест пройден');
    } else console.warn('Тест не пройден');*/


   /* if (isValidPhone('+7(958)1536214') !== '89581536214') {
        throw new Error('Тест не пройден');
    }
    if (isValidPhone('+7-080)-10-1223') !== 'Номер не корректный') {
        throw new Error('Тест не пройден');
    }
    if (isValidPhone('+7(958)310-12-23') !== '89583101223') {
        throw new Error('Тест не пройден');
    }
    if (isValidPhone('+7(958)153621') !== 'Номер не корректный') {
        throw new Error('Тест не пройден');
    }
    console.log('Тест  пройден');*/

}
export default isValidPhone;