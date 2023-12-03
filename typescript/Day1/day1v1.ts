import * as common from "../common";

let totals: number = 0;
let firstNum: number = -1;
let lastNum: number = -1;
common.mylines.forEach(line => {
    console.log("Current line: ", line);
    firstNum = -1;
    lastNum = -1;
    for (let i = 0; i <= line.length; i++) {
        let currChar = line.charAt(i);
        if (currChar.match(common.digitRegex)) {
            let currNum: number = +currChar;
            if (firstNum === -1) {
                firstNum = currNum;
                lastNum = currNum;
            } else {
                lastNum = currNum;
            }
        }
    }
    console.log(firstNum, " ", lastNum);
    totals = totals + (firstNum * 10 + lastNum);
    console.log("Running total: ", totals);
});
console.log("Final Total: ", totals)


