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
    var intHandle = setInterval(function(){
      BattleClass.battleButton = $(".btn-attack-start")[0];
      if(BattleClass.battleButton){
        BattleClass.observer = new MutationObserver(BattleClass.buttonHandler);
        BattleClass.config = {
              attributes: true,
              attributeFilter: ["class"],
              attributeOldValue: true
          };
        BattleClass.observer.observe(BattleClass.battleButton, BattleClass.config);
        clearInterval(intHandle);
      }
    }, 500);
  },
  buttonHandler: function(mutations){
    mutations.forEach(function(mutation){
      if (mutation.target.className.indexOf("display-on") != -1){
        //Trigger Attack
        
      }
    });
  }
}
