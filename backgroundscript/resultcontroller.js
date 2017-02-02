/*
 (c) Snarna , since 2017
*/
var ResultController = {
  gatherResult: function(){
    chrome.storage.sync.get('gameTabID', function(obj){
        chrome.tabs.sendMessage(obj.gameTabID, {backCommand: 'startGatherResult'});
    });
  }
}
