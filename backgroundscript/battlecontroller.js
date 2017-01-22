/*
 (c) Snarna , since 2017
*/
var BattleController = {
  startAutoAttack: function(){
    chrome.storage.sync.get('gameTabID', function(obj){
        chrome.tabs.update(obj.gameTabID, {selected:true});
        chrome.tabs.sendMessage(obj.gameTabID, {backCommand: 'startAutoAttack'});
    });
  }
}
