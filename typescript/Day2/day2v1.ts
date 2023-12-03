import * as common from "../common";

const maxAmounts = new Map<string, number>([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
]);

var validGames: number[] = [];

common.getInputLines(common.readInput("./Day2/input.txt")).forEach(line => {
    let gameId: string = line.split(":", 1)[0].split(" ")[1].trim()
    let allResults: string[] = line.split(":")[1].split(";")
    console.log("Game ID", gameId)
    console.log(allResults)
    let currGameValid = true;
    for (var game of allResults) {
        let currSetValid = true
        for(var diceSet of game.trim().split(",")) {
            let results = diceSet.trim().split(" ")
            console.log("Results", results)
            let color = results[1].trim()
            let diceNum = +results[0].trim()
            console.log("Comparing max for", color, "(",maxAmounts.get(color), ") to", diceNum)
            if (maxAmounts.get(color) < diceNum) {
                currSetValid = false;
                break;
            }
        }
        if (!currSetValid) {
            currGameValid = false;
            break;
        }
    }
    if (currGameValid) {
        validGames.push(+gameId);
    }
})
console.log(validGames)
let gameSum = validGames.reduce((sum: number, current: number) => sum + current, 0)
console.log("Game sum", gameSum)