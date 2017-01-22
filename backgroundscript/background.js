/*
 (c) Snarna , since 2017
*/
//Variables
var game = {
  gameTabID: null,
  RFTabID: null,
  status: null,
  ini: function(){
    this.status = "idle";
  }
}

//Listen To Any Incoming Messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.userAction) {
      case "UpdateGameStatus":
        game.status = request.gameStatus;
        break;


      case "getRaidFinderTabID":
        chrome.storage.sync.set({'RFTabID':sender.tab.id});
        game.RFTabID = sender.tab.id;
        sendResponse({tabID: sender.tab.id});
        break;
      case "getGameTabID":
        chrome.storage.sync.set({'gameTabID': sender.tab.id});
        game.gameTabID = sender.tab.id;
        sendResponse({tabID: sender.tab.id});
        break;


      case "startOb":
        RFController.startOb(request.rowNum);
        sendResponse({userActionAnswer: "Backend received. Start Observation On Row:" + request.rowNum});
        break;
      case "raidFound":
        if(game.status == "idle"){
          RFController.sendRaidIDToGame(request.raidID);
          sendResponse({raidID: request.raidID});
        }
        break;

        
      default:
        console.log("No such command.");
        break;
    }
});
