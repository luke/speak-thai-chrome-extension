
var speakThai = function(text){
  var url = 'http://translate.google.co.th/translate_tts?ie=UTF-8&tl=th&q='+text; 
  var audio = new Audio(url);
  audio.play();
};

chrome.contextMenus.create({
  "title" : "Speak Thai",
  "contexts" : ["selection"],
  onclick: function(info, tab) { speakThai(info.selectionText); }
});

var handleRequest = function(request, sender, sendResponse){ 
  if(request.selectionText){ 
    speakThai(request.selectionText); 
  }; 
};

chrome.extension.onRequest.addListener(handleRequest);

