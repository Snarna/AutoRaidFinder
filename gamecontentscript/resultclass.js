/*
 (c) Snarna , since 2017
*/

var ResultClass = {
  setResultClass: function(){
    //Update Game Status
    console.log("setResultClass is called");
    StatusUpdater.update("InResult");
    ResultClass.startListen();
  },
  startListen: function(){
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'startGatherResult'){
        ResultClass.gatherResult();
      }
    });
  },
  gatherResult: function(){
    setTimeout(ResultClass.clickOkButton,3000);
    setTimeout(ResultClass.clickQuestButton,6000);
  },
  clickOkButton: function(){
    setInterval(function(){
      var okButton = $(".btn-usual-ok");
      if(okButton){
        Injector.inject('$(".btn-usual-ok").trigger("tap");');
      }
    },1000);
  },
  clickQuestButton: function(){
    setInterval(function(){
      var questButton = $(".btn-control").eq(0);
      if(questButton){
        Injector.inject('$(".btn-control").eq(0).trigger("tap")');
      }
    },1000);
  }
}
