var ExactMetrics=function(){var lastClicked=[];var internalAsOutboundCategory='';var beforeUnloadChanged=false;this.setLastClicked=function(valuesArray,fieldsArray,tracked){valuesArray=typeof valuesArray!=='undefined'?valuesArray:[];fieldsArray=typeof fieldsArray!=='undefined'?fieldsArray:[];tracked=typeof tracked!=='undefined'?tracked:false;lastClicked.valuesArray=valuesArray;lastClicked.fieldsArray=fieldsArray;};this.getLastClicked=function(){return lastClicked;};this.setInternalAsOutboundCategory=function(category){internalAsOutboundCategory=category;};this.getInternalAsOutboundCategory=function(){return internalAsOutboundCategory;};this.sendEvent=function(type,action,fieldsArray){__gtagTrackerSend(type,action,fieldsArray,[]);};function __gtagTrackerIsDebug(){if(window.exactmetrics_debug_mode){return true;}else{return false;}}
function cloneFields(fields,allowedKeys,disallowedKeys){var clone={};for(var key in fields){if(!fields.hasOwnProperty(key)){continue}
if(allowedKeys&&allowedKeys.indexOf(key)===-1){continue}
if(disallowedKeys&&disallowedKeys.indexOf(key)>-1){continue}
clone[key]=fields[key];}
return clone;}
function __gtagMaybeTrackerV4(type,action,fieldsArray){if(!exactmetrics_frontend.v4_id||type!=='event'){return;}
var eventCategory=fieldsArray.event_category||'';var fieldsToRemove=['event_name','event_category','event_label','value',];var fields=cloneFields(fieldsArray,null,fieldsToRemove);fields.action=action;fields.send_to=exactmetrics_frontend.v4_id;let hitType=eventCategory.replace('-','_');if(eventCategory.indexOf('outbound-link')!==-1){hitType='click'}else if(eventCategory==='download'){hitType='file_download'}
__gtagTracker(type,hitType,fields);}
function __gtagMaybeTrackerUA(type,action,fieldsArray){if(!exactmetrics_frontend.ua){return;}
var allowedFields=['event_category','event_label','value',];var uaFields=cloneFields(fieldsArray,allowedFields);uaFields.send_to=exactmetrics_frontend.ua;__gtagTracker(type,action,uaFields);}
function __gtagTrackerSendDual(type,action,fieldsArray,valuesArray){type=typeof type!=='undefined'?type:'event';action=typeof action!=='undefined'?action:'';valuesArray=typeof valuesArray!=='undefined'?valuesArray:[];fieldsArray=typeof fieldsArray!=='undefined'?fieldsArray:{};__gtagMaybeTrackerUA(type,action,fieldsArray);__gtagMaybeTrackerV4(type,action,fieldsArray);lastClicked.valuesArray=valuesArray;lastClicked.fieldsArray=fieldsArray;lastClicked.fieldsArray.event_action=action;lastClicked.tracked=true;__gtagTrackerLog('Tracked: '+valuesArray.type);__gtagTrackerLog(lastClicked);}
function __gtagTrackerSend(type,action,fieldsArray,valuesArray){type=typeof type!=='undefined'?type:'event';action=typeof action!=='undefined'?action:'';valuesArray=typeof valuesArray!=='undefined'?valuesArray:[];fieldsArray=typeof fieldsArray!=='undefined'?fieldsArray:{};__gtagTracker(type,action,fieldsArray);lastClicked.valuesArray=valuesArray;lastClicked.fieldsArray=fieldsArray;lastClicked.fieldsArray.event_action=action;lastClicked.tracked=true;__gtagTrackerLog('Tracked: '+valuesArray.type);__gtagTrackerLog(lastClicked);}
function __gtagTrackerNotSend(valuesArray){valuesArray=typeof valuesArray!=='undefined'?valuesArray:[];lastClicked.valuesArray=valuesArray;lastClicked.fieldsArray=[];lastClicked.tracked=false;__gtagTrackerLog('Not Tracked: '+valuesArray.exit);__gtagTrackerLog(lastClicked);}
function __gtagTrackerLog(message){if(__gtagTrackerIsDebug()){console.dir(message);}}
function __gtagTrackerStringTrim(x){return x.replace(/^\s+|\s+$/gm,'');}
function __gtagTrackerGetDomain(){var i=0,currentdomain=document.domain,p=currentdomain.split('.'),s='_gd'+(new Date()).getTime();while(i<(p.length-1)&&document.cookie.indexOf(s+'='+s)==-1){currentdomain=p.slice(-1-(++i)).join('.');document.cookie=s+"="+s+";domain="+currentdomain+";";}
document.cookie=s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+currentdomain+";";return currentdomain;}
function __gtagTrackerGetExtension(extension){extension=extension.toString();extension=extension.substring(0,(extension.indexOf("#")==-1)?extension.length:extension.indexOf("#"));extension=extension.substring(0,(extension.indexOf("?")==-1)?extension.length:extension.indexOf("?"));extension=extension.substring(extension.lastIndexOf("/")+1,extension.length);if(extension.length>0&&extension.indexOf('.')!==-1){extension=extension.substring(extension.lastIndexOf(".")+1);return extension;}else{return"";}}
function __gtagTrackerTrackedClick(event){return event.which==1||event.which==2||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey;}
function __gtagTrackerGetDownloadExtensions(){var download_extensions=[];if(typeof exactmetrics_frontend.download_extensions=='string'){download_extensions=exactmetrics_frontend.download_extensions.split(",");}
return download_extensions;}
function __gtagTrackerGetInboundPaths(){var inbound_paths=[];if(typeof exactmetrics_frontend.inbound_paths=='string'){inbound_paths=JSON.parse(exactmetrics_frontend.inbound_paths);}
return inbound_paths;}
function __gtagTrackerTrackedClickType(event){if(event.which==1){return'event.which=1';}else if(event.which==2){return'event.which=2';}else if(event.metaKey){return'metaKey';}else if(event.ctrlKey){return'ctrlKey';}else if(event.shiftKey){return'shiftKey';}else if(event.altKey){return'altKey';}else{return'';}}
function __gtagTrackerLinkType(el){var download_extensions=__gtagTrackerGetDownloadExtensions();var inbound_paths=__gtagTrackerGetInboundPaths();var type='unknown';var link=el.href;var extension=__gtagTrackerGetExtension(el.href);var currentdomain=__gtagTrackerGetDomain();var hostname=el.hostname;var protocol=el.protocol;var pathname=el.pathname;link=link.toString();var index,len;var category=el.getAttribute("data-vars-ga-category");if(category){return category;}
if(link.match(/^javascript\:/i)){type='internal';}else if(protocol&&protocol.length>0&&(__gtagTrackerStringTrim(protocol)=='tel'||__gtagTrackerStringTrim(protocol)=='tel:')){type="tel";}else if(protocol&&protocol.length>0&&(__gtagTrackerStringTrim(protocol)=='mailto'||__gtagTrackerStringTrim(protocol)=='mailto:')){type="mailto";}else if(hostname&&currentdomain&&hostname.length>0&&currentdomain.length>0&&!hostname.endsWith('.'+currentdomain)&&hostname!==currentdomain){type="external";}else if(pathname&&JSON.stringify(inbound_paths)!="{}"&&pathname.length>0){var inbound_paths_length=inbound_paths.length;for(var inbound_paths_index=0;inbound_paths_index<inbound_paths_length;inbound_paths_index++){if(inbound_paths[inbound_paths_index].path&&inbound_paths[inbound_paths_index].label&&inbound_paths[inbound_paths_index].path.length>0&&inbound_paths[inbound_paths_index].label.length>0&&pathname.startsWith(inbound_paths[inbound_paths_index].path)){type="internal-as-outbound";internalAsOutboundCategory="outbound-link-"+inbound_paths[inbound_paths_index].label;break;}}}else if(hostname&&window.exactmetrics_experimental_mode&&hostname.length>0&&document.domain.length>0&&hostname!==document.domain){type="cross-hostname";}
if(extension&&(type==='unknown'||'external'===type)&&download_extensions.length>0&&extension.length>0){for(index=0,len=download_extensions.length;index<len;++index){if(download_extensions[index].length>0&&(link.endsWith(download_extensions[index])||download_extensions[index]==extension)){type="download";break;}}}
if(type==='unknown'){type='internal';}
return type;}
function __gtagTrackerLinkTarget(el,event){var target=(el.target&&!el.target.match(/^_(self|parent|top)$/i))?el.target:false;if(event.ctrlKey||event.shiftKey||event.metaKey||event.which==2){target="_blank";}
return target;}
function __gtagTrackerGetTitle(el){if(el.getAttribute("data-vars-ga-label")&&el.getAttribute("data-vars-ga-label").replace(/\n/ig,'')){return el.getAttribute("data-vars-ga-label").replace(/\n/ig,'');}else if(el.title&&el.title.replace(/\n/ig,'')){return el.title.replace(/\n/ig,'');}else if(el.innerText&&el.innerText.replace(/\n/ig,'')){return el.innerText.replace(/\n/ig,'');}else if(el.getAttribute('aria-label')&&el.getAttribute('aria-label').replace(/\n/ig,'')){return el.getAttribute('aria-label').replace(/\n/ig,'');}else if(el.alt&&el.alt.replace(/\n/ig,'')){return el.alt.replace(/\n/ig,'');}else if(el.textContent&&el.textContent.replace(/\n/ig,'')){return el.textContent.replace(/\n/ig,'');}else{return undefined;}}
function __gtagTrackerGetInnerTitle(el){var children=el.children;var count=0;var child;var value;for(var i=0;i<children.length;i++){child=children[i];value=__gtagTrackerGetTitle(child);if(value){return value;}
if(count==99){return undefined;}
count++;}
return undefined;}
function __gtagTrackerClickEvent(event){var el=event.srcElement||event.target;var valuesArray=[];var fieldsArray;valuesArray.el=el;valuesArray.click_type=__gtagTrackerTrackedClickType(event);if('undefined'===typeof __gtagTracker||!__gtagTrackerTrackedClick(event)){valuesArray.exit='loaded';__gtagTrackerNotSend(valuesArray);return;}
while(el&&(typeof el.tagName=='undefined'||el.tagName.toLowerCase()!='a'||!el.href)){el=el.parentNode;}
if(el&&el.href&&!el.hasAttribute('xlink:href')){var link=el.href;var extension=__gtagTrackerGetExtension(el.href);var download_extensions=__gtagTrackerGetDownloadExtensions();var inbound_paths=__gtagTrackerGetInboundPaths();var home_url=exactmetrics_frontend.home_url;var currentdomain=__gtagTrackerGetDomain();var type=__gtagTrackerLinkType(el);var target=__gtagTrackerLinkTarget(el,event);var action=el.getAttribute("data-vars-ga-action");var label=el.getAttribute("data-vars-ga-label");valuesArray.el=el;valuesArray.el_href=el.href;valuesArray.el_protocol=el.protocol;valuesArray.el_hostname=el.hostname;valuesArray.el_port=el.port;valuesArray.el_pathname=el.pathname;valuesArray.el_search=el.search;valuesArray.el_hash=el.hash;valuesArray.el_host=el.host;valuesArray.el_classes=el.getAttribute('class')
valuesArray.el_id=el.id
valuesArray.debug_mode=__gtagTrackerIsDebug();valuesArray.download_extensions=download_extensions;valuesArray.inbound_paths=inbound_paths;valuesArray.home_url=home_url;valuesArray.link=link;valuesArray.extension=extension;valuesArray.type=type;valuesArray.target=target;valuesArray.title=__gtagTrackerGetTitle(el);if(!valuesArray.label&&!valuesArray.title){valuesArray.title=__gtagTrackerGetInnerTitle(el);}
if(type!=='internal'&&type!=='javascript'){var __gtagTrackerHitBackRun=false;var __gtagTrackerHitBack=function(){if(__gtagTrackerHitBackRun){return;}
maybePreventBeforeUnload();__gtagTrackerHitBackRun=true;window.location.href=link;};var __gtagTrackerNoRedirectExternal=function(){valuesArray.exit='external';__gtagTrackerNotSend(valuesArray);};var __gtagTrackerNoRedirectInboundAsExternal=function(){valuesArray.exit='internal-as-outbound';__gtagTrackerNotSend(valuesArray);};var __gtagTrackerNoRedirectCrossHostname=function(){valuesArray.exit='cross-hostname';__gtagTrackerNotSend(valuesArray);};if(target||type=='mailto'||type=='tel'){if(type=='download'){fieldsArray={event_category:'download',event_label:label||valuesArray.title,file_extension:valuesArray.extension,file_name:valuesArray.link.replace(/^.*\//g,''),link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};}else if(type=='tel'){fieldsArray={event_category:'tel',event_label:label||valuesArray.title.replace('tel:',''),tel_number:link.replace('tel:',''),link_text:label||valuesArray.title,link_url:link,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};}else if(type=='mailto'){fieldsArray={event_category:'mailto',event_label:label||valuesArray.title.replace('mailto:',''),email_address:link.replace('mailto:',''),link_text:label||valuesArray.title.replace('mailto:',''),link_url:link,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};}else if(type=='internal-as-outbound'){fieldsArray={event_category:internalAsOutboundCategory,event_label:label||valuesArray.title,event_name:'click',is_affiliate_link:true,affiliate_label:internalAsOutboundCategory.replace('outbound-link-',''),link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,outbound:true,};}else if(type=='external'){fieldsArray={event_category:'outbound-link',event_label:label||valuesArray.title,is_affiliate_link:false,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,outbound:true,};}else if(type=='cross-hostname'){fieldsArray={event_category:'cross-hostname',event_label:label||valuesArray.title,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};}
if(fieldsArray){__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);}else{if(type&&type!='internal'){fieldsArray={event_category:type,event_label:label||valuesArray.title,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);}else{valuesArray.exit='type';__gtagTrackerNotSend(valuesArray);}}}else{if(type!='cross-hostname'&&type!='external'&&type!='internal-as-outbound'){if(!event.defaultPrevented){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}}}
if(type=='download'){fieldsArray={event_category:'download',event_label:label||valuesArray.title,event_callback:__gtagTrackerHitBack,file_extension:valuesArray.extension,file_name:valuesArray.link.replace(/^.*\//g,''),link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);}else if(type=='internal-as-outbound'){beforeUnloadChanged=true;window.onbeforeunload=function(e){if(!event.defaultPrevented){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}}
fieldsArray={event_category:internalAsOutboundCategory,event_label:label||valuesArray.title,event_callback:__gtagTrackerHitBack,is_affiliate_link:true,affiliate_label:internalAsOutboundCategory.replace('outbound-link-',''),link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,outbound:true,};if(navigator.sendBeacon){fieldsArray.transport='beacon';}
__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);setTimeout(__gtagTrackerHitBack,1000);};}else if(type=='external'){beforeUnloadChanged=true;window.onbeforeunload=function(e){fieldsArray={event_category:'outbound-link',event_label:label||valuesArray.title,event_callback:__gtagTrackerHitBack,is_affiliate_link:false,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,outbound:true,};if(navigator.sendBeacon){fieldsArray.transport='beacon';}
__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);};}else if(type=='cross-hostname'){beforeUnloadChanged=true;window.onbeforeunload=function(e){if(!event.defaultPrevented){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}}
fieldsArray={event_category:'cross-hostname',event_label:label||valuesArray.title,event_callback:__gtagTrackerHitBack,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};if(navigator.sendBeacon){fieldsArray.transport='beacon';}
__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);setTimeout(__gtagTrackerHitBack,1000);};}else{if(type&&type!=='internal'){fieldsArray={event_category:type,event_label:label||valuesArray.title,event_callback:__gtagTrackerHitBack,link_text:label||valuesArray.title,link_url:link,link_domain:valuesArray.el_hostname,link_classes:valuesArray.el_classes,link_id:valuesArray.el_id,};__gtagTrackerSendDual('event',action||link,fieldsArray,valuesArray);}else{valuesArray.exit='type';__gtagTrackerNotSend(valuesArray);}}
if(type!='external'&&type!='cross-hostname'&&type!='internal-as-outbound'){setTimeout(__gtagTrackerHitBack,1000);}else{if(type=='external'){setTimeout(__gtagTrackerNoRedirectExternal,1100);}else if(type=='cross-hostname'){setTimeout(__gtagTrackerNoRedirectCrossHostname,1100);}else{setTimeout(__gtagTrackerNoRedirectInboundAsExternal,1100);}}
setTimeout(maybePreventBeforeUnload,100);}}else{maybePreventBeforeUnload();valuesArray.exit='internal';__gtagTrackerNotSend(valuesArray);}}else{valuesArray.exit='notlink';__gtagTrackerNotSend(valuesArray);}}
var prevHash=window.location.hash;function __gtagTrackerHashChangeEvent(){if(exactmetrics_frontend.hash_tracking==="true"&&prevHash!=window.location.hash&&(exactmetrics_frontend.ua||exactmetrics_frontend.v4_id)){prevHash=window.location.hash;if(exactmetrics_frontend.ua){__gtagTracker('config',exactmetrics_frontend.ua,{page_path:location.pathname+location.search+location.hash,});}
if(exactmetrics_frontend.v4_id){__gtagTracker('config',exactmetrics_frontend.v4_id,{page_path:location.pathname+location.search+location.hash,});}
__gtagTrackerLog("Hash change to: "+location.pathname+location.search+location.hash);}else{__gtagTrackerLog("Hash change to (untracked): "+location.pathname+location.search+location.hash);}}
function maybePreventBeforeUnload(){if(beforeUnloadChanged){window.onbeforeunload=null;}}
var __gtagTrackerWindow=window;if(__gtagTrackerWindow.addEventListener){__gtagTrackerWindow.addEventListener("load",function(){document.body.addEventListener("click",__gtagTrackerClickEvent,false);},false);window.addEventListener("hashchange",__gtagTrackerHashChangeEvent,false);}else{if(__gtagTrackerWindow.attachEvent){__gtagTrackerWindow.attachEvent("onload",function(){document.body.attachEvent("onclick",__gtagTrackerClickEvent);});window.attachEvent("onhashchange",__gtagTrackerHashChangeEvent);}}
if(typeof String.prototype.endsWith!=='function'){String.prototype.endsWith=function(suffix){return this.indexOf(suffix,this.length-suffix.length)!==-1;};}
if(typeof String.prototype.startsWith!=='function'){String.prototype.startsWith=function(prefix){return this.indexOf(prefix)===0;};}
if(typeof Array.prototype.lastIndexOf!=='function'){Array.prototype.lastIndexOf=function(searchElement){'use strict';if(this===void 0||this===null){throw new TypeError();}
var n,k,t=Object(this),len=t.length>>>0;if(len===0){return-1;}
n=len-1;if(arguments.length>1){n=Number(arguments[1]);if(n!=n){n=0;}else if(n!=0&&n!=(1/0)&&n!=-(1/0)){n=(n>0||-1)*Math.floor(Math.abs(n));}}
for(k=n>=0?Math.min(n,len-1):len-Math.abs(n);k>=0;k--){if(k in t&&t[k]===searchElement){return k;}}
return-1;};}};var ExactMetricsObject=new ExactMetrics();