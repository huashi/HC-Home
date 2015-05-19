/*
 * For font license information, see the CSS file loaded by this JavaScript.
 */
if(!window.Typekit)window.Typekit={};window.Typekit.config={"a":"306787","c":[".tk-proxima-nova","\"proxima-nova\",sans-serif",".tk-freight-text-pro","\"freight-text-pro\",sans-serif"],"f":"//use.typekit.net/c/5920f5/1w;freight-text-pro,2,WHZ:R:i4,WHc:R:i7,WHY:R:n4;proxima-nova,2,b5x:R:i4,b5w:R:n4,bBh:R:n7/{format}{/extras*}?3bb2a6e53c9684ffdc9a98f41b5b2a62781115c6cc13a8141f0e02b9f0428b466c88a56a3f49c7b8f8cff5ec29091afecbd640383120bf3130121b6e91243ccd4f9402be371767c37f8ca9924695c546596e8624964536b302e332ef07f73548ca13d853f0f02881ce782127da42b9d0e6e2f8f9cd7118fe0f6b12a24710b03a5430cbb70dce1b153afb3bacfbd257bf98a5e6db56c91134ed154612823e06fe035f077e1700a42c798c9779f86bd8bf7ee3ae639233bc739111efce2bd543417b32fbafacbd05626c96e23792ee120cf857a4c9739efcb67e306e0dbf","fi":[139,175,176,13464,13465,13467],"fn":["freight-text-pro",["i4","i7","n4"],"proxima-nova",["i4","n4","n7"]],"ht":"tk","js":"1.12.3","k":"//use.typekit.net/{id}.js","kt":"bbt6nca","p":"//p.typekit.net/p.gif?s=1&k=bbt6nca&ht=tk&h={host}&f=139.175.176.13464.13465.13467&a=306787&_={_}","ps":1,"w":"bbt6nca"};
/*{"k":"1.12.3","auto_updating":true}*/
;(function(window,document,undefined){
    function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function g(a,b,c){g=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return g.apply(null,arguments)}var ca=Date.now||function(){return+new Date};
    function da(a,b){this.oa=a;this.X=b||a;this.K=this.X.document}da.prototype.createElement=function(a,b,c){a=this.K.createElement(a);if(b)for(var d in b)b.hasOwnProperty(d)&&("style"==d?a.style.cssText=b[d]:a.setAttribute(d,b[d]));c&&a.appendChild(this.K.createTextNode(c));return a};function ea(a,b,c){a=a.K.getElementsByTagName(b)[0];a||(a=document.documentElement);a&&a.lastChild&&a.insertBefore(c,a.lastChild)}function fa(a,b){function c(){a.K.body?b():setTimeout(c,0)}c()}
    function l(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,h=0;h<d.length;h+=1)if(b[e]===d[h]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(h=0;h<c.length;h+=1)if(d[e]===c[h]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function ga(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
    function ha(a){if("string"===typeof a.ra)return a.ra;var b=a.X.location.protocol;"about:"==b&&(b=a.oa.location.protocol);return"https:"==b?"https:":"http:"}function ia(a,b){/^http(s)?:$/.test(b)&&(a.ra=b)}function ja(a){return a.X.location.hostname||a.oa.location.hostname}function ka(a,b,c){b=a.createElement("link",{rel:"stylesheet",href:b});var d=!1;b.onload=function(){d||(d=!0,c&&c(null))};b.onerror=function(){d||(d=!0,c&&c(Error("Stylesheet failed to load")))};ea(a,"head",b)}
    function la(a,b,c){var d=a.K.getElementsByTagName("head")[0];if(d){var e=a.createElement("script",{src:b}),f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(f=!0,c&&c(null),e.onload=e.onreadystatechange=null,"HEAD"==e.parentNode.tagName&&d.removeChild(e))};d.appendChild(e);window.setTimeout(function(){f||(f=!0,c&&c(Error("Script load timeout")))},5E3)}}function m(a){this.va=a}
    function n(a,b,c,d){this.l=null!=a?a:null;this.q=null!=b?b:null;this.P=null!=c?c:null;this.h=null!=d?d:null}var ma=/^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;n.prototype.compare=function(a){return this.l>a.l||this.l===a.l&&this.q>a.q||this.l===a.l&&this.q===a.q&&this.P>a.P?1:this.l<a.l||this.l===a.l&&this.q<a.q||this.l===a.l&&this.q===a.q&&this.P<a.P?-1:0};function q(a,b){return-1===a.compare(b)}function r(a,b){return 0===a.compare(b)||1===a.compare(b)}
    function s(a,b){return 0===a.compare(b)}n.prototype.toString=function(){return[this.l,this.q||"",this.P||"",this.h||""].join("")};function u(a){a=ma.exec(a);var b=null,c=null,d=null,e=null;a&&(null!==a[1]&&a[1]&&(b=parseInt(a[1],10)),null!==a[2]&&a[2]&&(c=parseInt(a[2],10)),null!==a[3]&&a[3]&&(d=parseInt(a[3],10)),null!==a[4]&&a[4]&&(e=/^[0-9]+$/.test(a[4])?parseInt(a[4],10):a[4]));return new n(b,c,d,e)}
    function y(a,b,c,d,e,f,h,k){this.Y=a;this.w=b;this.L=c;this.T=d;this.m=e;this.g=f;this.ca=h;this.D=k}y.prototype.getName=function(){return this.Y};function na(a,b){this.b=a;this.S=b}var oa=new y("Unknown",new n,"Unknown",new n,"Unknown",new n,void 0,new m(!1));
    na.prototype.parse=function(){var a;if(-1!=this.b.indexOf("MSIE")||-1!=this.b.indexOf("Trident/")){a=z(this);var b=u(A(this)),c=null,d=null,e=null,e=B(this.b,/Trident\/([\d\w\.]+)/,1),f=C(this.S),c=-1!=this.b.indexOf("MSIE")?u(B(this.b,/MSIE ([\d\w\.]+)/,1)):u(B(this.b,/rv:([\d\w\.]+)/,1));""!=e?(d="Trident",e=u(e)):(d="Unknown",e=new n);a=new y("MSIE",c,d,e,a,b,f,new m(!1))}else if(-1!=this.b.indexOf("Opera"))a:if(a="Unknown",b=u(B(this.b,/Presto\/([\d\w\.]+)/,1)),c=u(A(this)),d=C(this.S),null!==
        b.l?a="Presto":(-1!=this.b.indexOf("Gecko")&&(a="Gecko"),b=u(B(this.b,/rv:([^\)]+)/,1))),-1!=this.b.indexOf("Opera Mini/"))f=u(B(this.b,/Opera Mini\/([\d\.]+)/,1)),a=new y("OperaMini",f,a,b,z(this),c,d,new m(!1));else{if(-1!=this.b.indexOf("Version/")&&(f=u(B(this.b,/Version\/([\d\.]+)/,1)),null!==f.l)){a=new y("Opera",f,a,b,z(this),c,d,new m(!1));break a}f=u(B(this.b,/Opera[\/ ]([\d\.]+)/,1));a=null!==f.l?new y("Opera",f,a,b,z(this),c,d,new m(!1)):new y("Opera",new n,a,b,z(this),c,d,new m(!1))}else/OPR\/[\d.]+/.test(this.b)?
        a=pa(this):/AppleWeb(K|k)it/.test(this.b)?a=pa(this):-1!=this.b.indexOf("Gecko")?(a="Unknown",b=new n,c=u(A(this)),-1!=this.b.indexOf("Firefox")?(a="Firefox",b=u(B(this.b,/Firefox\/([\d\w\.]+)/,1))):-1!=this.b.indexOf("Mozilla")&&(a="Mozilla"),d=u(B(this.b,/rv:([^\)]+)/,1)),a=new y(a,b,"Gecko",d,z(this),c,C(this.S),new m(!1))):a=oa;return a};
    function z(a){var b=B(a.b,/(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,1);if(""!=b)return/BB\d{2}/.test(b)&&(b="BlackBerry"),b;a=B(a.b,/(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/,1);return""!=a?("Mac_PowerPC"==a?a="Macintosh":"PlayStation"==a&&(a="Linux"),a):"Unknown"}
    function A(a){var b=B(a.b,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b||(b=B(a.b,/Windows Phone( OS)? ([^;)]+)/,2))||(b=B(a.b,/(iPhone )?OS ([\d_]+)/,2)))return b;if(b=B(a.b,/(?:Linux|CrOS|CrKey) ([^;)]+)/,1))for(var b=b.split(/\s/),c=0;c<b.length;c+=1)if(/^[\d\._]+$/.test(b[c]))return b[c];return(a=B(a.b,/(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/,2))?a:"Unknown"}
    function pa(a){var b=z(a),c=u(A(a)),d=u(B(a.b,/AppleWeb(?:K|k)it\/([\d\.\+]+)/,1)),e="Unknown",f=new n,f="Unknown";/OPR\/[\d.]+/.test(a.b)?e="Opera":-1!=a.b.indexOf("Chrome")||-1!=a.b.indexOf("CrMo")||-1!=a.b.indexOf("CriOS")?e="Chrome":/Silk\/\d/.test(a.b)?e="Silk":"BlackBerry"==b||"Android"==b?e="BuiltinBrowser":-1!=a.b.indexOf("PhantomJS")?e="PhantomJS":-1!=a.b.indexOf("Safari")?e="Safari":-1!=a.b.indexOf("AdobeAIR")?e="AdobeAIR":-1!=a.b.indexOf("PlayStation")&&(e="BuiltinBrowser");"BuiltinBrowser"==
    e?f="Unknown":"Silk"==e?f=B(a.b,/Silk\/([\d\._]+)/,1):"Chrome"==e?f=B(a.b,/(Chrome|CrMo|CriOS)\/([\d\.]+)/,2):-1!=a.b.indexOf("Version/")?f=B(a.b,/Version\/([\d\.\w]+)/,1):"AdobeAIR"==e?f=B(a.b,/AdobeAIR\/([\d\.]+)/,1):"Opera"==e?f=B(a.b,/OPR\/([\d.]+)/,1):"PhantomJS"==e&&(f=B(a.b,/PhantomJS\/([\d.]+)/,1));f=u(f);return new y(e,f,"AppleWebKit",d,b,c,C(a.S),new m(536>d.l||536==d.l&&11>d.q))}function B(a,b,c){return(a=a.match(b))&&a[c]?a[c]:""}function C(a){if(a.documentMode)return a.documentMode}
    function qa(a){this.Ea=a||"-"}qa.prototype.h=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.Ea)};function ra(a,b){this.e=a;this.u=a.X.document.documentElement;this.$=b;this.o="wf";this.n=new qa("-");this.za=!1!==b.events;this.H=!1!==b.classes}function sa(a){if(a.H){var b=ga(a.u,a.n.h(a.o,"active")),c=[],d=[a.n.h(a.o,"loading")];b||c.push(a.n.h(a.o,"inactive"));l(a.u,c,d)}D(a,"inactive")}
    function D(a,b,c){if(a.za&&a.$[b])if(c)a.$[b](c.getName(),E(c));else a.$[b]()}function F(a,b){this.Y=a;this.ea=4;this.Z="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.Z=c[1],this.ea=parseInt(c[2],10))}F.prototype.getName=function(){return this.Y};function E(a){return a.Z+a.ea}function G(a,b){this.e=a;this.O=b;this.p=this.e.createElement("span",{"aria-hidden":"true"},this.O)}function ta(a){ea(a.e,"body",a.p)}
    function H(a){var b;b=[];for(var c=a.Y.split(/,\s*/),d=0;d<c.length;d++){var e=c[d].replace(/['"]/g,"");-1==e.indexOf(" ")?b.push(e):b.push("'"+e+"'")}b=b.join(",");c="normal";"o"===a.Z?c="oblique":"i"===a.Z&&(c="italic");return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+b+";"+("font-style:"+c+";font-weight:"+(a.ea+"00")+";")}
    G.prototype.remove=function(){var a=this.p;a.parentNode&&a.parentNode.removeChild(a)};
    function ua(a,b,c,d,e,f,h,k){this.fa=a;this.Da=b;this.e=c;this.t=d;this.D=e;this.O=k||"BESbswy";this.C={};this.da=f||3E3;this.pa=h||null;this.N=this.B=this.A=null;this.A=new G(this.e,this.O);this.B=new G(this.e,this.O);this.N=new G(this.e,this.O);a=new F("serif",E(this.t));a=H(a);this.A.p.style.cssText=a;a=new F("sans-serif",E(this.t));a=H(a);this.B.p.style.cssText=a;a=new F("monospace",E(this.t));a=H(a);this.N.p.style.cssText=a;ta(this.A);ta(this.B);ta(this.N);this.C.serif=this.A.p.offsetWidth;this.C["sans-serif"]=
        this.B.p.offsetWidth;this.C.monospace=this.N.p.offsetWidth}var I={Ra:"serif",Qa:"sans-serif",Na:"monospace"};ua.prototype.start=function(){this.Ia=ca();var a=new F(this.t.getName()+",serif",E(this.t)),a=H(a);this.A.p.style.cssText=a;a=new F(this.t.getName()+",sans-serif",E(this.t));a=H(a);this.B.p.style.cssText=a;va(this)};function wa(a,b,c){for(var d in I)if(I.hasOwnProperty(d)&&b===a.C[I[d]]&&c===a.C[I[d]])return!0;return!1}
    function va(a){var b=a.A.p.offsetWidth,c=a.B.p.offsetWidth;b===a.C.serif&&c===a.C["sans-serif"]||a.D.va&&wa(a,b,c)?ca()-a.Ia>=a.da?a.D.va&&wa(a,b,c)&&(null===a.pa||a.pa.hasOwnProperty(a.t.getName()))?xa(a,a.fa):xa(a,a.Da):ya(a):xa(a,a.fa)}function ya(a){setTimeout(g(function(){va(this)},a),50)}function xa(a,b){a.A.remove();a.B.remove();a.N.remove();b(a.t)}function za(a,b,c,d){this.e=b;this.F=c;this.ba=0;this.ua=this.na=!1;this.da=d;this.D=a.D}
    za.prototype.Aa=function(a){var b=this.F;b.H&&l(b.u,[b.n.h(b.o,a.getName(),E(a).toString(),"active")],[b.n.h(b.o,a.getName(),E(a).toString(),"loading"),b.n.h(b.o,a.getName(),E(a).toString(),"inactive")]);D(b,"fontactive",a);this.ua=!0;Aa(this)};
    za.prototype.Ba=function(a){var b=this.F;if(b.H){var c=ga(b.u,b.n.h(b.o,a.getName(),E(a).toString(),"active")),d=[],e=[b.n.h(b.o,a.getName(),E(a).toString(),"loading")];c||d.push(b.n.h(b.o,a.getName(),E(a).toString(),"inactive"));l(b.u,d,e)}D(b,"fontinactive",a);Aa(this)};function Aa(a){0==--a.ba&&a.na&&(a.ua?(a=a.F,a.H&&l(a.u,[a.n.h(a.o,"active")],[a.n.h(a.o,"loading"),a.n.h(a.o,"inactive")]),D(a,"active")):sa(a.F))}function J(){this.I=this.Q=-1}J.prototype.now=function(){return(new Date).getTime()};
    J.prototype.start=function(){this.Q=this.now();this.I=-1};J.prototype.stop=function(){this.I=this.now()};function Ba(){var a=[{name:"font-family",value:K.c[L+1]}];this.Ga=[K.c[L]];this.ia=a}function Ca(a){for(var b=a.Ga.join(","),c=[],d=0;d<a.ia.length;d++){var e=a.ia[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"}function Da(a){this.e=a}Da.prototype.toString=function(){return encodeURIComponent(ja(this.e))};function Ea(a,b){this.r=a;this.s=b}
    Ea.prototype.toString=function(){for(var a=[],b=0;b<this.s.length;b++)for(var c=this.s[b],d=c.G(),c=c.G(this.r),e=0;e<d.length;e++){var f;a:{for(f=0;f<c.length;f++)if(d[e]===c[f]){f=!0;break a}f=!1}a.push(f?1:0)}a=a.join("");a=a.replace(/^0+/,"");b=[];for(d=a.length;0<d;d-=4)b.unshift(parseInt(a.slice(0>d-4?0:d-4,d),2).toString(16));return b.join("")};function M(a){this.Ka=a}
    M.prototype.h=function(a,b){var c=b||{},d=this.Ka.replace(/\{\/?([^*}]*)(\*?)\}/g,function(a,b,d){return d&&c[b]?"/"+c[b].join("/"):c[b]||""});d.match(/^\/\//)&&(d=(a?"https:":"http:")+d);return d.replace(/\/*\?*($|\?)/,"$1")};function Fa(a,b){for(var c=[],d=0;d<b.length;d++)c.push(b[d].toString());return{format:a,extras:c}}function Ga(a,b){this.M=a;this.V=b;this.ka={};this.ja={}}Ga.prototype.G=function(a){return a?(this.ka[a]||this.V).slice(0):this.V.slice(0)};
    function Ha(a,b,c){for(var d=[],e=a.M.split(",")[0].replace(/"|'/g,""),f=a.G(),h,k=[],v={},p=0;p<f.length;p++)h=f[p],0<h.length&&!v[h]&&(v[h]=!0,k.push(h));c=c.ta?c.ta(e,k,d):k;a.ka[b]=c;a.ja[b]=d}function Ia(a,b){for(var c=a.G(b),d=a.ja[b]||[],e=[],f=0;f<c.length;f++)e.push(new F(a.M,c[f]));for(f=0;f<d.length;f++)if(c=d[f].M,c!==a.M)for(var h=d[f].G(),k=0;k<h.length;k++)e.push(new F(c,h[k]));return e}function Ja(a,b){this.M=a;this.V=b}Ja.prototype.G=function(){return this.V};
    function La(a,b,c,d,e,f){this.Ha=a;this.Ca=b;this.U=c||[];this.xa=d||null;this.Ja=e||null;this.version=f||null}
    La.prototype.send=function(a,b,c){var d=new M("//p.typekit.net/p.gif?s={service}&k={token}&app={app}&ht={hosting}&h={host}&f={variations}&a={account}&sl={stylesheetLoadTime}&fl={fontLoadTime}&js={version}&_={_}"),e=encodeURIComponent((window.__adobewebfontsappname__||"").toString().substr(0,20)),f=encodeURIComponent(ja(a)),h=[],k=[];window.Typekit.fonts||(window.Typekit.fonts=[]);for(var k=window.Typekit.fonts,v=0;v<this.U.length;v++){for(var p=!1,x=0;x<k.length;x++)if(this.U[v]===k[x]){p=!0;break}p||
    (h.push(this.U[v]),k.push(this.U[v]))}h.length&&Ma(d.h("https:"===ha(a),{service:this.Ha,token:this.Ja,app:e,hosting:this.Ca,host:f,variations:h.join("."),account:this.xa,stylesheetLoadTime:b,fontLoadTime:c,version:this.version,_:(+new Date).toString()}))};function Ma(a){var b=new Image(1,1),c=!1;b.src=a;b.onload=function(){c=!0;b.onload=null};setTimeout(function(){c||(b.src="about:blank",b.onload=null)},3E3)}function Na(){this.ga=this.wa=this.J=this.W=this.ma=!0}
    function N(a){return"Windows"===a.m}function O(a){return N(a)&&s(a.g,new n(5,1))||N(a)&&s(a.g,new n(5,2))||N(a)&&s(a.g,new n(6,0))||N(a)&&r(a.g,new n(6,1))}function P(a){return"Macintosh"===a.m&&(r(a.g,new n(10,4))||null===a.g.l)}function Oa(a,b){return b.ma&&("iPhone"===a.m||"iPod"===a.m)}function Pa(a,b){return Oa(a,b)&&r(a.g,new n(4,2))&&q(a.g,new n(5))}function Qa(a,b){return b.W&&"iPad"===a.m&&r(a.g,new n(4,2))&&q(a.g,new n(5))}function Q(a,b){return b.J&&"Android"===a.m}
    function Ra(a,b){return Q(a,b)&&r(a.g,new n(2,2))&&q(a.g,new n(3,1))}function Sa(a,b){return Q(a,b)&&r(a.g,new n(3,1))&&q(a.g,new n(4,1))}function S(a){return"Linux"===a.m||"Ubuntu"===a.m}function Ta(a){return"Safari"===a.getName()&&"AppleWebKit"===a.L||"Unknown"===a.getName()&&"AppleWebKit"===a.L&&("iPhone"===a.m||"iPad"===a.m||"iPod"===a.m)}function Ua(a){return"BuiltinBrowser"===a.getName()}function Va(a){this.ta=a}function Wa(a,b){return b}
    var T={Oa:"a",Sa:"d",Ma:"i",Pa:"j",La:"k",NONE:"x"},U={a:function(a,b){return"Safari"===a.getName()&&"AppleWebKit"===a.L&&r(a.T,new n(525,13))&&q(a.T,new n(534,50))&&(O(a)||P(a))||Ua(a)&&(Ra(a,b)||Q(a,b)&&r(a.g,new n(4,1)))||b.J&&"Silk"===a.getName()&&q(a.w,new n(2))&&(Ra(a,b)||P)||b.J&&"Silk"===a.getName()&&r(a.w,new n(2))&&Q(a,b)&&r(a.g,new n(4,1))||Ta(a)&&(Qa(a,b)||Pa(a,b))||"Chrome"===a.getName()&&r(a.w,new n(6))&&(Qa(a,b)||Pa(a,b))||"AdobeAIR"===a.getName()&&r(a.w,new n(2,5))&&(N(a)&&null===
        a.g.l||S(a)||P(a))},d:function(a,b){return"Chrome"===a.getName()&&r(a.w,new n(6))&&(O(a)||S(a)||P(a)||Q(a,b)||"CrOS"===a.m||"CrKey"===a.m||b.W&&"iPad"===a.m&&r(a.g,new n(5))||Oa(a,b)&&r(a.g,new n(5)))||"Gecko"===a.L&&1===a.T.compare(new n(1,9,1))&&(O(a)||S(a)||P(a)||Q(a,b))||"Safari"===a.getName()&&"AppleWebKit"===a.L&&r(a.T,new n(534,50))&&(O(a)||P(a))||Ta(a)&&(b.W&&"iPad"===a.m&&r(a.g,new n(5))||Oa(a,b)&&r(a.g,new n(5)))||"Opera"===a.getName()&&r(a.w,new n(11,10))&&(O(a)||S(a)||P(a)||Q(a,b))||"MSIE"===
        a.getName()&&9<=a.ca&&(N(a)&&r(a.g,new n(6,1))||N(a)&&s(a.g,new n(6,0)))||"MSIE"===a.getName()&&b.wa&&"Windows Phone"===a.m&&r(a.g,new n(8))||Ua(a)&&(b.ga&&"BlackBerry"===a.m&&r(a.g,new n(10))||S(a))},j:function(a,b){return Ua(a)&&Sa(a,b)||b.J&&"Silk"===a.getName()&&r(a.w,new n(2))&&(Sa(a,b)||S(a))},i:function(a){return"MSIE"===a.getName()&&r(a.w,new n(6,0))&&(void 0===a.ca||9>a.ca)&&O(a)},x:function(){return!1}},Xa={};
    Xa.i=new Va(function(a,b,c){for(var d=0;d<b.length;d+=1){var e=b[d],f;f=e;f=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+f;c.push(new Ja(f,[e]))}a={};for(e=0;e<b.length;e++)c=b[e],d=c.charAt(1),(a[d]||(a[d]=[])).push(c);c=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];d=[];for(e=0;e<c.length;e++){f=c[e];for(var h=0;h<f.length;h++){var k=f[h];if(a[k]){d=d.concat(a[k]);break}}}c=d;d={};a=[];for(e=0;e<c.length;e++)f=c[e],d[f]||(d[f]=!0,a.push(f));c=[];for(d=0;d<b.length;d++)for(e=b[d],f=0;f<a.length;f++)h=a[f],
    h==e&&c.push(h);return c});var V={};V.a=V.d=V.j=function(){return[]};V.i=function(a,b,c){return[new Da(a),new Ea(b,c)]};V.k=function(a){return[new Da(a)]};function Ya(a,b,c){return V[b](a,b,c)}function W(a){this.e=a;this.r="x";this.ha=this.b=null;this.s=[];this.R=[];this.la=this.aa=null}W.prototype.supportsConfiguredBrowser=function(){return"x"!==this.r};
    W.prototype.init=function(){if(0<this.R.length){for(var a=[],b=0;b<this.R.length;b++)a.push(Ca(this.R[b]));var b=this.e,a=a.join(""),c=this.e.createElement("style");c.setAttribute("type","text/css");c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));ea(b,"head",c)}};
    W.prototype.load=function(a,b,c){function d(){}var e=this,f=c||{},h=f.contextPath||".",k=f.hostname||this.la;a=f.timeout;c=!1!==f.events;var v=null,p=new J,x=new J;f.active&&(d=f.active);f.active=function(){x.stop();e.qa&&e.qa.send(e.e,-1!==p.Q&&-1!==p.I?p.I-p.Q:-1,-1!==x.Q&&-1!==x.I?x.I-x.Q:-1);d()};v=new ra(this.e,f);if(this.r){for(var f=Xa[this.r]||new Va(Wa),w=0;w<this.s.length;w++)Ha(this.s[w],this.r,f);this.aa&&(f=Ya(this.e,this.r,this.s),f=Fa(this.r,f),f.contextPath=h,k&&(f.hostname=k),h=this.aa.h("https:"===
    ha(this.e),f),p.start(),ka(this.e,h,function(){p.stop();x.start()}));if(c){for(var R=[],Ka={},t=new za(this.b,this.e,v,a),w=0;w<this.s.length;w++)R=R.concat(Ia(this.s[w],this.r));for(w=0;w<R.length;w++)Ka[R[w].getName()]="BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006";fa(this.e,function(){var a=R,c={},d=Ka||{};if(0===a.length&&b)sa(t.F);else{t.ba+=a.length;b&&(t.na=b);for(var e=0;e<a.length;e++){var f=a[e],h=d[f.getName()],k=t.F,p=f;k.H&&l(k.u,[k.n.h(k.o,p.getName(),E(p).toString(),"loading")]);
        D(k,"fontloading",p);k=null;k=new ua(g(t.Aa,t),g(t.Ba,t),t.e,f,t.D,t.da,c,h);k.start()}}})}}};W.prototype.performOptionalActions=function(){};function Za(a,b,c,d){this.Fa=a;this.e=b;this.b=c;this.u=d;this.v=[]}Za.prototype.ya=function(a){this.v.push(a)};
    Za.prototype.load=function(a,b){var c=a,d=b||{};"string"==typeof c?c=[c]:c&&c.length||(d=c||{},c=[]);d.protocol&&ia(this.e,d.protocol);if(c.length)for(var e=this,f=c.length,h=0;h<c.length;h++)$a(this,c[h],function(){0==--f&&ab(e,d)});else ab(this,d)};function $a(a,b,c){b=a.Fa.h("https:"===ha(a.e),{id:encodeURIComponent(b)});la(a.e,b,c)}
    function ab(a,b){if(0!=a.v.length){for(var c=new ra(a.e,b),d=!1,e=0;e<a.v.length;e++)a.v[e].init(),d=d||a.v[e].supportsConfiguredBrowser();if(d)for(c.H&&l(c.u,[c.n.h(c.o,"loading")]),D(c,"loading"),c=0;c<a.v.length;c++)d=a.v[c],d.supportsConfiguredBrowser()&&d.load(null,c==a.v.length-1,b);else sa(c);a.v=[]}}var bb=(new na(navigator.userAgent,document)).parse(),cb=new da(window);window.Typekit||(window.Typekit={});
    if(!window.Typekit.load){var db=window.Typekit.config||{},eb=null;db.k&&(eb=new M(db.k));var X=new Za(eb,cb,bb,document.documentElement);window.Typekit.load=function(){X.load.apply(X,arguments)};window.Typekit.addKit=function(){X.ya.apply(X,arguments)}}var fb,Y,Z,K=window.Typekit.config||{};Z=new W(cb);Z.qa=new La(K.ps,K.ht,K.fi,K.a,K.kt,K.js);Y=new Na;Y.ma=!K.si;Y.W=!K.st;Y.J=!K.sa;Y.wa=!K.sw;Y.ga=!K.sb;Z.ha=Y;K.f&&(fb=new M(K.f),Z.aa=fb);K.hn&&(Z.la=K.hn);var L;
    if(K.fn)for(L=0;L<K.fn.length;L+=2)Z.s.push(new Ga(K.fn[L],K.fn[L+1]));if(K.c)for(L=0;L<K.c.length;L+=2)Z.R.push(new Ba);Z.b=bb;var gb;a:{var hb=Z.b,ib=new Na,jb=Z.ha||ib,kb;for(kb in T){var $=T[kb];if(U[$]&&U[$](hb,jb)){gb=$;break a}}for(kb in T)if($=T[kb],U[$]&&U[$](hb,ib)){gb="x";break a}gb="k"}Z.r=gb;window.Typekit.addKit(Z);if(window.WebFont)try{window.Typekit.load()}catch(lb){};
})(this,document);
