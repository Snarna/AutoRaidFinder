/*
 (c) Snarna , since 2017
*/
var RFOB = {
  currentTabID: null,
  Ob: null,
  obConfig: null,
  obTarget: null,
  obRowNum: null,
  setRFOB: function(){
    RFOB.getCurrentTabID();
    RFOB.setConfig();
    RFOB.setOb();
    RFOB.startListen();
    console.log("RFOB in position");
  },
  getCurrentTabID: function(){
    chrome.runtime.sendMessage({userAction: 'getRaidFinderTabID'}, function(response){
      RFOB.currentTabID = response.tabID;
      console.log("RF Tab ID:" + RFOB.currentTabID);
    });
  },
  setConfig: function(){
    RFOB.obConfig = { attributes: true, childList: true, characterData: true };
  },
  setOb: function(){
    RFOB.Ob = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation) {
        var rawRaidID = mutation.addedNodes[0].innerText;
        var raidID = rawRaidID.substring(rawRaidID.length-9, rawRaidID.length);
        chrome.runtime.sendMessage({userAction: "raidFound", raidID: raidID}, function(response) {
            console.log("Received ID:" + response.raidID);
        });
      });
      //RFOB.Ob.disconnect();
    });
  },
  startListen: function(){
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'startOb'){
        RFOB.obRowNum = msg.obRowNum;
        RFOB.obTarget  = document.getElementsByClassName("mdl-list gbfrf-tweets")[RFOB.obRowNum-1];
        RFOB.startOb();
      }
      if(msg.backCommand == 'stopOb'){
        RFOB.Ob.disconnect();
        console.log("Observer Stopped");
      }
    });
  },
  startOb: function(){
    RFOB.Ob.observe(RFOB.obTarget, RFOB.obConfig);
    console.log("Ob Started On Row:" + RFOB.obRowNum);
  }
}
