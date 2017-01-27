/*
 (c) Snarna , since 2017
*/
var EnterClass = {
  currentTabID: null,
  raidID: null,
  status: null,
  setEnterClass: function(){
    //Update Game Status
    StatusUpdater.update("idle");
    EnterClass.startListen();
  },
  startListen: function(){
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'injectToGame'){
        EnterClass.raidID = raidID;
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
    Injector.inject("$(\".btn-post-key\").first().trigger('tap');");
  },
  selectSummon: function(){
    if($(".btn-supporter.lis-supporter[data-attribute='5']").length > 0){
      //data-attribute == 5 is light
      $(".btn-supporter.lis-supporter[data-attribute='5']").each(function(index, object){
        //2040056000 == Lucifer
        if($(object).find("div.prt-summon-image").attr("data-image") == "2040056000"){
            //Select Lucifer
            Injector.inject("$($(\".btn-supporter.lis-supporter[data-attribute='5']\").get(5)).trigger('tap');");
            //Exit Loop
            return false;
        }
      });
    }
    setTimeout(EnterClass.selectSummon,1000);
  },
  finalGo: function(){
    if($('.pop-deck.supporter_raid').length > 0){
      Injector.inject("$('.btn-usual-ok.se-quest-start').first().trigger('tap')");
    }
    setTimeout(EnterClass.finalGo, 1000);
  }
}
