/*
 (c) Snarna , since 2017
*/
//Variables
var game = {
  gameTabID: null,
  RFTabID: null,
  status: null,
  userFlag: 0
}

//Listen To Any Incoming Messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.userAction) {
      //From Game Content Script
      case "UpdateGameStatus":
        game.status = request.gameStatus;
        if((game.status == 'idle' || game.status == 'unknown') && game.userFlag == 1){
          //Do nothing, wait
        }
        else if(game.status == 'InBattle' && game.userFlag == 1){
          BattleController.startAutoAttack();
        }
        else if(game.status == 'InResult' && game.userFlag == 1){
          ResultController.gatherResult();
        }
        else if(game.status == 'InIndex' && game.userFlag == 1){
          PageController.goRaidPage();
        }
        break;

      //Get IDs
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

      //From Popup
      case "stopOb":
        RFController.stopOb();
        game.userFlag = 0;
        break;
      case "startOb":
        RFController.startOb(request.rowNum);
        game.userFlag = 1;
        sendResponse({userActionAnswer: "Backend received. Start Observation On Row:" + request.rowNum});
        break;
      case "raidFound":
        if(game.status == "idle" && game.userFlag == 1){
          RFController.sendRaidIDToGame(request.raidID);
          sendResponse({raidID: request.raidID});
        }
        else{
          sendResponse({raidID: "Unsupported game status:" + game.status + " " + game.userFlag});
        }
        break;


      default:
        console.log("No such command.");
        break;
    }
});
