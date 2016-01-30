var Player_actions = require("./player_actions");
var ranking = require("./ranking.js");
var minimumToCall = 10;
var minimumToRaise = 20;

module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    var action = new Player_actions(game_state);
    var handRank = ranking.getHandValue(game_state.players[game_state.in_action]["hole_cards"]);

    if (handRank < minimumToCall) {
      bet(action.doFold());
    } else if (handRank >= minimumToCall && handRank < minimumToRaise) {
      bet(action.doCall());
    } else {
      bet(action.doAllIn());
    }
  },

  showdown: function(game_state) {

  }
};
