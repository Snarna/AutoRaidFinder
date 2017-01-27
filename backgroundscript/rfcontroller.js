/*
 (c) Snarna , since 2017
*/
var RFController = {
  startOb: function(rowNum){
    chrome.storage.sync.get('RFTabID', function(obj){
      chrome.tabs.sendMessage(obj.RFTabID, {backCommand: 'startOb', obRowNum: rowNum})
    });
  },
  stopOb: function(){
    chrome.storage.sync.get('RFTabID', function(obj){
      chrome.tabs.sendMessage(obj.RFTabID, {backCommand: 'stopOb'})
    });
  },
  sendRaidIDToGame: function(raidID){
    chrome.storage.sync.get('gameTabID', function(obj){
        chrome.tabs.update(obj.gameTabID, {selected:true});
        chrome.tabs.sendMessage(obj.gameTabID, {backCommand: 'injectToGame', raidID: raidID});
    });
  }
}
