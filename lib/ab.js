(function (window, as) {

  window[as] = window[as] || {};

  function getRandomInt() {
    try {
      var arr = new Uint16Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] / 65536;
    } catch (e) {
      return Math.random();
    }
  }

  window[as].test = function (variants, frequency) {
    var rand = Math.random();
    
    if (rand > 0.0001) {
      rand = Math.random();

      if (rand < frequency) {
        rand = getRandomInt();
        return variants[Math.floor(rand * variants.length)];
      }
    }

    return null;
  };

}(window, 'AB'));