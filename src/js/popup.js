/*
 (c) Snarna , since 2017
*/
$(document).ready(function(){
  $('#obsubmitbutton').click(function(){
    var rowNum = parseInt($('#obrownum').val());
    chrome.runtime.sendMessage({userAction: "startOb", rowNum: rowNum}, function(response){ handleOb(response)});
  });
  $('#obstopbutton').click(function(){
    chrome.runtime.sendMessage({userAction: "stopOb"});
  });
});

function handleOb(response){
  $('#backgroundresponseforob').html(response.userActionAnswer);
}
