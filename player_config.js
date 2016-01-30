module.exports = (function(){
  var c = this;

  c.conf = {
    min_call: 22,
    min_raise: 36
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