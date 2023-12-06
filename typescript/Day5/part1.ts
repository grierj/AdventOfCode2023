import * as common from "../common";

var points: number = 0
const inputFile = "./Day5/input.txt"
const numAtStart = new RegExp(/\A\d/)

var seeds = new Array<number>();
var fromToMap = new Map<string, string>()
var seedMaps = new Map<string, Array<Array<number>>>()
var currentMap = "unknown"

// another dumbfuck parser completely different from every other parser
// it's a few characters away from valid yaml, but we can't do that, there's not challenge in
// parsing regular inputs!
common.getInputLines(common.readInput(inputFile)).forEach(line => {
    if (line.startsWith("seeds:")) {
        seeds = line.split(":")[1].trim().split(" ").map(Number)
    } else if (line.match(common.letterRegex)) {
        let parsedMap = line.split(":")[0].split(" ")[0].split("-")
        currentMap = parsedMap[0]
        fromToMap.set(currentMap, parsedMap[2])
        seedMaps.set(currentMap, [])
    } else {
        let parsedLine = line.split(" ").map(Number)
        let newMap = seedMaps.get(currentMap)
        newMap.push(parsedLine)
        seedMaps.set(currentMap, newMap)
    }
})
console.log(fromToMap)
console.log(seedMaps)

let seedLocations = new Array<number>()
for (var seed of seeds) {
    seedLocations.push(getLocationOfSeed(seed))
}

console.log("Smallest location", seedLocations.sort((n1,n2) => n1-n2))

function getLocationOfSeed(seedNum: number) {
    let myMap = "seed"
    let myNum = seedNum
    while (myMap != "location") {
        myNum = findOutputFromInput(myNum, seedMaps.get(myMap))
        myMap = getNextMap(myMap)
    }
    // the result of the map prior to "location" is our location
    console.log("Found location", myNum)
    return myNum
}


function findOutputFromInput(inputNum: number, inputMap: Array<Array<number>>): number {
    for (var i = 0; i < inputMap.length; i++) {
        let inStart = inputMap[i][1]
        let inEnd = inputMap[i][1]+inputMap[i][2]
        let outStart = inputMap[i][0]
        if (common.numInRange(inputNum, inStart, inEnd)) {
            let offset = inputNum - inStart
            console.log(inputNum, "is in between", inStart, "and", inEnd, "and maps to", outStart+offset)
            return outStart + offset
        }
    }
    console.log("No map, passing along original number", inputNum)
    return inputNum
}

function getNextMap(currMap: string) {
    return fromToMap.get(currMap)
}


