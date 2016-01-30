var assert = require('assert');
var ranking = require('../ranking');

describe('numberOfPairs', function() {
    it('should return 0 for no cards', function() {
        var cards = [{rank: '5'}, {rank: '6'}];
        assert.equal(ranking.numberOfPairs(cards), 0);
    });

    it('should return 1 if it has a pair', function() {
        var cards = [{rank: '6'}, {rank: '6'}];
        assert.equal(ranking.numberOfPairs(cards), 1);
    });

    it('should return 2 if it has two pairs', function() {
        var cards = [{rank: '6'}, {rank: '6'}, {rank: '5'}, {rank: '7'}, {rank: '7'}];
        assert.equal(ranking.numberOfPairs(cards), 2);
    });

    it('should return 2 even if it has more pairs', function() {
        var cards = [{rank: '6'}, {rank: '6'}, {rank: '5'}, {rank: '5'}, {rank: '7'}, {rank: '7'}];
        assert.equal(ranking.numberOfPairs(cards), 2);
    });
});

describe('getHandValue', function() {
    it('should return value of cards', function() {
        var value = ranking.getHandValue([{rank: '3'}, {rank: 'A'}])
        assert.equal(value, 17);
    });
})
