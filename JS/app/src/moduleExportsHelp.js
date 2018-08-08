// module.exports = 'hello';
// 也可以写成 exports = 'Hello require!';
// 也可以写成 module.exports = 'Hello require!';

module.exports = {
  a: 'jxf',
  hello: function() {
    console.log('hello');
  }
}
module.exports.name = 'jinxiaofei'
//类
/*
module.exports = function(name, age) {
    this.name = name;
    this.age = age;
    this.about = function() {
        console.log(this.name +' is '+ this.age +' years old');
    };
};
*/

/*
所有的exports收集到的属性和方法，都赋值给了Module.exports。
当然，这有个前提，就是Module.exports本身不具备任何属性和方法。
如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
*/
