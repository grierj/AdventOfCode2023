import * as common from "../common";

const inputFile = "./Day6/input.txt"

// Because of how we have to parse the input, we need two arrays
// and then zip them together
var raceTimes = new Array<number>()
var distances = new Array<number>()


// parsing
common.getInputLines(common.readInput(inputFile)).forEach(line => {
    if (line.startsWith("Time:")) {
        raceTimes = line.split(":")[1].trim().split(" ").filter((e) => e != "").map(Number)
    } else if (line.startsWith("Distance:")) {
        distances = line.split(":")[1].trim().split(" ").filter((e) => e != "").map(Number)
    }
})
console.log(raceTimes)
console.log(distances)
// [<race time, race distance>, ...]
var raceMap = raceTimes.map(function(e, i) {
    return [e, distances[i]]
})
console.log(raceMap)

let workingNum = new Array<number>()
for (var race of raceMap) {
    let workingPresses = pressesThatWork(race[0], race[1])
    workingNum.push(workingPresses.length)
}
console.log(workingNum)

console.log(common.multAllNumInArray(workingNum))

function pressesThatWork(time: number, distance: number): Array<number> {
    let working = new Array<number>()
    for (var i = 1; i < time; i++) {
        if (pressGreaterThanDistance(i, time, distance)) {
            console.log("Pressing for", i, "works")
            working.push(i)
        }
    }
    return working
}

function pressGreaterThanDistance(press: number, time: number, distance: number): boolean {
    let travelDist = (time - press) * press
    console.log(travelDist, "vs", distance)
    return travelDist > distance
}

