CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

function getHandValue(cards) {
    var value = 0

    cards.forEach(function(card) {
        var rank = CARD_RANKS.indexOf(card['rank'].toLowerCase()) + 2;
        value += rank;
    });

    return value;
}

module.exports = {
    getHandValue: getHandValue
}
