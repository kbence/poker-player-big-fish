CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

function fromArray(arr) {
    return function(c) {
        return arr[c];
    }
}

function between(min, max, num) {
    return num >= min && num <= max;
}

function containsAny(array, items) {
    for (var i = 0; i < items.length; i++) {
        if (array.indexOf(items[i]) >= 0)
            return true;
    }

    return false;
}

function numberOfKinds(cards, kind, ignoreOwn) {
    var result = 0;
    var groups = groupBy(cards, 'rank');

    for (var rank in groupBy(cards, 'rank')) {
        if (between(0, 1, groups[rank].indexOf(cards[0])) ||
            between(0, 1, groups[rank].indexOf(cards[1])))
        {
            if (groups[rank].length == kind)
                result++;
        }
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

function sum(a, b) {
    return a + b;
}

function byNumber(a, b) {
    return a - b;
}

function rankToValue(str) {
    return CARD_RANKS.indexOf(str.toLowerCase()) + 2;
}

function valueToRank(num) {
    return CARD_RANKS[num - 2];
}

function numericValue(card) {
    return rankToValue(card['rank']);
}

WEIGHTS = {
    numberOfPairs: fromArray([0, 10, 30]),
    numberOfDrills: fromArray([0, 35]),
    numberOfPokers: fromArray([0, 200]),
    numberOfFlushes: fromArray([0, 120]),
    numberOfFulls: fromArray([0, 160]),
    numberOfStraights: fromArray([0, 80])
};

COUNTERS = {
    numberOfPairs: function(cards) {
        return numberOfKinds(cards, 2);
    },

    numberOfDrills: function(cards) {
        return numberOfKinds(cards, 3);
    },

    numberOfPokers: function(cards) {
        return numberOfKinds(cards, 4);
    },

    numberOfFlushes: function(cards) {
        var result = 0;
        var groups = groupBy(cards, 'suit');

        for (var suit in groupBy(cards, 'suit')) {
            if (groups[suit].length >= 5) result++;
        }

        return Math.min(2, result);
    },

    numberOfFulls: function(cards) {
        var kinds = groupBy(cards, 'rank');
        var foundPair = false, foundDrill = false, containsOwn = false;
        var ownCards = cards.slice(0, 2);

        for (var k in kinds) {
            var kind = kinds[k];

            if (kind.length == 2) {
                foundPair = true;
                if (containsAny(kind, ownCards)) { containsOwn = true; }
            }

            if (kind.length == 3) {
                foundDrill = true;
                if (containsAny(kind, ownCards)) { containsOwn = true; }
            }
        }

        return (foundPair && foundDrill && containsOwn) ? 1 : 0;
    },

    numberOfStraights: function(cards) {
        var ranks = Object.keys(groupBy(cards, 'rank')).map(rankToValue).sort(byNumber);
        var consecutives = [], last = -1;

        ranks.forEach(function(r) {
            consecutives = (r == last + 1) ? consecutives.concat([r]) : [r];
            last = r;
        })

        consecutives = consecutives.map(valueToRank);

        if (consecutives.length >= 5 &&
            (consecutives.indexOf(cards[0].rank.toLowerCase()) >= 0 || consecutives.indexOf(cards[1].rank.toLowerCase()) >= 0))
        {
            return 1;
        }

        return 0;
    }
}

function getPairValue(cards) {
    return numberOfPairs(cards) * VALUES.pair;
}

function getHandValue(cards) {
    var value = cards.slice(0, 2).map(numericValue).reduce(sum);

    for (var func in COUNTERS) {
        value += WEIGHTS[func](COUNTERS[func](cards));
    }

    return value;
}

module.exports = {
    numberOfPairs: COUNTERS.numberOfPairs,
    numberOfDrills: COUNTERS.numberOfDrills,
    numberOfPokers: COUNTERS.numberOfPokers,
    numberOfFlushes: COUNTERS.numberOfFlushes,
    numberOfFulls: COUNTERS.numberOfFulls,
    numberOfStraights: COUNTERS.numberOfStraights,
    getHandValue: getHandValue
}
