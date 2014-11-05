
var speakThai = function(text){ 
  if(text.length > 100){
    alert("Please select less than 100 characters to translate");
    return; 
  }
  if(window.opera){
    return speakThaiUsingIframeHack(text); 
  }
  var url = 'https://translate.google.co.th/translate_tts?ie=UTF-8&tl=th&q='+text; 
  var audio = new Audio(url);
  audio.load(); 
  audio.play();
};

var hiddenIFrame = function(id){
  var iframe = document.getElementById(id);
  if(!iframe){
    iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.style.display = 'none'; 
    document.body.appendChild(iframe); 
  }
  return iframe; 
}

var speakThaiUsingIframeHack = function(text){  
  var iframe = hiddenIFrame('speak-thai-iframe-hack');
  iframe.src = 'https://translate.google.co.th/translate_tts?ie=UTF-8&tl=th&q='+text; 
};

speakThai = speakThaiUsingIframeHack;

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
