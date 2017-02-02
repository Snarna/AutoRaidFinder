/*
 (c) Snarna , since 2017
*/
var PageController = {
  goRaidPage: function(){
    chrome.storage.sync.get('gameTabID', function(obj){
        chrome.tabs.sendMessage(obj.gameTabID, {backCommand: 'goRaidPage'});
    });
  }
}
