import * as common from "./common";

let totals: number = 0;

let numWords: Array<string> = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

common.mylines.forEach(line => {
    let numMap = new Map<number, number>();
    console.log("Current line: ", line);
    for (let i = 0; i <= 9; i++) {
        //console.log("Looking for: ", i)
        let numIndex = line.indexOf(String(i))
        numMap = common.addIndexOfNum(numIndex, i, numMap)
        numIndex = line.lastIndexOf(String(i))
        numMap = common.addIndexOfNum(numIndex, i, numMap)
        numIndex = line.indexOf(numWords[i])
        numMap = common.addIndexOfNum(numIndex, i, numMap)
        numIndex = line.lastIndexOf(numWords[i])
        numMap = common.addIndexOfNum(numIndex, i, numMap)
    }
    console.log(numMap);
    let myPos = Array.from(numMap.keys())
    console.log(myPos)
    let firstNum = numMap.get(Math.min(...myPos));
    let lastNum = numMap.get(Math.max(...myPos));
    let thisNum = firstNum*10 + lastNum
    console.log(thisNum);
    totals = totals + thisNum;
    console.log("Running total: ", totals)

});
console.log("Final Total: ", totals)


