import * as common from "../common";

var points: number = 0
const inputFile = "./Day4/input.txt"

common.getInputLines(common.readInput("./Day4/input.txt")).forEach(line => {
    console.log(line)
    let card = line.split(":")[1].split("|")
    let winners = new Set(card[0].trim().split(" "))
    let myNums = new Set(card[1].trim().split(" "))
    winners.delete("")
    myNums.delete("")
    let contained = Array.from(setsIntersection(winners, myNums))
    console.log(contained)

    if (contained.length != 0) {
        let currPoints = 2**(contained.length-1)
        console.log("So it's worth", currPoints)
        points = points + 2**(contained.length-1)
    }
    console.log("This ticket is worth no points")



})

console.log(points)

function setsIntersection(set1: Set<string>, set2: Set<string>): Set<string> {
    const intersection = new Set([...set1].filter(element => set2.has(element)));
    return intersection;
}