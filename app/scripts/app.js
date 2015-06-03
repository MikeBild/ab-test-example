(function(){
  'use strict';

  var cssClass = 'default';

  //a simple simulator
  setInterval(function() {
    // run a/b test to select css class name
    cssClass = AB.test(['default','primary','success','info','warning','danger','link'], 1);
    // update ui
    document.getElementById('example').className = 'btn btn-lg btn-' + cssClass;
    // log shown variant
    AB.track({shown:cssClass});
  }, 5000);

  document.getElementById('example').onclick = function () {
    // log chosen variant 
    AB.track({chose:cssClass});
  };

}());