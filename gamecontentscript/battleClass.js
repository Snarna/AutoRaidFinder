/*
 (c) Snarna , since 2017
*/

var BattleClass = {
  battleButton: null,
  observer: null,
  config: null,
  setBattleClass: function(){
    console.log("setBattleClass is called");
    //Update Game Status
    StatusUpdater.update("InBattle");
    BattleClass.startListen();
  },
  startListen: function(){
    BattleClass.setUpObserver();
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'startAutoAttack'){
        //Start Auto-attack
        BattleClass.setUpObserver();
      }
    });
  },
  setUpObserver: function(){
    BattleClass.battleButton = $(".btn-attack-start")[0];
    if(BattleClass.battleButton){
      BattleClass.observer = new MutationObserver(BattleClass.buttonHandler);
      BattleClass.config = {
        attributes: true,
        attributeFilter: ["class"],
        OldValue: true,
        childList: true,
        subtree: true
      };
      BattleClass.observer.observe(BattleClass.battleButton, BattleClass.config);
    }
  },
  buttonHandler: function(mutations){
    console.log("Mutation Found");
    mutations.forEach(function(mutation){
      console.log(mutation);
    });
  }
}
