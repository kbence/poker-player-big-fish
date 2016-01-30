var assert = require('assert');
var ranking = require('../ranking');

describe('getHandValue', function() {
    it('should return value of cards', function() {
        var value = ranking.getHandValue([{'rank': '3'}, {'rank': 'A'}])
        assert.equal(value, 17);
    })
})
