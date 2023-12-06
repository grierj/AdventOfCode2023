import * as common from "../common";

const inputFile = "./Day6/input.txt"

var raceTime: number
var raceDistance: number


// parsing
common.getInputLines(common.readInput(inputFile)).forEach(line => {
    if (line.startsWith("Time:")) {
        raceTime = Number(line.split(":")[1].trim().split(" ").filter((e) => e != "").join(""))
    } else if (line.startsWith("Distance:")) {
        raceDistance = Number(line.split(":")[1].trim().split(" ").filter((e) => e != "").join(""))
    }
})

let workingNum = new Array<number>()
let workingPresses = pressesThatWork(raceTime, raceDistance)
workingNum.push(workingPresses.length)
console.log(workingNum)

function pressesThatWork(time: number, distance: number): Array<number> {
    let working = new Array<number>()
    for (var i = 1; i < time; i++) {
        if (pressGreaterThanDistance(i, time, distance)) {
            //console.log("Pressing for", i, "works")
            working.push(i)
        }
    }
    return working
}

function pressGreaterThanDistance(press: number, time: number, distance: number): boolean {
    let travelDist = (time - press) * press
    //console.log(travelDist, "vs", distance)
    return travelDist > distance
}

