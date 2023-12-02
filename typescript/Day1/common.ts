import { readFileSync } from 'fs';

const myinput = readFileSync("./input.txt", "utf8");
const digitRegex: RegExp = /\d/;
var mylines = myinput.split("\n").filter(line => line.trim() !== '');

function addIndexOfNum(numIndex: number, value: number, numMap: Map<number, number>) {
    if (numIndex !== -1) {
        numMap.set(numIndex, value);
    }
    return numMap;
}

export { myinput, digitRegex, mylines, addIndexOfNum }
