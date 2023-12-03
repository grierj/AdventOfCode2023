import { readFileSync } from 'fs';

var myinput: string = "";
var mylines: string[] = [];
const digitRegex: RegExp = /\d/;


function addIndexOfNum(numIndex: number, value: number, numMap: Map<number, number>) {
    if (numIndex !== -1) {
        numMap.set(numIndex, value);
    }
    return numMap;
}

function readInput(inputFile: string) {
    if (myinput === "") {
        myinput = readFileSync(inputFile, "utf8");
    }
    return myinput
}

function getInputLines(inputBlob: string) {
    if (mylines = []) {
        mylines = inputBlob.split("\n").filter(line => line.trim() !== '');
    }
    return mylines
}

export { readInput, getInputLines, addIndexOfNum, digitRegex }
