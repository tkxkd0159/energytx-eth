const add = function(x: number): (second: number) => number {
    return function(y: number): number {
        return x + y
    }
}
const add2 = (x: any): any => (y: any): any => x+y
console.log(add(2))
console.log(add(2)(5))
console.log(add2(1))
console.log(add2(1)(2))