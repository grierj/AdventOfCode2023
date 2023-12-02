import { readFileSync } from 'fs';

const myinput = readFileSync("./input.txt", "utf8");
const digitRegex: RegExp = /\d/;
var mylines = myinput.split("\n").filter(line => line.trim() !== '');

export { myinput, digitRegex, mylines }
