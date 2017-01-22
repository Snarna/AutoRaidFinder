/*
 (c) Snarna , since 2017
*/
//Run
mainLoadControl();

function checkURL(target){
  return location.href.indexOf(target);
}

function getGameTabID(){
  chrome.runtime.sendMessage({userAction: 'getGameTabID'}, function(response){
    enterClass.currentTabID = response.tabID;
    console.log("Game Tab ID:" + enterClass.currentTabID);
  });
}

function mainLoadControl(){
  //Raid Finder Main Page
  if(checkURL("gbf.game.mbga.jp") != -1) {
    getGameTabID();
  }
  if(checkURL("#quest/assist")){
    setEnterClass();
  }
  if(checkURL("#raid_multi")){
    setBattleClass();
  }
}
