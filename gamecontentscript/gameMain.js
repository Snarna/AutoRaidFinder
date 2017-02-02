/*
 (c) Snarna , since 2017
*/
//Run
var currentURL = null;
mainLoadControl();
setInterval(URLWatcher,1000);

function mainLoadControl(){
  //Update currentURL
  currentURL = location.href;

  //Gather Game Tab ID
  if(checkURL("gbf.game.mbga.jp") != -1) {
    getGameTabID();
  }

  //Select And Load Content Script
  if(checkURL("#quest/assist") != -1){
    EnterClass.setEnterClass();
  }
  else if(checkURL("#raid_multi") != -1){
    BattleClass.setBattleClass();
  }
  else if(checkURL("#quest/index") != -1){
    PageClass.setPageClass();
  }
  else if(checkURL("#result_multi") != -1){
    ResultClass.setResultClass();
  }
  else{
    StatusUpdater.update("unknown");
  }
}

//Watch URL Mutation
function URLWatcher(){
  var tempURL = location.href;
  if(tempURL != currentURL){
    mainLoadControl();
  }
}

function checkURL(target){
  return location.href.indexOf(target);
}

function getGameTabID(){
  chrome.runtime.sendMessage({userAction: 'getGameTabID'}, function(response){
    EnterClass.currentTabID = response.tabID;
    console.log("Game Tab ID:" + EnterClass.currentTabID);
  });
}
