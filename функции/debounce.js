// ограничивает кол-во вызовов функции

const throttle = (fn, msec) => {
    let lastCall = 0;
    let prevCall = 0;
    return (...args) => {
        lastCall = Date.now();
        if (!prevCall || (lastCall - prevCall) > msec) {
            prevCall + lastCall;
            fn(...args);
        };
    };
}


// debounce ограничивает скорость срабатывания ф-ции

const debounce = (fn, msec) => { 
    let lastCall = 0;
    let lastCallTimer = 0;
    return (...args) => {
        const previousCall = lastCall;
        lastCall = Date.now();
        if (previousCall && ((lastCall - previousCall) <= msec)) {
            clearTimeout(lastCallTimer);
        }
        lastCallTimer = setTimeout(() => fn(...args), msec)
    };
};

const logger = args => console.log(`Вызов функции с агрументом ${args}`);


{
    const throttleLogger = throttle(logger, 2000);

    console.log(0);
    throttleLogger(0);

    setTimeout(() => {
        console.log(1);
        throttleLogger(1);
    }, 1000);

    setTimeout(() => {
        console.log(4);
        throttleLogger(4);
    }, 4000);

    setTimeout(() => {
        console.log(5);
        throttleLogger(5);
    }, 5000);

    setTimeout(() => {
        console.log(7);
        throttleLogger(7);
    }, 7000);
}

{
    const logger = args => console.log(`Вызов фуункции с агрументом ${args}`);
    const debounceLogger = debounce(logger, 2000);

    console.log(0);
    debounceLogger(0);

    setTimeout(() => {
        console.log(1);
        debounceLogger(1);
    }, 1000);

    setTimeout(() => {
        console.log(4);
        debounceLogger(4);
    }, 4000);

    setTimeout(() => {
        console.log(5);
        debounceLogger(5);
    }, 5000);

    setTimeout(() => {
        console.log(7);
        debounceLogger(7);
    }, 7000);
}