const arr = [2, 2, 2, 2]

const q = arr.reduce((res, val, idx, arr) => {
    return res + val;
}, 0);

console.log(q);