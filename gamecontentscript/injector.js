/*
 (c) Snarna , since 2017
*/
var Injector = {
  inject: function(inCode){
    var script = document.createElement('script');
    script.innerHTML = inCode;
    document.body.appendChild(script);
  }
}
