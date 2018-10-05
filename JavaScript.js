String.prototype.capitalize = function(){ return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase(); }
String.prototype.to_url = function(){ return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim(); }
String.prototype.to_path = function(){ return this.toLowerCase().replace(/ /g,".").replace(/[^0-9a-z\.]/gi,"").trim(); }
String.prototype.replace_all = function(search, replacement){ return `${this}`.split(search).join(replacement); };

// Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
this.extractRootDomain = function(url)
{
  var domain = this.extractHostname(url),
  splitArr = domain.split('.'),
  arrLen = splitArr.length;
  // extracting the root domain here
  // if there is a subdomain 
  if (arrLen > 2) 
  {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2)
    {
      // this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }
  return domain;
}

// Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
this.extractHostname = function(url)
{
  var hostname;
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }
  // find & remove port number
  hostname = hostname.split(':')[0];
  // find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

// Load XML
this.loadXML = function()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
        {
            if (window.DOMParser)
            {
                new Build(new DOMParser().parseFromString(xhttp.responseText, "text/xml"));
            }
            else // IE
            {
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = false;
                xml.loadXML(xhttp.responseText);
            }
        }
    };

    xhttp.open("GET", "path/xmlfile.xml", true);
    xhttp.send();
}

// Convert XML to JS Object
// Source: https://stackoverflow.com/questions/4200913/xml-to-javascript-object
function Parse(xml, arrayTags)
{
    function isArray(o){ return Object.prototype.toString.apply(o) === '[object Array]'; }

    function parseNode(xmlNode, result)
    {
        if (xmlNode.nodeName == "#text"){
            if (xmlNode.nodeValue.trim()) { result['value'] = xmlNode.nodeValue; }
            return;
        }

        let jsonNode = {};
        let current = result[xmlNode.nodeName];
        
        if(current)
        {
            if(!isArray(current))
                result[xmlNode.nodeName] = [current, jsonNode];
            else
                result[xmlNode.nodeName].push(jsonNode);
        }
        else
        {
            if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
                result[xmlNode.nodeName] = [jsonNode];
            else
                result[xmlNode.nodeName] = jsonNode;
        }

        if(xmlNode.attributes){
            for(var i = 0; i < xmlNode.attributes.length; i++){
                jsonNode[xmlNode.attributes[i].nodeName] = xmlNode.attributes[i].nodeValue;
            }
        }

        for(i = 0; i < xmlNode.childNodes.length; i++){
            parseNode(xmlNode.childNodes[i], jsonNode);
        }
    }

    var result = {};
    if(xml.childNodes.length){ parseNode(xml.childNodes[0], result); }

    return result;
}



