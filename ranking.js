CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
VALUES = {
    pair: 20,
    three: 35
};

function getPairValue(cards) {
    return cards[0]['rank'] == card[1]['rank'] ? VALUES.pair : 0;
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
    getHandValue: getHandValue
}
