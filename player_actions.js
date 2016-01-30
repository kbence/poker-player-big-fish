module.exports = function(game_state){

  //module object
  var g = this;
  
  //current game_state
  g.game_state = game_state;
  
  g.bet = parseInt(game_state.players[game_state.in_action]["bet"], 10);
  g.current_buy_in = parseInt(game_state.current_buy_in, 10);
  g.minimum_raise = parseInt(game_state.minimum_raise, 10);
  
  //fold cards
  g.doFold = function() {
    return 0;
  };
  
  //check available in this turn?
  g.checkAvailable = function() {
    return (g.current_buy_in == g.bet);
  };
  
  // call only if checkAvailable is true! otherwise cards folded
  g.doCheck = function() {
    return 0;
  };
  
  g.doCall = function() {
    return g.minimumBet();
  };

  g.minimumBet = function() {
    var min_bet = g.current_buy_in-g.bet;
    if (min_bet <= 0) {
      return g.doCheck();
    } else {
      return min_bet;
    }
  };
  
  g.doRaiseMin = function() {
    return g.current_buy_in - g.bet + g.minimum_raise;
  };
  
  //TODO: FIX MAX RAISE!
  g.doRaiseMax = function() {
    return g.doRaiseMin();
  };
  
  g.doAllIn = function() {
    return 10000;
  };
  
  //TODO: RAISE BASED ON PERCENT OF STACK
  g.doRaisePercent = function() {
  	return g.doRaiseMin();
  };
  
  //export module object
  return g;
};
