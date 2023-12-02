"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var myinput = (0, fs_1.readFileSync)("./input.txt", "utf8");
var digitRegex = /\d/;
var mylines = myinput.split("\n").filter(function (line) { return line.trim() !== ''; });
var totals = 0;
var firstNum = -1;
var lastNum = -1;
mylines.forEach(function (line) {
    console.log("Current line: ", line);
    firstNum = -1;
    lastNum = -1;
    for (var i = 0; i <= line.length; i++) {
        var currChar = line.charAt(i);
        if (currChar.match(digitRegex)) {
            var currNum = +currChar;
            if (firstNum === -1) {
                firstNum = currNum;
                lastNum = currNum;
            }
            else {
                lastNum = currNum;
            }
        }
    }
    console.log(firstNum, " ", lastNum);
    totals = totals + (firstNum * 10 + lastNum);
    console.log("Running total: ", totals);
});
