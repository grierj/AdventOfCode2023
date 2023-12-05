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
        //console.log("inspecting column", column)
        if (currRow[column].match(common.digitRegex)) {
            if (checkAroundPos(row, column)) {
                var jumpColumnTo = getEndOfNumberAt(currRow, column)
                var foundNumber = getNumberAt(currRow, column, jumpColumnTo)
                console.log("Number", foundNumber, "has a symbol adjacent")
                partNums.push(foundNumber)
                column = jumpColumnTo-1
                console.log("Jumping to", column)
            }
        }
    }
}

console.log(common.sumAllNumInArray(partNums))


function checkAroundPos(x: number, y: number): boolean {
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

    for(var row = startRow; row <= endRow; row++) {
        for (var column = startColumn; column <= endColumn; column++) {
            var currSymbol = charArray[row][column]
            if ( currSymbol != ".") {
                if (!currSymbol.match(common.digitRegex)) {
                    console.log("Found", charArray[row][column], "at row", row, "column", column)
                    return true
                }
            }
        }
    }
    //console.log(y, "of", charArray[x].length)
    //console.log("Curr char", charArray[x][y], "Next char", charArray[x][y+1])
    if (y < charArray[x].length-1 && charArray[x][y+1].match(common.digitRegex)) {
        return checkAroundPos(x, y+1)
    }
    return false
}

function getEndOfNumberAt(currRow: Array<string>, rowPosition: number): number {
    for (var row = rowPosition; row < currRow.length; row++) {
        if (!currRow[row].match(common.digitRegex)) {
            return row;
        }
    }
    return currRow.length
}

function getNumberAt(row: Array<string>, startPos: number, endPos: number): number {
    return +row.slice(startPos, endPos).join("")
}