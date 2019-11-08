import {schoolname} from './school'

let name = 'jxf'

function test(msg) {
    console.log('js model test',msg)

    let a = Number(2)
    let b = Boolean(0)
    console.log('-------->', a, b)
}

test(name)

export default test

export { schoolname }