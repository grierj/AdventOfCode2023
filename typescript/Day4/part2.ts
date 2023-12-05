import * as common from "../common";

var cards = new Map<number, number>()
var scratchers: number = 0
const inputFile = "./Day4/input.txt"

common.getInputLines(common.readInput(inputFile)).forEach(line => {
    console.log(line)
    let card = line.split(":")
    let cardNum = +card[0].split(" ").slice(-1)[0]
    let cardValues = card[1].split("|")

    let winners = new Set(cardValues[0].trim().split(" "))
    let myNums = new Set(cardValues[1].trim().split(" "))
    winners.delete("")
    myNums.delete("")
    let contained = Array.from(setsIntersection(winners, myNums))
    console.log(contained)
    cards.set(cardNum, contained.length)
})

console.log(cards)

scratchers = processCards(Array.from(cards.keys()))

console.log(scratchers + Array.from(cards.keys()).length)

function processCards(cardNums: Array<number>): number {
    let currScratchers = 0
    for (var currTicket of cardNums) {
        //console.log("Current ticket", currTicket)
        let numWinners = cards.get(currTicket)
        //console.log("Winners:", numWinners)
        if (numWinners > 0) {
            let cardCopies = new Array<number>
            for (var i = 1; i <= numWinners; i++) {
                    cardCopies.push(currTicket+i)
            }
            //console.log(cardCopies)
            currScratchers = currScratchers + numWinners + processCards(cardCopies)
        }
    }
    return currScratchers
}

function setsIntersection(set1: Set<string>, set2: Set<string>): Set<string> {
    const intersection = new Set([...set1].filter(element => set2.has(element)));
    return intersection;
}