CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
VALUES = {
    pair: 20,
    three: 35
};

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

function numberOfPairs(cards) {
    var result = 0;
    var groups = groupBy(cards, 'rank');

    for (var rank in groupBy(cards, 'rank')) {
        if (groups[rank].length == 2) result++;
    }

    return Math.min(2, result);
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

    value += getPairValue(cards);

    return value;
}

module.exports = {
    numberOfPairs: numberOfPairs,
    getHandValue: getHandValue
}
