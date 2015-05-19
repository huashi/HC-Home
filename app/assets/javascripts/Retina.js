/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
!function(){function Retina(){}function suffixReplace(match){return config.retinaImageSuffix+match}function RetinaImagePath(path,at_2x_path){if(this.path=path||"","undefined"!=typeof at_2x_path&&null!==at_2x_path)this.at_2x_path=at_2x_path,this.perform_check=!1;else{if(void 0!==document.createElement){var locationObject=document.createElement("a");locationObject.href=this.path,locationObject.pathname=locationObject.pathname.replace(regexMatch,suffixReplace),this.at_2x_path=locationObject.href}else{var parts=this.path.split("?");parts[0]=parts[0].replace(regexMatch,suffixReplace),this.at_2x_path=parts.join("?")}this.perform_check=!0}}function RetinaImage(el){this.el=el,this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){hasVariant&&that.swap()})}var root="undefined"==typeof exports?window:exports,config={retinaImageSuffix:"@2x",check_mime_type:!0,force_original_dimensions:!0};root.Retina=Retina,Retina.configure=function(options){null===options&&(options={});for(var prop in options)options.hasOwnProperty(prop)&&(config[prop]=options[prop])},Retina.init=function(context){null===context&&(context=root);var existing_onload=context.onload||function(){};context.onload=function(){var i,image,images=document.getElementsByTagName("img"),retinaImages=[];for(i=0;i<images.length;i+=1)image=images[i],image.getAttributeNode("data-no-retina")||retinaImages.push(new RetinaImage(image));existing_onload()}},Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return root.devicePixelRatio>1?!0:root.matchMedia&&root.matchMedia(mediaQuery).matches?!0:!1};var regexMatch=/\.\w+$/;root.RetinaImagePath=RetinaImagePath,RetinaImagePath.confirmed_paths=[],RetinaImagePath.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;return this.is_external()?callback(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in RetinaImagePath.confirmed_paths?callback(!0):(http=new XMLHttpRequest,http.open("HEAD",this.at_2x_path),http.onreadystatechange=function(){if(4!==http.readyState)return callback(!1);if(http.status>=200&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(null===type||!type.match(/^image/i))return callback(!1)}return RetinaImagePath.confirmed_paths.push(that.at_2x_path),callback(!0)}return callback(!1)},http.send(),void 0):callback(!0)},root.RetinaImage=RetinaImage,RetinaImage.prototype.swap=function(path){function load(){that.el.complete?(config.force_original_dimensions&&(that.el.setAttribute("width",that.el.offsetWidth),that.el.setAttribute("height",that.el.offsetHeight)),that.el.setAttribute("src",path)):setTimeout(load,5)}"undefined"==typeof path&&(path=this.path.at_2x_path);var that=this;load()},Retina.isRetina()&&Retina.init(root)}();var cssua=function(n,l,p){var q=/\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,r=/([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,s=/\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,t=/\bsilk-accelerated=true\b/,u=/\bfluidapp\b/,v=/(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,w=/(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,x=/(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,k={parse:function(b,d){var a={};if(d&&(a.standalone=d),b=(""+b).toLowerCase(),!b)return a;for(var c,e,g=b.split(/[()]/),f=0,k=g.length;k>f;f++)if(f%2){var m=g[f].split(";");for(c=0,e=m.length;e>c;c++)if(q.exec(m[c])){var h=RegExp.$1.split(" ").join("_"),l=RegExp.$2;(!a[h]||parseFloat(a[h])<parseFloat(l))&&(a[h]=l)}}else if(m=g[f].match(r))for(c=0,e=m.length;e>c;c++)h=m[c].split(/[\/\s]+/),h.length&&"mozilla"!==h[0]&&(a[h[0].split(" ").join("_")]=h.slice(1).join("-"));return w.exec(b)?(a.mobile=RegExp.$1,s.exec(b)&&(delete a[a.mobile],a.blackberry=a.version||RegExp.$3||RegExp.$2||RegExp.$1,RegExp.$1?a.mobile="blackberry":"0.0.1"===a.version&&(a.blackberry="7.1.0.0"))):v.exec(b)?a.desktop=RegExp.$1:x.exec(b)&&(a.game=RegExp.$1,c=a.game.split(" ").join("_"),a.version&&!a[c]&&(a[c]=a.version)),a.intel_mac_os_x?(a.mac_os_x=a.intel_mac_os_x.split("_").join("."),delete a.intel_mac_os_x):a.cpu_iphone_os?(a.ios=a.cpu_iphone_os.split("_").join("."),delete a.cpu_iphone_os):a.cpu_os?(a.ios=a.cpu_os.split("_").join("."),delete a.cpu_os):"iphone"!==a.mobile||a.ios||(a.ios="1"),a.opera&&a.version?(a.opera=a.version,delete a.blackberry):t.exec(b)?a.silk_accelerated=!0:u.exec(b)&&(a.fluidapp=a.version),a.applewebkit?(a.webkit=a.applewebkit,delete a.applewebkit,a.opr&&(a.opera=a.opr,delete a.opr,delete a.chrome),a.safari&&(a.chrome||a.crios||a.opera||a.silk||a.fluidapp||a.phantomjs||a.mobile&&!a.ios?delete a.safari:a.safari=a.version&&!a.rim_tablet_os?a.version:{419:"2.0.4",417:"2.0.3",416:"2.0.2",412:"2.0",312:"1.3",125:"1.2",85:"1.0"}[parseInt(a.safari,10)]||a.safari)):a.msie||a.trident?(a.opera||(a.ie=a.msie||a.rv),delete a.msie,a.windows_phone_os?(a.windows_phone=a.windows_phone_os,delete a.windows_phone_os):("wpdesktop"===a.mobile||"xblwp7"===a.mobile||"zunewp7"===a.mobile)&&(a.mobile="windows desktop",a.windows_phone=9>+a.ie?"7.0":10>+a.ie?"7.5":"8.0",delete a.windows_nt)):(a.gecko||a.firefox)&&(a.gecko=a.rv),a.rv&&delete a.rv,a.version&&delete a.version,a},format:function(b){var a,d="";for(a in b)if(a&&b.hasOwnProperty(a)){var c=a,e=b[a],c=c.split(".").join("-"),g=" ua-"+c;if("string"==typeof e){for(var e=e.split(" ").join("_").split(".").join("-"),f=e.indexOf("-");f>0;)g+=" ua-"+c+"-"+e.substring(0,f),f=e.indexOf("-",f+1);g+=" ua-"+c+"-"+e}d+=g}return d},encode:function(b){var a,d="";for(a in b)a&&b.hasOwnProperty(a)&&(d&&(d+="&"),d+=encodeURIComponent(a)+"="+encodeURIComponent(b[a]));return d}};return k.userAgent=k.ua=k.parse(l,p),l=k.format(k.ua)+" js",n.className=n.className?n.className.replace(/\bno-js\b/g,"")+l:l.substr(1),k}(document.documentElement,navigator.userAgent,navigator.standalone);!function(window){"use strict";var cssremunit=function(){var div=document.createElement("div");return div.style.cssText="font-size: 1rem;",/rem/.test(div.style.fontSize)},isStyleSheet=function(){for(var styles=document.getElementsByTagName("link"),filteredLinks=[],i=0;i<styles.length;i++)"stylesheet"===styles[i].rel.toLowerCase()&&null===styles[i].getAttribute("data-norem")&&filteredLinks.push(styles[i].href);return filteredLinks},processLinks=function(){for(var i=0;i<links.length;i++)xhr(links[i],storeCSS)},storeCSS=function(response,link){if(preCSS.push(response.responseText),CSSLinks.push(link),CSSLinks.length===links.length){for(var j=0;j<CSSLinks.length;j++)matchCSS(preCSS[j],CSSLinks[j]);(links=importLinks.slice(0)).length>0?(CSSLinks=[],preCSS=[],importLinks=[],processLinks()):buildCSS()}},matchCSS=function(sheetCSS,link){for(var importStatement,clean=removeMediaQueries(sheetCSS).replace(/\/\*[\s\S]*?\*\//g,""),pattern=/[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g,current=clean.match(pattern),remPattern=/\d*\.?\d+rem/g,remCurrent=clean.match(remPattern),sheetPathPattern=/(.*\/)/,sheetPath=sheetPathPattern.exec(link)[0],importPattern=/@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm;null!==(importStatement=importPattern.exec(sheetCSS));)importLinks.push(sheetPath+importStatement[1]);null!==current&&0!==current.length&&(found=found.concat(current),foundProps=foundProps.concat(remCurrent))},buildCSS=function(){for(var pattern=/[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g,i=0;i<found.length;i++){rules+=found[i].substr(0,found[i].indexOf("{")+1);for(var current=found[i].match(pattern),j=0;j<current.length;j++)rules+=current[j],j===current.length-1&&"}"!==rules[rules.length-1]&&(rules+="\n}")}parseCSS()},parseCSS=function(){for(var i=0;i<foundProps.length;i++)css[i]=Math.round(parseFloat(foundProps[i].substr(0,foundProps[i].length-3)*fontSize))+"px";loadCSS()},loadCSS=function(){for(var i=0;i<css.length;i++)css[i]&&(rules=rules.replace(foundProps[i],css[i]));var remcss=document.createElement("style");remcss.setAttribute("type","text/css"),remcss.id="remReplace",document.getElementsByTagName("head")[0].appendChild(remcss),remcss.styleSheet?remcss.styleSheet.cssText=rules:remcss.appendChild(document.createTextNode(rules))},xhr=function(url,callback){try{var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP")||new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest;xhr.open("GET",url,!0),xhr.onreadystatechange=function(){4===xhr.readyState&&callback(xhr,url)},xhr.send(null)}catch(e){if(window.XDomainRequest){var xdr=new XDomainRequest;xdr.open("get",url),xdr.onload=function(){callback(xdr,url)},xdr.onerror=function(){return!1},xdr.send()}}},removeMediaQueries=function(css){return window.matchMedia||window.msMatchMedia||(css=css.replace(/@media[\s\S]*?\}\s*\}/g,"")),css};if(!cssremunit()){var rules="",links=isStyleSheet(),importLinks=[],found=[],foundProps=[],preCSS=[],CSSLinks=[],css=[],fontSize="";fontSize=function(){var size,doc=document,docElement=doc.documentElement,body=doc.body||doc.createElement("body"),isFakeBody=!doc.body,div=doc.createElement("div"),currentSize=body.style.fontSize;return isFakeBody&&docElement.appendChild(body),div.style.cssText="width:1em; position:absolute; visibility:hidden; padding: 0;",body.style.fontSize="1em",body.appendChild(div),size=div.offsetWidth,isFakeBody?docElement.removeChild(body):(body.removeChild(div),body.style.fontSize=currentSize),size}(),processLinks()}}(window),function(define){"use strict";define(["jquery"],function($){function both(val){return $.isFunction(val)||$.isPlainObject(val)?val:{top:val,left:val}}var $scrollTo=$.scrollTo=function(target,duration,settings){return $(window).scrollTo(target,duration,settings)};return $scrollTo.defaults={axis:"xy",duration:0,limit:!0},$scrollTo.window=function(){return $(window)._scrollable()},$.fn._scrollable=function(){return this.map(function(){var elem=this,isWin=!elem.nodeName||-1!=$.inArray(elem.nodeName.toLowerCase(),["iframe","#document","html","body"]);if(!isWin)return elem;var doc=(elem.contentWindow||elem).document||elem.ownerDocument||elem;return/webkit/i.test(navigator.userAgent)||"BackCompat"==doc.compatMode?doc.body:doc.documentElement})},$.fn.scrollTo=function(target,duration,settings){return"object"==typeof duration&&(settings=duration,duration=0),"function"==typeof settings&&(settings={onAfter:settings}),"max"==target&&(target=9e9),settings=$.extend({},$scrollTo.defaults,settings),duration=duration||settings.duration,settings.queue=settings.queue&&settings.axis.length>1,settings.queue&&(duration/=2),settings.offset=both(settings.offset),settings.over=both(settings.over),this._scrollable().each(function(){function animate(callback){$elem.animate(attr,duration,settings.easing,callback&&function(){callback.call(this,targ,settings)})}if(null!=target){var toff,elem=this,$elem=$(elem),targ=target,attr={},win=$elem.is("html,body");switch(typeof targ){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}if(targ=win?$(targ):$(targ,this),!targ.length)return;case"object":(targ.is||targ.style)&&(toff=(targ=$(targ)).offset())}var offset=$.isFunction(settings.offset)&&settings.offset(elem,targ)||settings.offset;$.each(settings.axis.split(""),function(i,axis){var Pos="x"==axis?"Left":"Top",pos=Pos.toLowerCase(),key="scroll"+Pos,old=elem[key],max=$scrollTo.max(elem,axis);if(toff)attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]),settings.margin&&(attr[key]-=parseInt(targ.css("margin"+Pos))||0,attr[key]-=parseInt(targ.css("border"+Pos+"Width"))||0),attr[key]+=offset[pos]||0,settings.over[pos]&&(attr[key]+=targ["x"==axis?"width":"height"]()*settings.over[pos]);else{var val=targ[pos];attr[key]=val.slice&&"%"==val.slice(-1)?parseFloat(val)/100*max:val}settings.limit&&/^\d+$/.test(attr[key])&&(attr[key]=attr[key]<=0?0:Math.min(attr[key],max)),!i&&settings.queue&&(old!=attr[key]&&animate(settings.onAfterFirst),delete attr[key])}),animate(settings.onAfter)}}).end()},$scrollTo.max=function(elem,axis){var Dim="x"==axis?"Width":"Height",scroll="scroll"+Dim;if(!$(elem).is("html,body"))return elem[scroll]-$(elem)[Dim.toLowerCase()]();var size="client"+Dim,html=elem.ownerDocument.documentElement,body=elem.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[size],body[size])},$scrollTo})}("function"==typeof define&&define.amd?define:function(deps,factory){"undefined"!=typeof module&&module.exports?module.exports=factory(require("jquery")):factory(jQuery)}),function(){$(document).on("click",".js-scrollto",function(e){return $(document).slideTo($($(this).attr("href"))),e.preventDefault()})}.call(this),function(){}.call(this);