import * as common from "../common";

const inputFile = "./Day8/input.txt"

const lrRegex = new RegExp(/^[LR]+$/)
const replaceRegex = new RegExp(/[\=\(\),]/g)
const finalLoc = "ZZZ"
var currentLoc = "AAA"

var lrCommands = new Array<string>()
var locMap = new Map<string, Array<string>>()
var steps: number = 0

// parsing
common.getInputLines(common.readInput(inputFile)).forEach(line => {
    if (line.match(lrRegex)) {
        lrCommands = [...line]
    } else {
        // line looks like: PGQ = (QRB, MJB)
        let splitLine = line.replaceAll(replaceRegex, "").split(" ")
        // now: ["PGQ", "", "QRB", "MJB"]
        let source = splitLine[0].trim()
        let left = splitLine[2].trim()
        let right = splitLine[3].trim()
        locMap.set(source, [left, right])
    }
})

while(currentLoc != finalLoc) {
    for (var dir of lrCommands) {
        if (dir == "L") {
            currentLoc = goLeft(currentLoc, locMap)
        } else {
            currentLoc = goRight(currentLoc, locMap)
        }
        steps++
    }
}

console.log(steps)

function goDirection(loc: string, lMap: Map<string, Array<string>>, direction: number) {
    return lMap.get(loc)[direction]
}

function goLeft(loc: string, lMap: Map<string, Array<string>>) {
    return goDirection(loc, lMap, 0)
}

function goRight(loc: string, lMap: Map<string, Array<string>>) {
    return goDirection(loc, lMap, 1)
}