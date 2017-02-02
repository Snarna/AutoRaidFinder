/*
 (c) Snarna , since 2017
*/

var PageClass = {
  raidButton: null,
  setPageClass: function(){
    //Update Game Status
    console.log("setPageClass is called");
    StatusUpdater.update("InIndex");
    PageClass.startListen();
  },
  startListen: function(){
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'goRaidPage'){
        PageClass.goRaidPage();
      }
    });
  },
  goRaidPage: function(){
    setInterval(function(){
      PageClass.raidButton = $(".btn-multi-battle");
      if(PageClass.raidButton){
        console.log("raid button is injected");
        Injector.inject('$(".btn-multi-battle").trigger("tap")');
        Injector.inject('$(".btn-multi-battle-blink").trigger("tap")');
      }
    },1000);

  }
}
