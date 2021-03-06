
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}
// Copy to the clipboard in text format
function copyTitleURL() {
  chrome.tabs.getSelected(null, function(tab) {
  	//var s=tab.url;
  	var s1=extractHostname(tab.url);
  	var s2=extractRootDomain(tab.url);
    copyToClipboard( s2 + "\n" + tab.title );    
  });
}


function copyToClipboard(str) {
    var obj=document.getElementById("clipboard");

    if( obj ) {
        obj.value = str;
        obj.select();
        document.execCommand("copy", false, null);
    }
}

// Create the context menu.


var title="Copy URL"
var parent = chrome.contextMenus.create({"title": title});

var child8 = chrome.contextMenus.create(
  {"title": "Page Title and Domain", "parentId": parent, "onclick": copyTitleURL});
