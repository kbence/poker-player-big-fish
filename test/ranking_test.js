var assert = require('assert');
var ranking = require('../ranking');

var CARD_SUITS = {'h': 'hearts', 'c': 'clubs', 's': 'spades', 'd': 'diamonds'};

function createCard(code) {
    var suit = CARD_SUITS[code.charAt(0)];
    var rank = code.substr(1);

    return {rank:rank, suit:suit};
}

describe('numberOfPairs', function() {
    var CASES = [
        { input: ['H5', 'H6'], output: 0 },
        { input: ['C6', 'H6'], output: 1 },
        { input: ['C6', 'H6', 'C5', 'D7', 'H7'], output: 2 },
        { input: ['C6', 'H6', 'C5', 'D5', 'D7', 'H7'], output: 2 },
    ];

    for (var c = 0; c < CASES.length; c++) {
        (function(Case) {
            it('should return ' + Case.output + ' for ' + Case.input.join(', '), function() {
                var input = Case.input;
                input = Case.input.map(createCard);
                assert.equal(Case.output, ranking.numberOfPairs(input))
            })
        })(CASES[c]);
    }
});

describe('getHandValue', function() {
    it('should return value of cards', function() {
        var value = ranking.getHandValue([{rank: '3'}, {rank: 'A'}])
        assert.equal(value, 17);
    });
})
