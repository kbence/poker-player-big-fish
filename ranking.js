CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

function fromArray(arr) {
    return function(c) {
        return arr[c];
    }
}

function numberOfKinds(cards, kind) {
    var result = 0;
    var groups = groupBy(cards, 'rank');

    for (var rank in groupBy(cards, 'rank')) {
        if (groups[rank].length == kind) result++;
    }

    return Math.min(2, result);
}

function groupBy(items, field) {
    var results = {};

    items.forEach(function(item) {
        var key = item[field];
        if (!results[key])
            results[key] = [];

        results[key].push(item);
    });

    return results;
}

WEIGHTS = {
    numberOfPairs: fromArray([0, 10, 30]),
    numberOfDrills: fromArray([0, 35])
};

COUNTERS = {
    numberOfPairs: function(cards) {
        return numberOfKinds(cards, 2);
    },

    numberOfDrills: function(cards) {
        return numberOfKinds(cards, 3);
    }
}

function getPairValue(cards) {
    return numberOfPairs(cards) * VALUES.pair;
}

function getHandValue(cards) {
    var value = 0

    cards.forEach(function(card) {
        var rank = CARD_RANKS.indexOf(card['rank'].toLowerCase()) + 2;
        value += rank;
    });

    for (var func in COUNTERS) {
        value += WEIGHTS[func](COUNTERS[func](cards));
    }

    return value;
}

module.exports = {
    numberOfPairs: COUNTERS.numberOfPairs,
    numberOfDrills: COUNTERS.numberOfDrills,
    getHandValue: getHandValue
}
