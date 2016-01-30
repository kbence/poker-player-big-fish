module.exports = (function(){
  var c = this;

  c.conf = {
    "A": {
      min_check: 15,
      min_check_and_call: 16,
      min_call: 20,
      min_raise: 26,
      min_allin: 32,
      use_preflop: 1,
      min_preflop: 15,
      max_preflop_bet: 120,
      multiplier: 3
    },
    "B": {
      min_check: 20,
      min_check_and_call: 21,
      min_call: 24,
      min_raise: 28,
      min_allin: 34,
      use_preflop: 1,
      min_preflop: 15,
      max_preflop_bet: 120,
      multiplier: 2.5
    }
  };

  c.setConf = function(ver, key, val){
    try {
      var new_val = parseInt(val);
      if (!isNaN(new_val)) {
        c.conf[ver][key] = val;
      }
    } catch (e) {

    }
  };

  c.getConf = function(key, ver) {
    if (typeof ver == "undefined") {
      ver = "A";
    }
    if (c.conf.hasOwnProperty(ver) && c.conf[ver].hasOwnProperty(key)) {
      return c.conf[ver][key];
    } else {
      console.log("CONF KEY NOT EXIST: ",key);
      return 0;
    }
  };

  return c;
})();