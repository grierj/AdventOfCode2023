import * as common from "../common";

var charArray = new Array<Array<string>>();
var partNums = new Array<number>();

common.getInputLines(common.readInput("./Day3/input.txt")).forEach(line => {
    charArray.push([...line])
})

for (var row = 0; row < charArray.length; row++) {
    var currRow = charArray[row]
    console.log("On row", row)
    console.log(currRow.join(""));
    for (var column = 0; column < currRow.length; column++) {
        if (currRow[column] === "*") {
            var touchingNumbers: Array<number> = getNumbersTouching(row, column)
            if (touchingNumbers.length === 2) {
                partNums.push(touchingNumbers[0] * touchingNumbers[1])
            }
        }
    }
}

console.log(common.sumAllNumInArray(partNums))


function getNumbersTouching(x: number, y: number): Array<number> {
    var startRow = x-1;
    if (x === 0) {
        startRow = x;
    }
    var endRow = x+1;
    if (x === charArray.length-1) {
        endRow = x;
    }
    var startColumn = y-1;
    if (y === 0) {
        startColumn = y;
    }
    var endColumn = y+1;
    if (y === charArray[x].length-1) {
        endColumn = y;
    }

    var touchingNumbers = new Set<number>()

    for(var row = startRow; row <= endRow; row++) {
        for (var column = startColumn; column <= endColumn; column++) {
            var currSymbol = charArray[row][column]
            if (currSymbol.match(common.digitRegex)) {
                var touchingNumber = getNumberAt(charArray[row], column)
                console.log(touchingNumber, "Is touching gear at", x, y)
                touchingNumbers.add(touchingNumber)
            }
        }
    }

    return Array.from(touchingNumbers)
}

function getNumberAt(row: Array<string>, rowPosition: number): number {
    return +((getNumbersBack(row, rowPosition-1).concat(getNumbersForward(row, rowPosition))).join(""))
}

function getNumbersForward(row: Array<string>, rowPos: number): Array<number> {
    var numArray: Array<number> = []
    if (row[rowPos].match(common.digitRegex)) {
        numArray.push(+row[rowPos])
        if (rowPos < row.length-1) {
            return numArray.concat(getNumbersForward(row, rowPos+1))
        }
    }
    return numArray
}

function getNumbersBack(row: Array<string>, rowPos: number): Array<number> {
    var numArray: Array<number> = []
    if (row[rowPos].match(common.digitRegex)) {
        numArray.push(+row[rowPos])
        if (rowPos > 0) {
            return getNumbersBack(row, rowPos-1).concat(numArray)
        }
    }
    return numArray
}