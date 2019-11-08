
import util from './util'
import test from './test'
import { schoolname } from './test'

export class Person {

    msg: string = 'person class'
    name: string
    //构造函数
    constructor(name: string) {
        this.name = name
    }

    hello() {
        console.log(this.msg)
        util.test()

        test()
        console.log(schoolname);
        
        var tt = 't'
        console.log(typeof(tt));
        
        // tt = 123
    }
}
