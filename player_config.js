module.exports = (function(){
  var c = this;

  c.conf = {
    min_check: 22,
    min_check_and_call: 28,
    min_call: 30,
    min_raise: 32,
    min_allin: 40
  };

  c.setConf = function(key, val){
    try {
      c.conf[key] = val;
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