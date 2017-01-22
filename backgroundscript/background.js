/*
 (c) Snarna , since 2017
*/
//Variables
var game = {
  status: null
}

//Listen To Any Incoming Messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.userAction) {
      case "getRaidFinderTabID":
        chrome.storage.sync.set({'RFTabID':sender.tab.id});
        sendResponse({tabID: sender.tab.id});
        break;
      case "getGameTabID":
        chrome.storage.sync.set({'gameTabID': sender.tab.id});
        sendResponse({tabID: sender.tab.id});
        break;
      case "UpdateGameStatus":
        game.status = request.gameStatus;
        break;
      case "startOb":
        startOb(request.rowNum);
        sendResponse({userActionAnswer: "Backend received. Start Observation On Row:" + request.rowNum});
        break;
      case "raidFound":
        if(game.status == "idle"){
          sendRaidIDToGame(request.raidID);
          sendResponse({raidID: request.raidID});
        }
        break;
      default:
        console.log("No such command.");
        break;
    }
});

function startOb(rowNum){
  chrome.storage.sync.get('RFTabID', function(obj){
    chrome.tabs.sendMessage(obj.RFTabID, {backCommand: 'startOb', obRowNum: rowNum})
  });
}

function sendRaidIDToGame(raidID){
  chrome.storage.sync.get('gameTabID', function(obj){
      chrome.tabs.update(obj.gameTabID, {selected:true});
      chrome.tabs.sendMessage(obj.gameTabID, {backCommand: 'injectToGame', raidID: raidID});
  });
}
