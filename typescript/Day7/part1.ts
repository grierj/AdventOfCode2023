import * as common from "../common";

const inputFile = "./Day7/input.txt"

var cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

// the input has all hands as unique, so this should work fine
var cards = new Map<string, number>()
var handType = new Map<number, Array<string>>()

// parsing
common.getInputLines(common.readInput(inputFile)).forEach(line => {
    let splitLine = line.split(" ")
    cards.set(splitLine[0].trim(), Number(splitLine[1].trim()))
})

//console.log(cards)

for (var myCards of cards.keys()) {
    let hands = handType.get(typeOfHand(myCards))
    if (!hands) {
        hands = [myCards]
    } else {
        hands.push(myCards)
    }
    handType.set(typeOfHand(myCards), hands)
}



for (var k of handType.keys()) {
    handType.set(k, handType.get(k).sort(sortHands))
}

console.log(handType)

let allHands = new Array<string>()
for (var i = 1; i <= 7; i++) {
    allHands = allHands.concat(handType.get(i))
}
console.log(allHands)

let winnings: number = 0
for (var i = 0; i < allHands.length; i++) {
    var bid = cards.get(allHands[i])
    winnings = winnings + (bid * (i+1))
}
console.log(winnings)

function sortHands(a: string, b: string) {
    let aHand = [...a]
    let bHand = [...b]
    for (var i = 0; i < aHand.length; i++) {
        let aCardVal = cardValues.indexOf(aHand[i])
        let bCardVal = cardValues.indexOf(bHand[i])
        if (aCardVal > bCardVal) {
            return 1
        } else if (aCardVal < bCardVal) {
            return -1
        }
    }
    return 0
}

function typeOfHand(hand: string): number {
    let handCount = howManyOfEachKind([...hand])
    if (isFiveOfAKind(handCount)) {
        return 7
    }
    if (isFourOfAKind(handCount)) {
        return 6
    }
    if (isFullHouse(handCount)) {
        return 5
    }
    if (isThreeOfAKind(handCount)) {
        return 4
    }
    if (isTwoPair(handCount)) {
        return 3
    }
    if (isOnePair(handCount)) {
        return 2
    }
    return 1
}

function isFiveOfAKind(hand: Map<string, number>): boolean {
    return Array.from(hand.values()).every((val) => val == 5)
}

function isFourOfAKind(hand: Map<string, number>): boolean {
    return Array.from(hand.values()).some((val) => val == 4)
}

function isThreeOfAKind(hand: Map<string, number>): boolean {
    return Array.from(hand.values()).some((val) => val == 3)
}

function isFullHouse(hand: Map<string, number>): boolean {
    // since we know this isn't a five or four of a kind, if we only have
    // two kinds of cards, it's a full house
    return Array.from(hand.values()).length == 2
}

function isTwoPair(hand: Map<string, number>): boolean {
    return Array.from(hand.values()).filter((val) => val == 2).length == 2
}

function isOnePair(hand: Map<string, number>): boolean {
    return Array.from(hand.values()).filter((val) => val == 2).length == 1
}

function countNumInArray(elem: string, myArray: Array<string>): number {
    let count: number = 0
    for (var e of myArray) {
        if (e == elem) {
            count++
        }
    }
    return count
}

function howManyOfEachKind(myArray: Array<string>): Map<string, number> {
    let counts = new Map<string, number>()
    let uniqElem = Array.from(new Set(myArray))
    for (var elem of uniqElem) {
        counts.set(elem, countNumInArray(elem, myArray))
    }
    return counts
}