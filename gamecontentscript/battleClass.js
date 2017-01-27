/*
 (c) Snarna , since 2017
*/

var BattleClass = {
  battleButton: null,
  observer: null,
  ini: function(){
    this.battleButton = $(".btn-attack-start");
    if(this.battleButton){
      this.observer = new MutationObserver(BattleClass.buttonHandler);
      var config = {
        attributes: true,
        attributeFilter: ["class"],
        OldValue: true,
        childList: true,
        subtree: true
      };
      observer.observe(this.battleButton, config);
    }
  }
  buttonHandler: function(mutations){
    mutations.forEach(function(mutation){
      console.log(mutation);
    });
  }
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
      BattleClass.ini();
    }
  });
}
