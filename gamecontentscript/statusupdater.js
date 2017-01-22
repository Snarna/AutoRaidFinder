/*
 (c) Snarna , since 2017
*/
var StatusUpdater = {
  update: function(gameStatus){
    chrome.runtime.sendMessage({userAction: 'UpdateGameStatus', gameStatus: gameStatus});
  }
}
