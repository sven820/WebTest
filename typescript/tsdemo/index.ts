import u from './util'

export class Person {

    msg: string = 'person class'
    name: string
    //构造函数
    constructor(name: string) {
        this.name = name
    }

    hello() {
        console.log(this.msg)
        u.test()
    }
}