(function (window, as) {
  window[as] = window[as] || {};

  window[as].track = function (data, callback) {
    if(!callback) callback = function(){};
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://demoabtest.subkit.io/events/emit/AB-css-colored-button');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-subkit-event-persistent', 'true');
    xhr.onload = function(){
      if(xhr.status === 201) callback(null, JSON.parse(xhr.responseText));
    };
    xhr.onerror = function(e){
      callback(e);
    };
    xhr.send(JSON.stringify(data));
  };

}(window, 'AB'));