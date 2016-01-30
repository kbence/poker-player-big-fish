module.exports = (function(){
  var c = this;

  c.conf = {
    min_check: 20,
    min_check_and_call: 22,
    min_call: 26,
    min_raise: 30,
    min_allin: 40
  };

  c.setConf = function(key, val){
    try {
      var new_val = parseInt(val);
      if (!isNaN(new_val)) {
        c.conf[key] = val;
      }
    } catch (e) {

    }
  };

  c.getConf = function(key) {
    if (c.conf.hasOwnProperty(key)) {
      return c.conf[key];
    } else {
      console.log("CONF KEY NOT EXIST: ",key);
      return 0;
    }
  };

  return c;
})();