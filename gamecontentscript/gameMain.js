/*
 (c) Snarna , since 2017
*/
//Run
mainLoadControl();

function checkURL(target){
  return location.href.indexOf(target);
}

function mainLoadControl(){
  //Raid Finder Main Page
  if(checkURL("gbf.game.mbga.jp") != -1) {
    setBattleClass();
  }
}
