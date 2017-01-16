$(document).ready(function(){
  $('#obsubmitbutton').click(function(){
    var rowNum = parseInt($('#obrownum').val());
    chrome.runtime.sendMessage({userAction: "startOb", rowNum: rowNum}, function(response){ handleResponse(response)});
  });

});

function handleOb(response){
  $('#backgroundresponseforob').html(response.userActionAnswer);
}
