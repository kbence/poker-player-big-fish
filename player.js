var Player_actions = require("./player_actions");
var ranking = require("./ranking.js");
var conf = require("./player_config");

module.exports = {

  VERSION: "The blue sea rises",

  bet_request: function(game_state, bet) {
    var action = new Player_actions(game_state);
    var handRank = ranking.getHandValue(game_state.players[game_state.in_action]["hole_cards"].concat(game_state.community_cards));
    var conf_version = "A";
    var usePreFlop = conf.getConf('use_preflop',conf_version);
    if (usePreFlop == 1 && game_state.community_cards.length==0) {
      conf_version = "A";
    } else {
      conf_version = "B";
    }

    var minimumToCheck = conf.getConf('min_check',conf_version);
    var minimumToCheckAndCall = conf.getConf('min_check_and_call',conf_version);
    var minimumToCall = conf.getConf('min_call',conf_version);
    var minimumToRaise = conf.getConf('min_raise',conf_version);
    var minimumToAllIn = conf.getConf('min_allin',conf_version);

    var min_preflop = conf.getConf('min_preflop',conf_version);

    var multiplier = conf.getConf('multiplier',conf_version);

    /*var maxPreflopBet = conf.getConf('max_preflop_bet',conf_version);

    if (usePreFlop == 1 && game_state.community_cards.length==0 && handRank >= min_preflop) {
      if (action.checkAvailable()) {
        bet(action.doCheck());
        return;
      } else if (game_state.current_buy_in <= maxPreflopBet) {
        bet(action.doCall());
        return;
      }
    }
*/

    if (handRank < minimumToCheck) {
      bet(action.doFold());
    } else if (handRank >= minimumToCheck && handRank < minimumToCall) {
      if (action.checkAvailable()) {
        bet(action.doCheck());
      } else {
        if (handRank < minimumToCheckAndCall) {
          bet(action.doFold());
        } else {
          if (game_state.minimum_raise*multiplier < game_state.current_buy_in) {
            bet(action.doCall());
          } else {
            bet(action.doFold());
          }
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
