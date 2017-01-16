//Variables
var TabIds = {
  RFID: null,
  GameID: null
}

//Listen To Any Incoming Messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.userAction) {
      case "getRaidFinderTabID":
        chrome.storage.sync.set({'RFTabID':sender.tab.id});
        sendResponse({tabID:sender.tab.id});
      case "startOb":
        startOb(request.rowNum);
        sendResponse({userActionAnswer: "Backend received. Start Observation On Row:" + request.rowNum});
        break;
      default:
        console.log("No such command.");
    }
});

function startOb(rowNum){
  chrome.storage.sync.get('RFTabID', function(obj){
    chrome.tabs.sendMessage(obj.RFTabID, {backCommand: 'startOb', obRowNum: rowNum})
  });
}
