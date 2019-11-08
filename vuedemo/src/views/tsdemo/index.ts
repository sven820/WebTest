
import util from './util'
import test from './test'
// import { school } from './test'

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
    }
}
