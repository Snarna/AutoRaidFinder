var battleClass = {
  currentTabID: null,
  raidID: null,
  status: null,
  enterBattle: function(){

  }
  joinRaid: function(){
    $('.frm-battle-key')[0].value = this.raidID;
    Injector.inject("$(\".btn-post-key\").first().trigger('tap');");
  }
}

function setBattleClass(){
  getGameTabID();
  startListen();
}

function getGameTabID(){
  chrome.runtime.sendMessage({userAction: 'getGameTabID'}, function(response){
    battleClass.currentTabID = response.tabID;
    console.log("Game Tab ID:" + battleClass.currentTabID);
  });
}

function startListen(){
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if(msg.backCommand == 'injectToGame'){
      setRaid(msg.targetid);
      enterBattle();
    }
  });
}

function setRaid(raidID){
  battleClass.raidID = raidID;
}
