/*
 (c) Snarna , since 2017
*/
var StatusUpdater = {
  update: function(gameStatus){
    console.log("Updating Game Status To:" + gameStatus);
    chrome.runtime.sendMessage({userAction: 'UpdateGameStatus', gameStatus: gameStatus});
  }
}
