
var num1 = 9
var fun1 = function() {
  console.log('fun1')
}
export {num1, fun1}
export {num1 as number1}

export var num2 = 99
export function fun2() {
  console.log('fun2')
}

//default 只能用一次
export default {
  num3: 999,
  fun3() {
    console.log('fun3');
  }
}
// var num3 = 999;
// export {num3 as default}

console.log('just log');
