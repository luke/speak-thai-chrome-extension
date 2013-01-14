function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  }
  return text;
}

window.addEventListener("keydown", function(event){
  var modifier = event.ctrlKey || event.metaKey;
  if (modifier && event.altKey && event.keyCode == 83){
    var selectionText = getSelectedText();
    if(selectionText){
      // alert(selectionText); 
      chrome.extension.sendRequest({selectionText: selectionText}, function(response){});  
    }
  }
}, false);