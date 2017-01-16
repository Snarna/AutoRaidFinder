//Variables
var TabIds = {
  RFID: null,
  GameID: null
}

//Listen To Any Incoming Messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.userAction) {
      case "startOb":
        startOb(request.rowNum);
        break;
      default:
        console.log("No such command.");
    }
});

function startOb(rowNum){
  
}
