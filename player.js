var Player_actions = require("./player_actions");
var ranking = require("./ranking.js");
var conf = require("./player_config");

module.exports = {

  VERSION: "The blue sea rises",

  bet_request: function(game_state, bet) {
    var action = new Player_actions(game_state);
    var handRank = ranking.getHandValue(game_state.players[game_state.in_action]["hole_cards"].concat(game_state.community_cards));
    var minimumToCheck = conf.getConf('min_check');
    var minimumToCheckAndCall = conf.getConf('min_check_and_call');
    var minimumToCall = conf.getConf('min_call');
    var minimumToRaise = conf.getConf('min_raise');
    var minimumToAllIn = conf.getConf('min_allin');

    if (handRank < minimumToCheck) {
      bet(action.doFold());
    } else if (handRank >= minimumToCheck && handRank < minimumToCall) {
      if (action.checkAvailable()) {
        bet(action.doCheck());
      } else {
        if (handRank < minimumToCheckAndCall) {
          bet(action.doFold());
        } else {
          bet(action.doCall());
        }
      }
    } else if (handRank >= minimumToCall && handRank < minimumToRaise) {
      bet(action.doCall());
    } else if (handRank >= minimumToRaise && handRank < minimumToAllIn) {
      bet(action.doRaiseMin());
    } else {
      bet(action.doAllIn());
    }
  },

  showdown: function(game_state) {

  }
};
