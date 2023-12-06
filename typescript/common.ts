import { readFileSync } from 'fs';

var myinput: string = "";
var mylines: string[] = [];
const digitRegex: RegExp = /\d/;
const letterRegex: RegExp = /[A-Za-z]/;


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

function sumAllNumInArray(myArray: Array<number>): number {
    return myArray.reduce((sum: number, current: number) => sum + current, 0)
}

function multAllNumInArray(myArray: Array<number>): number {
    return myArray.reduce((total: number, current: number) => total * current, 1)
}

function numInRange(num: number, start: number, end: number): boolean {
    if (num >= start && num <= end) {
        return true;
    }
    return false;
}

export {
    readInput,
    getInputLines,
    addIndexOfNum,
    digitRegex,
    letterRegex,
    sumAllNumInArray,
    multAllNumInArray,
    numInRange,
}

