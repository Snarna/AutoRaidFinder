/*
 (c) Snarna , since 2017
*/
var RFOB = {
  currentTabID: null,
  Ob: null,
  obConfig: null,
  obTarget: null,
  obRowNum: null,
  startOb: function(){
    this.Ob.observe(this.obTarget, this.obConfig);
    console.log("Ob Started On Row:" + this.obRowNum);
  }
}

function setRFOB(){
    getCurrentTabID();
    setConfig();
    setOb();
    startListen();
    console.log("RFOB in position");
}

function getCurrentTabID(){
  chrome.runtime.sendMessage({userAction: 'getRaidFinderTabID'}, function(response){
    RFOB.currentTabID = response.tabID;
    console.log("RF Tab ID:" + RFOB.currentTabID);
  });
}

function setConfig(){
  RFOB.obConfig = { attributes: true, childList: true, characterData: true };
}

function setOb(){
  RFOB.Ob = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation) {
      var rawRaidID = mutation.addedNodes[0].innerText;
      var raidID = rawRaidID.substring(rawRaidID.length-8, rawRaidID.length);
      chrome.runtime.sendMessage({userAction: "raidFound", raidID: raidID},
        function(response) {
          console.log("Received ID:" + response.raidID);
      });
    });
  });
}

function startListen(){
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if(msg.backCommand == 'startOb'){
      RFOB.obRowNum = msg.obRowNum;
      RFOB.obTarget  = document.getElementsByClassName("mdl-list gbfrf-tweets")[RFOB.obRowNum-1];
      RFOB.startOb();
    }
  });
}
