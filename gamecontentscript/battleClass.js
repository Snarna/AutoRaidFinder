/*
 (c) Snarna , since 2017
*/

var battleClass = {

}

function setBattleClass(){
  //Update Game Status
  StatusUpdater.update("InBattle");
  startListen();
}

function startListen(){
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if(msg.backCommand == 'startAutoAttack'){
      //Start Auto-attack
    }
  });
}
