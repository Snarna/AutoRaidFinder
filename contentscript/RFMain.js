//Run
mainLoadControl();

function checkURL(target){
  return location.href.indexOf(target);
}

function mainLoadControl(){
  //Raid Finder Main Page
  if(checkURL("gbf-raidfinder.aikats.us") != -1) {
    RFOB.ini();
  }
}
