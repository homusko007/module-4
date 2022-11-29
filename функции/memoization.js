const memoize = fn => {
    const strKey = item => `${JSON.stringify(item)} (${typeof item})`;
    const generateKey = args => args.map(strKey).join(',');
    const cache = {};
    return (...args) => {
        const key = generateKey(args);
        const val = cache[key];
        if (val) return val;
        const res = fn(...args);
        cache[key] = res;

        return res;
    };
};
{
    const foo = (a, b) => {
        let res = 0;
        for (let i = a; i < b; i++) {
            res += i;
        }
        return res;
    }
    const memFoo = memoize(foo);

     //console.log('первый', memFoo(1, 300000000));
    // console.log('промежуточный', memFoo(1, 300000001));
    // console.log('второй', memFoo(1, 300000000));
    // console.log('промежуточный', memFoo(1, 300000001));

}
{
    const foo = ({ a }, { b }) => {
        let res = 0;
        for (let i = a; i < b; i++) {
            res += i;
        }
        return res;
    }
    const memFoo = memoize(foo);
    //console.log('первый', memFoo({a:1}, {b:300000000}));
    //console.log('промежуточный', memFoo({a:1}, {b:300000001}));
    //console.log('второй', memFoo({a:1}, {b:300000000}));
    //console.log('промежуточный2', memFoo({a:1}, {b:300000001}));
}