/*
 (c) Snarna , since 2017
*/
var EnterClass = {
  currentTabID: null,
  raidID: null,
  status: null,
  setEnterClass: function(){
    //Update Game Status
    console.log("setEnterClass is called");
    StatusUpdater.update("idle");
    EnterClass.startListen();
  },
  startListen: function(){
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'injectToGame'){
        EnterClass.raidID = msg.raidID;
        EnterClass.enterBattle();
      }
    });
  },
  enterBattle: function(){
    EnterClass.joinRaid();
    EnterClass.selectSummon();
    EnterClass.finalGo();
  },
  joinRaid: function(){
    $('.frm-battle-key')[0].value = EnterClass.raidID;
    console.log("joinRaid button click");
    Injector.inject("$(\".btn-post-key\").first().trigger('tap');");
  },
  selectSummon: function(){
    var intHandle = setInterval(function(){
      var temp = $(".btn-supporter.lis-supporter[data-attribute='5']");
      if(temp){
        /*
        //data-attribute == 5 is light
        $(".btn-supporter.lis-supporter[data-attribute='5']").each(function(index, object){
          //2040056000 == Lucifer
          if($(object).find("div.prt-summon-image").attr("data-image") == "2040056000"){
              //Select Lucifer
              console.log("selectSummon button click");
              Injector.inject("$($(\".btn-supporter.lis-supporter[data-attribute='5']\").get(5)).trigger('tap');");
              //Exit Loop
              clearInterval(intHandle);
          }
        });
      }*/
        //Select Lucifer
        console.log("selectSummon button click");
        Injector.inject("$(\".btn-supporter.lis-supporter[data-attribute='5']\").eq(0).trigger('tap');");
      }
    },1500);
  },
  finalGo: function(){
    var intHandle = setInterval(function(){
      var temp = $('.pop-deck.supporter_raid');
      if(temp){
        console.log("finalGo button click");
        Injector.inject("$('.btn-usual-ok.se-quest-start').first().trigger('tap')");
      }
    },1500);
  }
}
