/*
 (c) Snarna , since 2017
*/
var RFOB = {
  CurrentTabID: null,
  Ob: null,
  ObConfig: null,
  ObTarget; null,
  startOb: function(rowNum){
    this.setObTarget(rowNum);
    this.Ob.observe(this.ObTarget, this.ObConfig);
    console.log("Ob Started On Row:" + this.ObTarget);
  },
  setObTarget: function(rowNum){
    this.ObTarget = document.getElementsByClassName("mdl-list gbfrf-tweets")[rowNum-1];
  },
  ini: function(){
    //Init Variables
    this.ObConfig = { attributes: true, childList: true, characterData: true };
    this.Ob = new MutationObserver(function(mutations){
      console.log("Mutation found");
      mutations.forEach(function(mutation) {
        var targetArticle = mutation.addedNodes[0].innerText;
        console.log(targetArticle);
      });
    });

    //Send Tab ID To Background
    chrome.runtime.sendMessage({userAction: 'getRaidFinderTabID'}, function(response){
      this.CurrentTabID = response.tabID;
      console.log("RF Tab ID:" + response.tabID);
    });

    //Listen to any incoming messages
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
      if(msg.backCommand == 'startOb'){
        this.obRowNum = msg.obRowNum;
        this.startOb();
        console.log("Start OB on Row:" msg.obRowNum);
      }
    });
  }
}
