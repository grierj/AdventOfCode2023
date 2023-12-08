import * as common from "../common";

const inputFile = "./Day7/input.txt"

var cardValues = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]

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
    let handCount = howManyOfEachKind(makeBestHand([...hand]))
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
    return countHowManyOfWhat(Array.from(hand.values()), 5) == 1
}

function isFourOfAKind(hand: Map<string, number>): boolean {
    return countHowManyOfWhat(Array.from(hand.values()), 4) == 1
}

function isThreeOfAKind(hand: Map<string, number>): boolean {
    return countHowManyOfWhat(Array.from(hand.values()), 3) == 1
}

function isFullHouse(hand: Map<string, number>): boolean {
    return (
        countHowManyOfWhat(Array.from(hand.values()), 3) == 1 &&
        countHowManyOfWhat(Array.from(hand.values()), 2) == 1
    )
}

function isTwoPair(hand: Map<string, number>): boolean {
    return countHowManyOfWhat(Array.from(hand.values()), 2) == 2
}

function isOnePair(hand: Map<string, number>): boolean {
    return countHowManyOfWhat(Array.from(hand.values()), 2) == 1
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

function countHowManyOfWhat(myArray: Array<number>, ofWhat: number): number {
    let count: number = 0
    for (var e of myArray) {
        if (e == ofWhat) {
            count++
        }
    }
    return count
}

function makeBestHand(cards: Array<string>): Array<string> {
    if (cards.every(e => e != "J") || cards.every(e => e == "J")) {
        //console.log("No jokers in", cards.join(""))
        return cards
    }
    //console.log("Make best hand for", cards.join(""))
    let numJokers = cards.filter(e => e == "J").length
    let notJokers = cards.filter(e => e != "J")
    //console.log(notJokers)

    let cardCount = howManyOfEachKind(notJokers)
    //console.log(cardCount)
    let replace = ""
    // all singles, get the highest card
    if (Array.from(cardCount.keys()).length == notJokers.length) {
        replace = notJokers.sort((a, b) => cardValues.indexOf(a) - cardValues.indexOf(b)).reverse()[0]
        //console.log("Highest single:", replace)
    } else {
        replace = Array.from(cardCount.keys()).reduce((a, b) => cardCount.get(a) > cardCount.get(b) ? a : b);
        //console.log("Most cards:", replace)
    }

    for (var i = 1; i <= numJokers; i++) {
        notJokers.push(replace)
    }
    //console.log(notJokers)
    return notJokers
}