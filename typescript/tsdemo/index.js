"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var Person = /** @class */ (function () {
    //构造函数
    function Person(name) {
        this.msg = 'person class';
        this.name = name;
    }
    Person.prototype.hello = function () {
        console.log(this.msg);
        util_1["default"].test();
    };
    return Person;
}());
exports.Person = Person;
