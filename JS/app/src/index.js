
//导入单个元素，必须括号，没括号，则默认是default
import {num1} from './moduleHelp'
//可以连起来写
import _, {num2, fun2} from './moduleHelp'
import any from './moduleHelp'
// as 重命名
import * as moduleHelp from './moduleHelp'

import greet from './greet'

// var g = document.createElement('div');
// g.textContent = "Hi there and greetings!";
// document.querySelector('#root').appendChild(g)

console.log('num1', num1)
console.log('num2', _, num2);
console.log('default', any)
console.log('module', moduleHelp);
console.log(moduleHelp.num1);

//require
var hello = require('./moduleExportsHelp')
console.log('require', hello.a, hello.hello, hello.name);
