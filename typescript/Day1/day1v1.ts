import { log } from 'console';
import { readFileSync } from 'fs';

const myinput = readFileSync("./input.txt", "utf8");
const digitRegex : RegExp = /\d/
let mylines = myinput.split("\n").filter(line => line.trim() !== '')
let totals : number = 0
let firstNum : number = -1;
let lastNum : number = -1;
mylines.forEach(line => {
    console.log("Current line: ", line);
    firstNum = -1;
    lastNum = -1;
    for(let i = 0; i <= line.length; i++) {
        let currChar = line.charAt(i);
        if (currChar.match(digitRegex)) {
            let currNum : number = +currChar;
            if (firstNum === -1) {
                firstNum = currNum;
                lastNum = currNum;
            } else {
                lastNum = currNum;
            }
        }
    }
    console.log(firstNum, " ", lastNum);
    totals = totals + (firstNum*10 + lastNum);
    console.log("Running total: ", totals);
});
