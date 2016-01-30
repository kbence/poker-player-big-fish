var assert = require('assert');
var ranking = require('../ranking');

var CARD_SUITS = {'h': 'hearts', 'c': 'clubs', 's': 'spades', 'd': 'diamonds'};

function createCard(code) {
    var suit = CARD_SUITS[code.charAt(0).toLowerCase()];
    var rank = code.substr(1);

    return {rank:rank, suit:suit};
}

function forAllCases(cases, func) {
    for (var c = 0; c < cases.length; c++) {
        (function(Case) {
            it('should return ' + Case.output + ' for ' + Case.input.join(', '), function() {
                var input = Case.input.map(createCard);
                assert.equal(Case.output, func(input));
            })
        })(cases[c]);
    }
}

describe('numberOfPairs', function() {
    var CASES = [
        { input: ['H5', 'H6'], output: 0 },
        { input: ['C6', 'H6'], output: 1 },
        { input: ['C6', 'H6', 'C5', 'D7', 'H7'], output: 2 },
        { input: ['C6', 'H6', 'C5', 'D5', 'D7', 'H7'], output: 2 },
        { input: ['C6', 'H6', 'C6', 'D7', 'H7'], output: 1 },
    ];

    forAllCases(CASES, ranking.numberOfPairs);
});

describe('numberOfDrills', function() {
    var CASES = [
        { input: ['H5', 'H6'], output: 0 },
        { input: ['C6', 'H6', 'C5', 'D7', 'H7'], output: 0 },
        { input: ['C6', 'H6', 'C6', 'D7', 'H7'], output: 1 },
    ];

    forAllCases(CASES, ranking.numberOfDrills);
});

describe('numberOfPokers', function() {
    var CASES = [
        { input: ['H3', 'H6', 'H7', 'D9', 'HK'], output: 0 },
        { input: ['DA', 'HA', 'SA', 'CA', 'HK'], output: 1 },
    ];

    forAllCases(CASES, ranking.numberOfPokers);
});

describe('numberOfFlushes', function() {
    var CASES = [
        { input: ['H5', 'H6'], output: 0 },
        { input: ['H3', 'H6', 'H7', 'D9', 'HK'], output: 0 },
        { input: ['H3', 'H6', 'H7', 'H9', 'HK'], output: 1 },
    ];

    forAllCases(CASES, ranking.numberOfFlushes);
});

describe('getHandValue', function() {
    var CASES = [
        { input: ['D3', 'HA'], output: 17 }
    ];

    forAllCases(CASES, ranking.getHandValue);
})
