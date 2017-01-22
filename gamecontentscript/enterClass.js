/*
 (c) Snarna , since 2017
*/
var EnterClass = {
  currentTabID: null,
  raidID: null,
  status: null
}

function setEnterClass(){
  //Update Game Status
  StatusUpdater.update("idle");
  startListen();
}

function startListen(){
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if(msg.backCommand == 'injectToGame'){
      setRaid(msg.raidID);
      enterBattle();
    }
  });
}

function setRaid(raidID){
  EnterClass.raidID = raidID;
}

function enterBattle(){
  joinRaid();
  selectSummon();
  finalGo();
}

function joinRaid(){
  $('.frm-battle-key')[0].value = EnterClass.raidID;
  Injector.inject("$(\".btn-post-key\").first().trigger('tap');");
}

function selectSummon(){
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
  setTimeout(selectSummon,1000);
}

function finalGo(){
  if($('.pop-deck.supporter_raid').length > 0){
    Injector.inject("$('.btn-usual-ok.se-quest-start').first().trigger('tap')");
  }
  setTimeout(finalGo, 1000);
}
