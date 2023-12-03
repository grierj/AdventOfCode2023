import { createSecureContext } from "tls";
import * as common from "../common";

var maxByGame = new Array<number>();

common.getInputLines(common.readInput("./Day2/input.txt")).forEach(line => {
    let gameId: string = line.split(":", 1)[0].split(" ")[1].trim()
    let allResults: string[] = line.split(":")[1].split(";")
    console.log("Game ID", gameId)
    console.log(allResults)
    var maxAmounts = new Map<string, number>([
        ["red", 1],
        ["green", 1],
        ["blue", 1],
    ]);
    for (var game of allResults) {
        for(var diceSet of game.trim().split(",")) {
            let results = diceSet.trim().split(" ")
            console.log("Results", results)
            let color = results[1].trim()
            let diceNum = +results[0].trim()
            if (maxAmounts.get(color) < diceNum) {
                console.log("Setting new max for", color, "to", diceNum)
                maxAmounts.set(color, diceNum)
            }
        }
    }
    maxByGame.push(maxAmounts.get("red")*maxAmounts.get("blue")*maxAmounts.get("green"))
})
console.log(maxByGame)
let gameSum = maxByGame.reduce((sum: number, current: number) => sum + current, 0)
console.log("Game sum", gameSum)