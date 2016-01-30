var Player_actions = require("./player_actions");
var ranking = require("./ranking.js");
var conf = require("./player_config");

module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    var action = new Player_actions(game_state);
    var handRank = ranking.getHandValue(game_state.players[game_state.in_action]["hole_cards"].concat(game_state.community_cards));
    var minimumToCall = conf.getConf('min_call');
    var minimumToRaise = conf.getConf('min_raise');

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
