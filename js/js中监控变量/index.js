// 使用proxy监控变量    代理后的对象 = new Proxy(原对象, {set: function(){}, get: function(){}, has: function(){}})
const p = new Proxy({}, {
    set: (target, prop, value, receiver) => {
        console.log("===========================");

        target[prop] = value;

        console.log(target);  // 更改后的对象
        console.log(prop);  // 更改的属性
        console.log(value);  // 更改的值
        console.log(receiver);  // 代理对象
        console.log("变量更改", receiver);
    },

    get: (target, name) => {
        console.log("===========================");

        console.log("变量获取");
        return name in target ? target[name] : new Error("属性不存在");
    },
    has: (target, prop) => {
        console.log("===========================");

        console.log("变量是否存在");
        return prop in target;
    }
});

p.user = "张三";

console.log(p.user);

console.log("user" in p);