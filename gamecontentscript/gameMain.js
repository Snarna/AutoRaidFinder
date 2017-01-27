/*
 (c) Snarna , since 2017
*/
//Run
mainLoadControl();

function mainLoadControl(){
  //Raid Finder Main Page
  if(checkURL("gbf.game.mbga.jp") != -1) {
    getGameTabID();
  }
  if(checkURL("#quest/assist") != -1){
    EnterClass.setEnterClass();
  }
  if(checkURL("#raid_multi") != -1){
    BattleClass.setBattleClass();
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
