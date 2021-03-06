(function webpackUniversalModuleDefinition(root,factory){window.consolereio=factory()})(this,function(){return(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])
return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=!0;return module.exports}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)})([(function(module,exports,__webpack_require__){'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var url=__webpack_require__(1);var parser=__webpack_require__(7);var Manager=__webpack_require__(12);var debug=__webpack_require__(3)('socket.io-client');module.exports=exports=lookup;var cache=exports.managers={};function lookup(uri,opts){if((typeof uri==='undefined'?'undefined':_typeof(uri))==='object'){opts=uri;uri=undefined}
opts=opts||{};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var path=parsed.path;var sameNamespace=cache[id]&&path in cache[id].nsps;var newConnection=opts.forceNew||opts['force new connection']||!1===opts.multiplex||sameNamespace;var io;if(newConnection){debug('ignoring socket cache for %s',source);io=Manager(source,opts)}else{if(!cache[id]){debug('new io instance for %s',source);cache[id]=Manager(source,opts)}
io=cache[id]}
if(parsed.query&&!opts.query){opts.query=parsed.query}
return io.socket(parsed.path,opts)}
exports.protocol=parser.protocol;exports.connect=lookup;exports.Manager=__webpack_require__(12);exports.Socket=__webpack_require__(36)}),(function(module,exports,__webpack_require__){'use strict';var parseuri=__webpack_require__(2);var debug=__webpack_require__(3)('socket.io-client:url');module.exports=url;function url(uri,loc){var obj=uri;loc=loc||typeof location!=='undefined'&&location;if(null==uri)uri=loc.protocol+'//'+loc.host;if('string'===typeof uri){if('/'===uri.charAt(0)){if('/'===uri.charAt(1)){uri=loc.protocol+uri}else{uri=loc.host+uri}}
if(!/^(https?|wss?):\/\//.test(uri)){debug('protocol-less url %s',uri);if('undefined'!==typeof loc){uri=loc.protocol+'//'+uri}else{uri='https://'+uri}}
debug('parse %s',uri);obj=parseuri(uri)}
if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port='80'}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port='443'}}
obj.path=obj.path||'/';var ipv6=obj.host.indexOf(':')!==-1;var host=ipv6?'['+obj.host+']':obj.host;obj.id=obj.protocol+'://'+host+':'+obj.port;obj.href=obj.protocol+'://'+host+(loc&&loc.port===obj.port?'':':'+obj.port);return obj}}),(function(module,exports){var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports=function parseuri(str){var src=str,b=str.indexOf('['),e=str.indexOf(']');if(b!=-1&&e!=-1){str=str.substring(0,b)+str.substring(b,e).replace(/:/g,';')+str.substring(e,str.length)}
var m=re.exec(str||''),uri={},i=14;while(i--){uri[parts[i]]=m[i]||''}
if(b!=-1&&e!=-1){uri.source=src;uri.host=uri.host.substring(1,uri.host.length-1).replace(/;/g,':');uri.authority=uri.authority.replace('[','').replace(']','').replace(/;/g,':');uri.ipv6uri=!0}
return uri}}),(function(module,exports,__webpack_require__){(function(process){exports=module.exports=__webpack_require__(5);exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage='undefined'!=typeof chrome&&'undefined'!=typeof chrome.storage?chrome.storage.local:localstorage();exports.colors=['#0000CC','#0000FF','#0033CC','#0033FF','#0066CC','#0066FF','#0099CC','#0099FF','#00CC00','#00CC33','#00CC66','#00CC99','#00CCCC','#00CCFF','#3300CC','#3300FF','#3333CC','#3333FF','#3366CC','#3366FF','#3399CC','#3399FF','#33CC00','#33CC33','#33CC66','#33CC99','#33CCCC','#33CCFF','#6600CC','#6600FF','#6633CC','#6633FF','#66CC00','#66CC33','#9900CC','#9900FF','#9933CC','#9933FF','#99CC00','#99CC33','#CC0000','#CC0033','#CC0066','#CC0099','#CC00CC','#CC00FF','#CC3300','#CC3333','#CC3366','#CC3399','#CC33CC','#CC33FF','#CC6600','#CC6633','#CC9900','#CC9933','#CCCC00','#CCCC33','#FF0000','#FF0033','#FF0066','#FF0099','#FF00CC','#FF00FF','#FF3300','#FF3333','#FF3366','#FF3399','#FF33CC','#FF33FF','#FF6600','#FF6633','#FF9900','#FF9933','#FFCC00','#FFCC33'];function useColors(){if(typeof window!=='undefined'&&window.process&&window.process.type==='renderer'){return!0}
if(typeof navigator!=='undefined'&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)){return!1}
return(typeof document!=='undefined'&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance)||(typeof window!=='undefined'&&window.console&&(window.console.firebug||(window.console.exception&&window.console.table)))||(typeof navigator!=='undefined'&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31)||(typeof navigator!=='undefined'&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}
exports.formatters.j=function(v){try{return JSON.stringify(v)}catch(err){return'[UnexpectedJSONParseError]: '+err.message}};function formatArgs(args){var useColors=this.useColors;args[0]=(useColors?'%c':'')+this.namespace+(useColors?' %c':' ')+args[0]+(useColors?'%c ':' ')+'+'+exports.humanize(this.diff);if(!useColors)return;var c='color: '+this.color;args.splice(1,0,c,'color: inherit')
var index=0;var lastC=0;args[0].replace(/%[a-zA-Z%]/g,function(match){if('%%'===match)return;index++;if('%c'===match){lastC=index}});args.splice(lastC,0,c)}
function log(){return'object'===typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}
function save(namespaces){try{if(null==namespaces){exports.storage.removeItem('debug')}else{exports.storage.debug=namespaces}}catch(e){}}
function load(){var r;try{r=exports.storage.debug}catch(e){}
if(!r&&typeof process!=='undefined'&&'env' in process){r=process.env.DEBUG}
return r}
exports.enable(load());function localstorage(){try{return window.localStorage}catch(e){}}}.call(exports,__webpack_require__(4)))}),(function(module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined')}
function defaultClearTimeout(){throw new Error('clearTimeout has not been defined')}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}
try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}}())
function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}
try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}
function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}
try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}
var queue=[];var draining=!1;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}
draining=!1;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}
if(queue.length){drainQueue()}}
function drainQueue(){if(draining){return}
var timeout=runTimeout(cleanUpNextTick);draining=!0;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}
queueIndex=-1;len=queue.length}
currentQueue=null;draining=!1;runClearTimeout(timeout)}
process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}
Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title='browser';process.browser=!0;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]}
process.binding=function(name){throw new Error('process.binding is not supported')};process.cwd=function(){return'/'};process.chdir=function(dir){throw new Error('process.chdir is not supported')};process.umask=function(){return 0}}),(function(module,exports,__webpack_require__){exports=module.exports=createDebug.debug=createDebug['default']=createDebug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=__webpack_require__(6);exports.instances=[];exports.names=[];exports.skips=[];exports.formatters={};function selectColor(namespace){var hash=0,i;for(i in namespace){hash=((hash<<5)-hash)+namespace.charCodeAt(i);hash|=0}
return exports.colors[Math.abs(hash)%exports.colors.length]}
function createDebug(namespace){var prevTime;function debug(){if(!debug.enabled)return;var self=debug;var curr=+new Date();var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i]}
args[0]=exports.coerce(args[0]);if('string'!==typeof args[0]){args.unshift('%O')}
var index=0;args[0]=args[0].replace(/%([a-zA-Z%])/g,function(match,format){if(match==='%%')return match;index++;var formatter=exports.formatters[format];if('function'===typeof formatter){var val=args[index];match=formatter.call(self,val);args.splice(index,1);index--}
return match});exports.formatArgs.call(self,args);var logFn=debug.log||exports.log||console.log.bind(console);logFn.apply(self,args)}
debug.namespace=namespace;debug.enabled=exports.enabled(namespace);debug.useColors=exports.useColors();debug.color=selectColor(namespace);debug.destroy=destroy;if('function'===typeof exports.init){exports.init(debug)}
exports.instances.push(debug);return debug}
function destroy(){var index=exports.instances.indexOf(this);if(index!==-1){exports.instances.splice(index,1);return!0}else{return!1}}
function enable(namespaces){exports.save(namespaces);exports.names=[];exports.skips=[];var i;var split=(typeof namespaces==='string'?namespaces:'').split(/[\s,]+/);var len=split.length;for(i=0;i<len;i++){if(!split[i])continue;namespaces=split[i].replace(/\*/g,'.*?');if(namespaces[0]==='-'){exports.skips.push(new RegExp('^'+namespaces.substr(1)+'$'))}else{exports.names.push(new RegExp('^'+namespaces+'$'))}}
for(i=0;i<exports.instances.length;i++){var instance=exports.instances[i];instance.enabled=exports.enabled(instance.namespace)}}
function disable(){exports.enable('')}
function enabled(name){if(name[name.length-1]==='*'){return!0}
var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return!1}}
for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return!0}}
return!1}
function coerce(val){if(val instanceof Error)return val.stack||val.message;return val}}),(function(module,exports){var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;module.exports=function(val,options){options=options||{};var type=typeof val;if(type==='string'&&val.length>0){return parse(val)}else if(type==='number'&&isNaN(val)===!1){return options.long?fmtLong(val):fmtShort(val)}
throw new Error('val is not a non-empty string or a valid number. val='+JSON.stringify(val))};function parse(str){str=String(str);if(str.length>100){return}
var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return}
var n=parseFloat(match[1]);var type=(match[2]||'ms').toLowerCase();switch(type){case 'years':case 'year':case 'yrs':case 'yr':case 'y':return n*y;case 'days':case 'day':case 'd':return n*d;case 'hours':case 'hour':case 'hrs':case 'hr':case 'h':return n*h;case 'minutes':case 'minute':case 'mins':case 'min':case 'm':return n*m;case 'seconds':case 'second':case 'secs':case 'sec':case 's':return n*s;case 'milliseconds':case 'millisecond':case 'msecs':case 'msec':case 'ms':return n;default:return undefined}}
function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+'d'}
if(ms>=h){return Math.round(ms/h)+'h'}
if(ms>=m){return Math.round(ms/m)+'m'}
if(ms>=s){return Math.round(ms/s)+'s'}
return ms+'ms'}
function fmtLong(ms){return plural(ms,d,'day')||plural(ms,h,'hour')||plural(ms,m,'minute')||plural(ms,s,'second')||ms+' ms'}
function plural(ms,n,name){if(ms<n){return}
if(ms<n*1.5){return Math.floor(ms/n)+' '+name}
return Math.ceil(ms/n)+' '+name+'s'}}),(function(module,exports,__webpack_require__){var debug=__webpack_require__(3)('socket.io-parser');var Emitter=__webpack_require__(8);var binary=__webpack_require__(9);var isArray=__webpack_require__(10);var isBuf=__webpack_require__(11);exports.protocol=4;exports.types=['CONNECT','DISCONNECT','EVENT','ACK','ERROR','BINARY_EVENT','BINARY_ACK'];exports.CONNECT=0;exports.DISCONNECT=1;exports.EVENT=2;exports.ACK=3;exports.ERROR=4;exports.BINARY_EVENT=5;exports.BINARY_ACK=6;exports.Encoder=Encoder;exports.Decoder=Decoder;function Encoder(){}
var ERROR_PACKET=exports.ERROR+'"encode error"';Encoder.prototype.encode=function(obj,callback){debug('encoding packet %j',obj);if(exports.BINARY_EVENT===obj.type||exports.BINARY_ACK===obj.type){encodeAsBinary(obj,callback)}else{var encoding=encodeAsString(obj);callback([encoding])}};function encodeAsString(obj){var str=''+obj.type;if(exports.BINARY_EVENT===obj.type||exports.BINARY_ACK===obj.type){str+=obj.attachments+'-'}
if(obj.nsp&&'/'!==obj.nsp){str+=obj.nsp+','}
if(null!=obj.id){str+=obj.id}
if(null!=obj.data){var payload=tryStringify(obj.data);if(payload!==!1){str+=payload}else{return ERROR_PACKET}}
debug('encoded %j as %s',obj,str);return str}
function tryStringify(str){try{return JSON.stringify(str)}catch(e){return!1}}
function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack);callback(buffers)}
binary.removeBlobs(obj,writeEncoding)}
function Decoder(){this.reconstructor=null}
Emitter(Decoder.prototype);Decoder.prototype.add=function(obj){var packet;if(typeof obj==='string'){packet=decodeString(obj);if(exports.BINARY_EVENT===packet.type||exports.BINARY_ACK===packet.type){this.reconstructor=new BinaryReconstructor(packet);if(this.reconstructor.reconPack.attachments===0){this.emit('decoded',packet)}}else{this.emit('decoded',packet)}}else if(isBuf(obj)||obj.base64){if(!this.reconstructor){throw new Error('got binary data when not reconstructing a packet')}else{packet=this.reconstructor.takeBinaryData(obj);if(packet){this.reconstructor=null;this.emit('decoded',packet)}}}else{throw new Error('Unknown type: '+obj)}};function decodeString(str){var i=0;var p={type:Number(str.charAt(0))};if(null==exports.types[p.type]){return error('unknown packet type '+p.type)}
if(exports.BINARY_EVENT===p.type||exports.BINARY_ACK===p.type){var buf='';while(str.charAt(++i)!=='-'){buf+=str.charAt(i);if(i==str.length)break}
if(buf!=Number(buf)||str.charAt(i)!=='-'){throw new Error('Illegal attachments')}
p.attachments=Number(buf)}
if('/'===str.charAt(i+1)){p.nsp='';while(++i){var c=str.charAt(i);if(','===c)break;p.nsp+=c;if(i===str.length)break}}else{p.nsp='/'}
var next=str.charAt(i+1);if(''!==next&&Number(next)==next){p.id='';while(++i){var c=str.charAt(i);if(null==c||Number(c)!=c){--i;break}
p.id+=str.charAt(i);if(i===str.length)break}
p.id=Number(p.id)}
if(str.charAt(++i)){var payload=tryParse(str.substr(i));var isPayloadValid=payload!==!1&&(p.type===exports.ERROR||isArray(payload));if(isPayloadValid){p.data=payload}else{return error('invalid payload')}}
debug('decoded %s as %j',str,p);return p}
function tryParse(str){try{return JSON.parse(str)}catch(e){return!1}}
Decoder.prototype.destroy=function(){if(this.reconstructor){this.reconstructor.finishedReconstruction()}};function BinaryReconstructor(packet){this.reconPack=packet;this.buffers=[]}
BinaryReconstructor.prototype.takeBinaryData=function(binData){this.buffers.push(binData);if(this.buffers.length===this.reconPack.attachments){var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet}
return null};BinaryReconstructor.prototype.finishedReconstruction=function(){this.reconPack=null;this.buffers=[]};function error(msg){return{type:exports.ERROR,data:'parser error: '+msg}}}),(function(module,exports,__webpack_require__){if(!0){module.exports=Emitter}
function Emitter(obj){if(obj)return mixin(obj)};function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key]}
return obj}
Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).push(fn);return this};Emitter.prototype.once=function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments)}
on.fn=fn;this.on(event,on);return this};Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}
var callbacks=this._callbacks['$'+event];if(!callbacks)return this;if(1==arguments.length){delete this._callbacks['$'+event];return this}
var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break}}
return this};Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$'+event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args)}}
return this};Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks['$'+event]||[]};Emitter.prototype.hasListeners=function(event){return!!this.listeners(event).length}}),(function(module,exports,__webpack_require__){var isArray=__webpack_require__(10);var isBuf=__webpack_require__(11);var toString=Object.prototype.toString;var withNativeBlob=typeof Blob==='function'||(typeof Blob!=='undefined'&&toString.call(Blob)==='[object BlobConstructor]');var withNativeFile=typeof File==='function'||(typeof File!=='undefined'&&toString.call(File)==='[object FileConstructor]');exports.deconstructPacket=function(packet){var buffers=[];var packetData=packet.data;var pack=packet;pack.data=_deconstructPacket(packetData,buffers);pack.attachments=buffers.length;return{packet:pack,buffers:buffers}};function _deconstructPacket(data,buffers){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:!0,num:buffers.length};buffers.push(data);return placeholder}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i<data.length;i++){newData[i]=_deconstructPacket(data[i],buffers)}
return newData}else if(typeof data==='object'&&!(data instanceof Date)){var newData={};for(var key in data){newData[key]=_deconstructPacket(data[key],buffers)}
return newData}
return data}
exports.reconstructPacket=function(packet,buffers){packet.data=_reconstructPacket(packet.data,buffers);packet.attachments=undefined;return packet};function _reconstructPacket(data,buffers){if(!data)return data;if(data&&data._placeholder){return buffers[data.num]}else if(isArray(data)){for(var i=0;i<data.length;i++){data[i]=_reconstructPacket(data[i],buffers)}}else if(typeof data==='object'){for(var key in data){data[key]=_reconstructPacket(data[key],buffers)}}
return data}
exports.removeBlobs=function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj;if((withNativeBlob&&obj instanceof Blob)||(withNativeFile&&obj instanceof File)){pendingBlobs++;var fileReader=new FileReader();fileReader.onload=function(){if(containingObject){containingObject[curKey]=this.result}
else{bloblessData=this.result}
if(!--pendingBlobs){callback(bloblessData)}};fileReader.readAsArrayBuffer(obj)}else if(isArray(obj)){for(var i=0;i<obj.length;i++){_removeBlobs(obj[i],i,obj)}}else if(typeof obj==='object'&&!isBuf(obj)){for(var key in obj){_removeBlobs(obj[key],key,obj)}}}
var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData)}}}),(function(module,exports){var toString={}.toString;module.exports=Array.isArray||function(arr){return toString.call(arr)=='[object Array]'}}),(function(module,exports){module.exports=isBuf;var withNativeBuffer=typeof Buffer==='function'&&typeof Buffer.isBuffer==='function';var withNativeArrayBuffer=typeof ArrayBuffer==='function';var isView=function(obj){return typeof ArrayBuffer.isView==='function'?ArrayBuffer.isView(obj):(obj.buffer instanceof ArrayBuffer)};function isBuf(obj){return(withNativeBuffer&&Buffer.isBuffer(obj))||(withNativeArrayBuffer&&(obj instanceof ArrayBuffer||isView(obj)))}}),(function(module,exports,__webpack_require__){'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var eio=__webpack_require__(13);var Socket=__webpack_require__(36);var Emitter=__webpack_require__(8);var parser=__webpack_require__(7);var on=__webpack_require__(38);var bind=__webpack_require__(39);var debug=__webpack_require__(3)('socket.io-client:manager');var indexOf=__webpack_require__(35);var Backoff=__webpack_require__(40);var has=Object.prototype.hasOwnProperty;module.exports=Manager;function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri&&'object'===(typeof uri==='undefined'?'undefined':_typeof(uri))){opts=uri;uri=undefined}
opts=opts||{};opts.path=opts.path||'/socket.io';this.nsps={};this.subs=[];this.opts=opts;this.reconnection(opts.reconnection!==!1);this.reconnectionAttempts(opts.reconnectionAttempts||Infinity);this.reconnectionDelay(opts.reconnectionDelay||1000);this.reconnectionDelayMax(opts.reconnectionDelayMax||5000);this.randomizationFactor(opts.randomizationFactor||0.5);this.backoff=new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null==opts.timeout?20000:opts.timeout);this.readyState='closed';this.uri=uri;this.connecting=[];this.lastPing=null;this.encoding=!1;this.packetBuffer=[];var _parser=opts.parser||parser;this.encoder=new _parser.Encoder();this.decoder=new _parser.Decoder();this.autoConnect=opts.autoConnect!==!1;if(this.autoConnect)this.open()}
Manager.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].emit.apply(this.nsps[nsp],arguments)}}};Manager.prototype.updateSocketIds=function(){for(var nsp in this.nsps){if(has.call(this.nsps,nsp)){this.nsps[nsp].id=this.generateId(nsp)}}};Manager.prototype.generateId=function(nsp){return(nsp==='/'?'':nsp+'#')+this.engine.id};Emitter(Manager.prototype);Manager.prototype.reconnection=function(v){if(!arguments.length)return this._reconnection;this._reconnection=!!v;return this};Manager.prototype.reconnectionAttempts=function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts=v;return this};Manager.prototype.reconnectionDelay=function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay=v;this.backoff&&this.backoff.setMin(v);return this};Manager.prototype.randomizationFactor=function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor=v;this.backoff&&this.backoff.setJitter(v);return this};Manager.prototype.reconnectionDelayMax=function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax=v;this.backoff&&this.backoff.setMax(v);return this};Manager.prototype.timeout=function(v){if(!arguments.length)return this._timeout;this._timeout=v;return this};Manager.prototype.maybeReconnectOnOpen=function(){if(!this.reconnecting&&this._reconnection&&this.backoff.attempts===0){this.reconnect()}};Manager.prototype.open=Manager.prototype.connect=function(fn,opts){debug('readyState %s',this.readyState);if(~this.readyState.indexOf('open'))return this;debug('opening %s',this.uri);this.engine=eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState='opening';this.skipReconnect=!1;var openSub=on(socket,'open',function(){self.onopen();fn&&fn()});var errorSub=on(socket,'error',function(data){debug('connect_error');self.cleanup();self.readyState='closed';self.emitAll('connect_error',data);if(fn){var err=new Error('Connection error');err.data=data;fn(err)}else{self.maybeReconnectOnOpen()}});if(!1!==this._timeout){var timeout=this._timeout;debug('connect attempt will timeout after %d',timeout);var timer=setTimeout(function(){debug('connect attempt timed out after %d',timeout);openSub.destroy();socket.close();socket.emit('error','timeout');self.emitAll('connect_timeout',timeout)},timeout);this.subs.push({destroy:function destroy(){clearTimeout(timer)}})}
this.subs.push(openSub);this.subs.push(errorSub);return this};Manager.prototype.onopen=function(){debug('open');this.cleanup();this.readyState='open';this.emit('open');var socket=this.engine;this.subs.push(on(socket,'data',bind(this,'ondata')));this.subs.push(on(socket,'ping',bind(this,'onping')));this.subs.push(on(socket,'pong',bind(this,'onpong')));this.subs.push(on(socket,'error',bind(this,'onerror')));this.subs.push(on(socket,'close',bind(this,'onclose')));this.subs.push(on(this.decoder,'decoded',bind(this,'ondecoded')))};Manager.prototype.onping=function(){this.lastPing=new Date();this.emitAll('ping')};Manager.prototype.onpong=function(){this.emitAll('pong',new Date()-this.lastPing)};Manager.prototype.ondata=function(data){this.decoder.add(data)};Manager.prototype.ondecoded=function(packet){this.emit('packet',packet)};Manager.prototype.onerror=function(err){debug('error',err);this.emitAll('error',err)};Manager.prototype.socket=function(nsp,opts){var socket=this.nsps[nsp];if(!socket){socket=new Socket(this,nsp,opts);this.nsps[nsp]=socket;var self=this;socket.on('connecting',onConnecting);socket.on('connect',function(){socket.id=self.generateId(nsp)});if(this.autoConnect){onConnecting()}}
function onConnecting(){if(!~indexOf(self.connecting,socket)){self.connecting.push(socket)}}
return socket};Manager.prototype.destroy=function(socket){var index=indexOf(this.connecting,socket);if(~index)this.connecting.splice(index,1);if(this.connecting.length)return;this.close()};Manager.prototype.packet=function(packet){debug('writing packet %j',packet);var self=this;if(packet.query&&packet.type===0)packet.nsp+='?'+packet.query;if(!self.encoding){self.encoding=!0;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i<encodedPackets.length;i++){self.engine.write(encodedPackets[i],packet.options)}
self.encoding=!1;self.processPacketQueue()})}else{self.packetBuffer.push(packet)}};Manager.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var pack=this.packetBuffer.shift();this.packet(pack)}};Manager.prototype.cleanup=function(){debug('cleanup');var subsLength=this.subs.length;for(var i=0;i<subsLength;i++){var sub=this.subs.shift();sub.destroy()}
this.packetBuffer=[];this.encoding=!1;this.lastPing=null;this.decoder.destroy()};Manager.prototype.close=Manager.prototype.disconnect=function(){debug('disconnect');this.skipReconnect=!0;this.reconnecting=!1;if('opening'===this.readyState){this.cleanup()}
this.backoff.reset();this.readyState='closed';if(this.engine)this.engine.close()};Manager.prototype.onclose=function(reason){debug('onclose');this.cleanup();this.backoff.reset();this.readyState='closed';this.emit('close',reason);if(this._reconnection&&!this.skipReconnect){this.reconnect()}};Manager.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var self=this;if(this.backoff.attempts>=this._reconnectionAttempts){debug('reconnect failed');this.backoff.reset();this.emitAll('reconnect_failed');this.reconnecting=!1}else{var delay=this.backoff.duration();debug('will wait %dms before reconnect attempt',delay);this.reconnecting=!0;var timer=setTimeout(function(){if(self.skipReconnect)return;debug('attempting reconnect');self.emitAll('reconnect_attempt',self.backoff.attempts);self.emitAll('reconnecting',self.backoff.attempts);if(self.skipReconnect)return;self.open(function(err){if(err){debug('reconnect attempt error');self.reconnecting=!1;self.reconnect();self.emitAll('reconnect_error',err.data)}else{debug('reconnect success');self.onreconnect()}})},delay);this.subs.push({destroy:function destroy(){clearTimeout(timer)}})}};Manager.prototype.onreconnect=function(){var attempt=this.backoff.attempts;this.reconnecting=!1;this.backoff.reset();this.updateSocketIds();this.emitAll('reconnect',attempt)}}),(function(module,exports,__webpack_require__){module.exports=__webpack_require__(14);module.exports.parser=__webpack_require__(21)}),(function(module,exports,__webpack_require__){var transports=__webpack_require__(15);var Emitter=__webpack_require__(8);var debug=__webpack_require__(3)('engine.io-client:socket');var index=__webpack_require__(35);var parser=__webpack_require__(21);var parseuri=__webpack_require__(2);var parseqs=__webpack_require__(29);module.exports=Socket;function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts=opts||{};if(uri&&'object'===typeof uri){opts=uri;uri=null}
if(uri){uri=parseuri(uri);opts.hostname=uri.host;opts.secure=uri.protocol==='https'||uri.protocol==='wss';opts.port=uri.port;if(uri.query)opts.query=uri.query}else if(opts.host){opts.hostname=parseuri(opts.host).host}
this.secure=null!=opts.secure?opts.secure:(typeof location!=='undefined'&&'https:'===location.protocol);if(opts.hostname&&!opts.port){opts.port=this.secure?'443':'80'}
this.agent=opts.agent||!1;this.hostname=opts.hostname||(typeof location!=='undefined'?location.hostname:'localhost');this.port=opts.port||(typeof location!=='undefined'&&location.port?location.port:(this.secure?443:80));this.query=opts.query||{};if('string'===typeof this.query)this.query=parseqs.decode(this.query);this.upgrade=!1!==opts.upgrade;this.path=(opts.path||'/engine.io').replace(/\/$/,'')+'/';this.forceJSONP=!!opts.forceJSONP;this.jsonp=!1!==opts.jsonp;this.forceBase64=!!opts.forceBase64;this.enablesXDR=!!opts.enablesXDR;this.timestampParam=opts.timestampParam||'t';this.timestampRequests=opts.timestampRequests;this.transports=opts.transports||['polling','websocket'];this.transportOptions=opts.transportOptions||{};this.readyState='';this.writeBuffer=[];this.prevBufferLen=0;this.policyPort=opts.policyPort||843;this.rememberUpgrade=opts.rememberUpgrade||!1;this.binaryType=null;this.onlyBinaryUpgrades=opts.onlyBinaryUpgrades;this.perMessageDeflate=!1!==opts.perMessageDeflate?(opts.perMessageDeflate||{}):!1;if(!0===this.perMessageDeflate)this.perMessageDeflate={};if(this.perMessageDeflate&&null==this.perMessageDeflate.threshold){this.perMessageDeflate.threshold=1024}
this.pfx=opts.pfx||null;this.key=opts.key||null;this.passphrase=opts.passphrase||null;this.cert=opts.cert||null;this.ca=opts.ca||null;this.ciphers=opts.ciphers||null;this.rejectUnauthorized=opts.rejectUnauthorized===undefined?!0:opts.rejectUnauthorized;this.forceNode=!!opts.forceNode;this.isReactNative=(typeof navigator!=='undefined'&&typeof navigator.product==='string'&&navigator.product.toLowerCase()==='reactnative');if(typeof self==='undefined'||this.isReactNative){if(opts.extraHeaders&&Object.keys(opts.extraHeaders).length>0){this.extraHeaders=opts.extraHeaders}
if(opts.localAddress){this.localAddress=opts.localAddress}}
this.id=null;this.upgrades=null;this.pingInterval=null;this.pingTimeout=null;this.pingIntervalTimer=null;this.pingTimeoutTimer=null;this.open()}
Socket.priorWebsocketSuccess=!1;Emitter(Socket.prototype);Socket.protocol=parser.protocol;Socket.Socket=Socket;Socket.Transport=__webpack_require__(20);Socket.transports=__webpack_require__(15);Socket.parser=__webpack_require__(21);Socket.prototype.createTransport=function(name){debug('creating transport "%s"',name);var query=clone(this.query);query.EIO=parser.protocol;query.transport=name;var options=this.transportOptions[name]||{};if(this.id)query.sid=this.id;var transport=new transports[name]({query:query,socket:this,agent:options.agent||this.agent,hostname:options.hostname||this.hostname,port:options.port||this.port,secure:options.secure||this.secure,path:options.path||this.path,forceJSONP:options.forceJSONP||this.forceJSONP,jsonp:options.jsonp||this.jsonp,forceBase64:options.forceBase64||this.forceBase64,enablesXDR:options.enablesXDR||this.enablesXDR,timestampRequests:options.timestampRequests||this.timestampRequests,timestampParam:options.timestampParam||this.timestampParam,policyPort:options.policyPort||this.policyPort,pfx:options.pfx||this.pfx,key:options.key||this.key,passphrase:options.passphrase||this.passphrase,cert:options.cert||this.cert,ca:options.ca||this.ca,ciphers:options.ciphers||this.ciphers,rejectUnauthorized:options.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:options.perMessageDeflate||this.perMessageDeflate,extraHeaders:options.extraHeaders||this.extraHeaders,forceNode:options.forceNode||this.forceNode,localAddress:options.localAddress||this.localAddress,requestTimeout:options.requestTimeout||this.requestTimeout,protocols:options.protocols||void(0),isReactNative:this.isReactNative});return transport};function clone(obj){var o={};for(var i in obj){if(obj.hasOwnProperty(i)){o[i]=obj[i]}}
return o}
Socket.prototype.open=function(){var transport;if(this.rememberUpgrade&&Socket.priorWebsocketSuccess&&this.transports.indexOf('websocket')!==-1){transport='websocket'}else if(0===this.transports.length){var self=this;setTimeout(function(){self.emit('error','No transports available')},0);return}else{transport=this.transports[0]}
this.readyState='opening';try{transport=this.createTransport(transport)}catch(e){this.transports.shift();this.open();return}
transport.open();this.setTransport(transport)};Socket.prototype.setTransport=function(transport){debug('setting transport %s',transport.name);var self=this;if(this.transport){debug('clearing existing transport %s',this.transport.name);this.transport.removeAllListeners()}
this.transport=transport;transport.on('drain',function(){self.onDrain()}).on('packet',function(packet){self.onPacket(packet)}).on('error',function(e){self.onError(e)}).on('close',function(){self.onClose('transport close')})};Socket.prototype.probe=function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1});var failed=!1;var self=this;Socket.priorWebsocketSuccess=!1;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary&&self.transport.supportsBinary;failed=failed||upgradeLosesBinary}
if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:'ping',data:'probe'}]);transport.once('packet',function(msg){if(failed)return;if('pong'===msg.type&&'probe'===msg.data){debug('probe transport "%s" pong',name);self.upgrading=!0;self.emit('upgrading',transport);if(!transport)return;Socket.priorWebsocketSuccess='websocket'===transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if('closed'===self.readyState)return;debug('changing transport and sending upgrade packet');cleanup();self.setTransport(transport);transport.send([{type:'upgrade'}]);self.emit('upgrade',transport);transport=null;self.upgrading=!1;self.flush()})}else{debug('probe transport "%s" failed',name);var err=new Error('probe error');err.transport=transport.name;self.emit('upgradeError',err)}})}
function freezeTransport(){if(failed)return;failed=!0;cleanup();transport.close();transport=null}
function onerror(err){var error=new Error('probe error: '+err);error.transport=transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit('upgradeError',error)}
function onTransportClose(){onerror('transport closed')}
function onclose(){onerror('socket closed')}
function onupgrade(to){if(transport&&to.name!==transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport()}}
function cleanup(){transport.removeListener('open',onTransportOpen);transport.removeListener('error',onerror);transport.removeListener('close',onTransportClose);self.removeListener('close',onclose);self.removeListener('upgrading',onupgrade)}
transport.once('open',onTransportOpen);transport.once('error',onerror);transport.once('close',onTransportClose);this.once('close',onclose);this.once('upgrading',onupgrade);transport.open()};Socket.prototype.onOpen=function(){debug('socket open');this.readyState='open';Socket.priorWebsocketSuccess='websocket'===this.transport.name;this.emit('open');this.flush();if('open'===this.readyState&&this.upgrade&&this.transport.pause){debug('starting upgrade probes');for(var i=0,l=this.upgrades.length;i<l;i++){this.probe(this.upgrades[i])}}};Socket.prototype.onPacket=function(packet){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit('packet',packet);this.emit('heartbeat');switch(packet.type){case 'open':this.onHandshake(JSON.parse(packet.data));break;case 'pong':this.setPing();this.emit('pong');break;case 'error':var err=new Error('server error');err.code=packet.data;this.onError(err);break;case 'message':this.emit('data',packet.data);this.emit('message',packet.data);break}}else{debug('packet received with socket readyState "%s"',this.readyState)}};Socket.prototype.onHandshake=function(data){this.emit('handshake',data);this.id=data.sid;this.transport.query.sid=data.sid;this.upgrades=this.filterUpgrades(data.upgrades);this.pingInterval=data.pingInterval;this.pingTimeout=data.pingTimeout;this.onOpen();if('closed'===this.readyState)return;this.setPing();this.removeListener('heartbeat',this.onHeartbeat);this.on('heartbeat',this.onHeartbeat)};Socket.prototype.onHeartbeat=function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer=setTimeout(function(){if('closed'===self.readyState)return;self.onClose('ping timeout')},timeout||(self.pingInterval+self.pingTimeout))};Socket.prototype.setPing=function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer=setTimeout(function(){debug('writing ping packet - expecting pong within %sms',self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout)},self.pingInterval)};Socket.prototype.ping=function(){var self=this;this.sendPacket('ping',function(){self.emit('ping')})};Socket.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen);this.prevBufferLen=0;if(0===this.writeBuffer.length){this.emit('drain')}else{this.flush()}};Socket.prototype.flush=function(){if('closed'!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){debug('flushing %d packets in socket',this.writeBuffer.length);this.transport.send(this.writeBuffer);this.prevBufferLen=this.writeBuffer.length;this.emit('flush')}};Socket.prototype.write=Socket.prototype.send=function(msg,options,fn){this.sendPacket('message',msg,options,fn);return this};Socket.prototype.sendPacket=function(type,data,options,fn){if('function'===typeof data){fn=data;data=undefined}
if('function'===typeof options){fn=options;options=null}
if('closing'===this.readyState||'closed'===this.readyState){return}
options=options||{};options.compress=!1!==options.compress;var packet={type:type,data:data,options:options};this.emit('packetCreate',packet);this.writeBuffer.push(packet);if(fn)this.once('flush',fn);this.flush()};Socket.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.readyState='closing';var self=this;if(this.writeBuffer.length){this.once('drain',function(){if(this.upgrading){waitForUpgrade()}else{close()}})}else if(this.upgrading){waitForUpgrade()}else{close()}}
function close(){self.onClose('forced close');debug('socket closing - telling transport to close');self.transport.close()}
function cleanupAndClose(){self.removeListener('upgrade',cleanupAndClose);self.removeListener('upgradeError',cleanupAndClose);close()}
function waitForUpgrade(){self.once('upgrade',cleanupAndClose);self.once('upgradeError',cleanupAndClose)}
return this};Socket.prototype.onError=function(err){debug('socket error %j',err);Socket.priorWebsocketSuccess=!1;this.emit('error',err);this.onClose('transport error',err)};Socket.prototype.onClose=function(reason,desc){if('opening'===this.readyState||'open'===this.readyState||'closing'===this.readyState){debug('socket close with reason: "%s"',reason);var self=this;clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer);this.transport.removeAllListeners('close');this.transport.close();this.transport.removeAllListeners();this.readyState='closed';this.id=null;this.emit('close',reason,desc);self.writeBuffer=[];self.prevBufferLen=0}};Socket.prototype.filterUpgrades=function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i<j;i++){if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i])}
return filteredUpgrades}}),(function(module,exports,__webpack_require__){var XMLHttpRequest=__webpack_require__(16);var XHR=__webpack_require__(18);var JSONP=__webpack_require__(32);var websocket=__webpack_require__(33);exports.polling=polling;exports.websocket=websocket;function polling(opts){var xhr;var xd=!1;var xs=!1;var jsonp=!1!==opts.jsonp;if(typeof location!=='undefined'){var isSSL='https:'===location.protocol;var port=location.port;if(!port){port=isSSL?443:80}
xd=opts.hostname!==location.hostname||port!==opts.port;xs=opts.secure!==isSSL}
opts.xdomain=xd;opts.xscheme=xs;xhr=new XMLHttpRequest(opts);if('open' in xhr&&!opts.forceJSONP){return new XHR(opts)}else{if(!jsonp)throw new Error('JSONP disabled');return new JSONP(opts)}}}),(function(module,exports,__webpack_require__){var hasCORS=__webpack_require__(17);module.exports=function(opts){var xdomain=opts.xdomain;var xscheme=opts.xscheme;var enablesXDR=opts.enablesXDR;try{if('undefined'!==typeof XMLHttpRequest&&(!xdomain||hasCORS)){return new XMLHttpRequest()}}catch(e){}
try{if('undefined'!==typeof XDomainRequest&&!xscheme&&enablesXDR){return new XDomainRequest()}}catch(e){}
if(!xdomain){try{return new self[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP')}catch(e){}}}}),(function(module,exports){try{module.exports=typeof XMLHttpRequest!=='undefined'&&'withCredentials' in new XMLHttpRequest()}catch(err){module.exports=!1}}),(function(module,exports,__webpack_require__){var XMLHttpRequest=__webpack_require__(16);var Polling=__webpack_require__(19);var Emitter=__webpack_require__(8);var inherit=__webpack_require__(30);var debug=__webpack_require__(3)('engine.io-client:polling-xhr');module.exports=XHR;module.exports.Request=Request;function empty(){}
function XHR(opts){Polling.call(this,opts);this.requestTimeout=opts.requestTimeout;this.extraHeaders=opts.extraHeaders;if(typeof location!=='undefined'){var isSSL='https:'===location.protocol;var port=location.port;if(!port){port=isSSL?443:80}
this.xd=(typeof location!=='undefined'&&opts.hostname!==location.hostname)||port!==opts.port;this.xs=opts.secure!==isSSL}}
inherit(XHR,Polling);XHR.prototype.supportsBinary=!0;XHR.prototype.request=function(opts){opts=opts||{};opts.uri=this.uri();opts.xd=this.xd;opts.xs=this.xs;opts.agent=this.agent||!1;opts.supportsBinary=this.supportsBinary;opts.enablesXDR=this.enablesXDR;opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;opts.requestTimeout=this.requestTimeout;opts.extraHeaders=this.extraHeaders;return new Request(opts)};XHR.prototype.doWrite=function(data,fn){var isBinary=typeof data!=='string'&&data!==undefined;var req=this.request({method:'POST',data:data,isBinary:isBinary});var self=this;req.on('success',fn);req.on('error',function(err){self.onError('xhr post error',err)});this.sendXhr=req};XHR.prototype.doPoll=function(){debug('xhr poll');var req=this.request();var self=this;req.on('data',function(data){self.onData(data)});req.on('error',function(err){self.onError('xhr poll error',err)});this.pollXhr=req};function Request(opts){this.method=opts.method||'GET';this.uri=opts.uri;this.xd=!!opts.xd;this.xs=!!opts.xs;this.async=!1!==opts.async;this.data=undefined!==opts.data?opts.data:null;this.agent=opts.agent;this.isBinary=opts.isBinary;this.supportsBinary=opts.supportsBinary;this.enablesXDR=opts.enablesXDR;this.requestTimeout=opts.requestTimeout;this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;this.extraHeaders=opts.extraHeaders;this.create()}
Emitter(Request.prototype);Request.prototype.create=function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;var xhr=this.xhr=new XMLHttpRequest(opts);var self=this;try{debug('xhr open %s: %s',this.method,this.uri);xhr.open(this.method,this.uri,this.async);try{if(this.extraHeaders){xhr.setDisableHeaderCheck&&xhr.setDisableHeaderCheck(!0);for(var i in this.extraHeaders){if(this.extraHeaders.hasOwnProperty(i)){xhr.setRequestHeader(i,this.extraHeaders[i])}}}}catch(e){}
if('POST'===this.method){try{if(this.isBinary){xhr.setRequestHeader('Content-type','application/octet-stream')}else{xhr.setRequestHeader('Content-type','text/plain;charset=UTF-8')}}catch(e){}}
try{xhr.setRequestHeader('Accept','*/*')}catch(e){}
if('withCredentials' in xhr){xhr.withCredentials=!0}
if(this.requestTimeout){xhr.timeout=this.requestTimeout}
if(this.hasXDR()){xhr.onload=function(){self.onLoad()};xhr.onerror=function(){self.onError(xhr.responseText)}}else{xhr.onreadystatechange=function(){if(xhr.readyState===2){try{var contentType=xhr.getResponseHeader('Content-Type');if(self.supportsBinary&&contentType==='application/octet-stream'){xhr.responseType='arraybuffer'}}catch(e){}}
if(4!==xhr.readyState)return;if(200===xhr.status||1223===xhr.status){self.onLoad()}else{setTimeout(function(){self.onError(xhr.status)},0)}}}
debug('xhr data %s',this.data);xhr.send(this.data)}catch(e){setTimeout(function(){self.onError(e)},0);return}
if(typeof document!=='undefined'){this.index=Request.requestsCount++;Request.requests[this.index]=this}};Request.prototype.onSuccess=function(){this.emit('success');this.cleanup()};Request.prototype.onData=function(data){this.emit('data',data);this.onSuccess()};Request.prototype.onError=function(err){this.emit('error',err);this.cleanup(!0)};Request.prototype.cleanup=function(fromError){if('undefined'===typeof this.xhr||null===this.xhr){return}
if(this.hasXDR()){this.xhr.onload=this.xhr.onerror=empty}else{this.xhr.onreadystatechange=empty}
if(fromError){try{this.xhr.abort()}catch(e){}}
if(typeof document!=='undefined'){delete Request.requests[this.index]}
this.xhr=null};Request.prototype.onLoad=function(){var data;try{var contentType;try{contentType=this.xhr.getResponseHeader('Content-Type')}catch(e){}
if(contentType==='application/octet-stream'){data=this.xhr.response||this.xhr.responseText}else{data=this.xhr.responseText}}catch(e){this.onError(e)}
if(null!=data){this.onData(data)}};Request.prototype.hasXDR=function(){return typeof XDomainRequest!=='undefined'&&!this.xs&&this.enablesXDR};Request.prototype.abort=function(){this.cleanup()};Request.requestsCount=0;Request.requests={};if(typeof document!=='undefined'){if(typeof attachEvent==='function'){attachEvent('onunload',unloadHandler)}else if(typeof addEventListener==='function'){var terminationEvent='onpagehide' in self?'pagehide':'unload';addEventListener(terminationEvent,unloadHandler,!1)}}
function unloadHandler(){for(var i in Request.requests){if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort()}}}}),(function(module,exports,__webpack_require__){var Transport=__webpack_require__(20);var parseqs=__webpack_require__(29);var parser=__webpack_require__(21);var inherit=__webpack_require__(30);var yeast=__webpack_require__(31);var debug=__webpack_require__(3)('engine.io-client:polling');module.exports=Polling;var hasXHR2=(function(){var XMLHttpRequest=__webpack_require__(16);var xhr=new XMLHttpRequest({xdomain:!1});return null!=xhr.responseType})();function Polling(opts){var forceBase64=(opts&&opts.forceBase64);if(!hasXHR2||forceBase64){this.supportsBinary=!1}
Transport.call(this,opts)}
inherit(Polling,Transport);Polling.prototype.name='polling';Polling.prototype.doOpen=function(){this.poll()};Polling.prototype.pause=function(onPause){var self=this;this.readyState='pausing';function pause(){debug('paused');self.readyState='paused';onPause()}
if(this.polling||!this.writable){var total=0;if(this.polling){debug('we are currently polling - waiting to pause');total++;this.once('pollComplete',function(){debug('pre-pause polling complete');--total||pause()})}
if(!this.writable){debug('we are currently writing - waiting to pause');total++;this.once('drain',function(){debug('pre-pause writing complete');--total||pause()})}}else{pause()}};Polling.prototype.poll=function(){debug('polling');this.polling=!0;this.doPoll();this.emit('poll')};Polling.prototype.onData=function(data){var self=this;debug('polling got data %s',data);var callback=function(packet,index,total){if('opening'===self.readyState){self.onOpen()}
if('close'===packet.type){self.onClose();return!1}
self.onPacket(packet)};parser.decodePayload(data,this.socket.binaryType,callback);if('closed'!==this.readyState){this.polling=!1;this.emit('pollComplete');if('open'===this.readyState){this.poll()}else{debug('ignoring poll - transport state "%s"',this.readyState)}}};Polling.prototype.doClose=function(){var self=this;function close(){debug('writing close packet');self.write([{type:'close'}])}
if('open'===this.readyState){debug('transport open - closing');close()}else{debug('transport not open - deferring close');this.once('open',close)}};Polling.prototype.write=function(packets){var self=this;this.writable=!1;var callbackfn=function(){self.writable=!0;self.emit('drain')};parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn)})};Polling.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'https':'http';var port='';if(!1!==this.timestampRequests){query[this.timestampParam]=yeast()}
if(!this.supportsBinary&&!query.sid){query.b64=1}
query=parseqs.encode(query);if(this.port&&(('https'===schema&&Number(this.port)!==443)||('http'===schema&&Number(this.port)!==80))){port=':'+this.port}
if(query.length){query='?'+query}
var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query}}),(function(module,exports,__webpack_require__){var parser=__webpack_require__(21);var Emitter=__webpack_require__(8);module.exports=Transport;function Transport(opts){this.path=opts.path;this.hostname=opts.hostname;this.port=opts.port;this.secure=opts.secure;this.query=opts.query;this.timestampParam=opts.timestampParam;this.timestampRequests=opts.timestampRequests;this.readyState='';this.agent=opts.agent||!1;this.socket=opts.socket;this.enablesXDR=opts.enablesXDR;this.pfx=opts.pfx;this.key=opts.key;this.passphrase=opts.passphrase;this.cert=opts.cert;this.ca=opts.ca;this.ciphers=opts.ciphers;this.rejectUnauthorized=opts.rejectUnauthorized;this.forceNode=opts.forceNode;this.isReactNative=opts.isReactNative;this.extraHeaders=opts.extraHeaders;this.localAddress=opts.localAddress}
Emitter(Transport.prototype);Transport.prototype.onError=function(msg,desc){var err=new Error(msg);err.type='TransportError';err.description=desc;this.emit('error',err);return this};Transport.prototype.open=function(){if('closed'===this.readyState||''===this.readyState){this.readyState='opening';this.doOpen()}
return this};Transport.prototype.close=function(){if('opening'===this.readyState||'open'===this.readyState){this.doClose();this.onClose()}
return this};Transport.prototype.send=function(packets){if('open'===this.readyState){this.write(packets)}else{throw new Error('Transport not open')}};Transport.prototype.onOpen=function(){this.readyState='open';this.writable=!0;this.emit('open')};Transport.prototype.onData=function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet)};Transport.prototype.onPacket=function(packet){this.emit('packet',packet)};Transport.prototype.onClose=function(){this.readyState='closed';this.emit('close')}}),(function(module,exports,__webpack_require__){var keys=__webpack_require__(22);var hasBinary=__webpack_require__(23);var sliceBuffer=__webpack_require__(24);var after=__webpack_require__(25);var utf8=__webpack_require__(26);var base64encoder;if(typeof ArrayBuffer!=='undefined'){base64encoder=__webpack_require__(27)}
var isAndroid=typeof navigator!=='undefined'&&/Android/i.test(navigator.userAgent);var isPhantomJS=typeof navigator!=='undefined'&&/PhantomJS/i.test(navigator.userAgent);var dontSendBlobs=isAndroid||isPhantomJS;exports.protocol=3;var packets=exports.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets);var err={type:'error',data:'parser error'};var Blob=__webpack_require__(28);exports.encodePacket=function(packet,supportsBinary,utf8encode,callback){if(typeof supportsBinary==='function'){callback=supportsBinary;supportsBinary=!1}
if(typeof utf8encode==='function'){callback=utf8encode;utf8encode=null}
var data=(packet.data===undefined)?undefined:packet.data.buffer||packet.data;if(typeof ArrayBuffer!=='undefined'&&data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback)}else if(typeof Blob!=='undefined'&&data instanceof Blob){return encodeBlob(packet,supportsBinary,callback)}
if(data&&data.base64){return encodeBase64Object(packet,callback)}
var encoded=packets[packet.type];if(undefined!==packet.data){encoded+=utf8encode?utf8.encode(String(packet.data),{strict:!1}):String(packet.data)}
return callback(''+encoded)};function encodeBase64Object(packet,callback){var message='b'+exports.packets[packet.type]+packet.data.data;return callback(message)}
function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}
var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1+data.byteLength);resultBuffer[0]=packets[packet.type];for(var i=0;i<contentArray.length;i++){resultBuffer[i+1]=contentArray[i]}
return callback(resultBuffer.buffer)}
function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}
var fr=new FileReader();fr.onload=function(){exports.encodePacket({type:packet.type,data:fr.result},supportsBinary,!0,callback)};return fr.readAsArrayBuffer(packet.data)}
function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback)}
if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback)}
var length=new Uint8Array(1);length[0]=packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob)}
exports.encodeBase64Packet=function(packet,callback){var message='b'+exports.packets[packet.type];if(typeof Blob!=='undefined'&&packet.data instanceof Blob){var fr=new FileReader();fr.onload=function(){var b64=fr.result.split(',')[1];callback(message+b64)};return fr.readAsDataURL(packet.data)}
var b64data;try{b64data=String.fromCharCode.apply(null,new Uint8Array(packet.data))}catch(e){var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i<typed.length;i++){basic[i]=typed[i]}
b64data=String.fromCharCode.apply(null,basic)}
message+=btoa(b64data);return callback(message)};exports.decodePacket=function(data,binaryType,utf8decode){if(data===undefined){return err}
if(typeof data==='string'){if(data.charAt(0)==='b'){return exports.decodeBase64Packet(data.substr(1),binaryType)}
if(utf8decode){data=tryDecode(data);if(data===!1){return err}}
var type=data.charAt(0);if(Number(type)!=type||!packetslist[type]){return err}
if(data.length>1){return{type:packetslist[type],data:data.substring(1)}}else{return{type:packetslist[type]}}}
var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob&&binaryType==='blob'){rest=new Blob([rest])}
return{type:packetslist[type],data:rest}};function tryDecode(data){try{data=utf8.decode(data,{strict:!1})}catch(e){return!1}
return data}
exports.decodeBase64Packet=function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!base64encoder){return{type:type,data:{base64:!0,data:msg.substr(1)}}}
var data=base64encoder.decode(msg.substr(1));if(binaryType==='blob'&&Blob){data=new Blob([data])}
return{type:type,data:data}};exports.encodePayload=function(packets,supportsBinary,callback){if(typeof supportsBinary==='function'){callback=supportsBinary;supportsBinary=null}
var isBinary=hasBinary(packets);if(supportsBinary&&isBinary){if(Blob&&!dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback)}
return exports.encodePayloadAsArrayBuffer(packets,callback)}
if(!packets.length){return callback('0:')}
function setLengthHeader(message){return message.length+':'+message}
function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?!1:supportsBinary,!1,function(message){doneCallback(null,setLengthHeader(message))})}
map(packets,encodeOne,function(err,results){return callback(results.join(''))})};function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function(i,el,cb){each(el,function(error,msg){result[i]=msg;cb(error,result)})};for(var i=0;i<ary.length;i++){eachWithIndex(i,ary[i],next)}}
exports.decodePayload=function(data,binaryType,callback){if(typeof data!=='string'){return exports.decodePayloadAsBinary(data,binaryType,callback)}
if(typeof binaryType==='function'){callback=binaryType;binaryType=null}
var packet;if(data===''){return callback(err,0,1)}
var length='',n,msg;for(var i=0,l=data.length;i<l;i++){var chr=data.charAt(i);if(chr!==':'){length+=chr;continue}
if(length===''||(length!=(n=Number(length)))){return callback(err,0,1)}
msg=data.substr(i+1,n);if(length!=msg.length){return callback(err,0,1)}
if(msg.length){packet=exports.decodePacket(msg,binaryType,!1);if(err.type===packet.type&&err.data===packet.data){return callback(err,0,1)}
var ret=callback(packet,i+n,l);if(!1===ret)return}
i+=n;length=''}
if(length!==''){return callback(err,0,1)}};exports.encodePayloadAsArrayBuffer=function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0))}
function encodeOne(packet,doneCallback){exports.encodePacket(packet,!0,!0,function(data){return doneCallback(null,data)})}
map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p==='string'){len=p.length}else{len=p.byteLength}
return acc+len.toString().length+len+2},0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p==='string';var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i<p.length;i++){view[i]=p.charCodeAt(i)}
ab=view.buffer}
if(isString){resultArray[bufferIndex++]=0}else{resultArray[bufferIndex++]=1}
var lenStr=ab.byteLength.toString();for(var i=0;i<lenStr.length;i++){resultArray[bufferIndex++]=parseInt(lenStr[i])}
resultArray[bufferIndex++]=255;var view=new Uint8Array(ab);for(var i=0;i<view.length;i++){resultArray[bufferIndex++]=view[i]}});return callback(resultArray.buffer)})};exports.encodePayloadAsBlob=function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,!0,!0,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0]=1;if(typeof encoded==='string'){var view=new Uint8Array(encoded.length);for(var i=0;i<encoded.length;i++){view[i]=encoded.charCodeAt(i)}
encoded=view.buffer;binaryIdentifier[0]=0}
var len=(encoded instanceof ArrayBuffer)?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length+1);for(var i=0;i<lenStr.length;i++){lengthAry[i]=parseInt(lenStr[i])}
lengthAry[lenStr.length]=255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob)}})}
map(packets,encodeOne,function(err,results){return callback(new Blob(results))})};exports.decodePayloadAsBinary=function(data,binaryType,callback){if(typeof binaryType==='function'){callback=binaryType;binaryType=null}
var bufferTail=data;var buffers=[];while(bufferTail.byteLength>0){var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0]===0;var msgLength='';for(var i=1;;i++){if(tailArray[i]===255)break;if(msgLength.length>310){return callback(err,0,1)}
msgLength+=tailArray[i]}
bufferTail=sliceBuffer(bufferTail,2+msgLength.length);msgLength=parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg=String.fromCharCode.apply(null,new Uint8Array(msg))}catch(e){var typed=new Uint8Array(msg);msg='';for(var i=0;i<typed.length;i++){msg+=String.fromCharCode(typed[i])}}}
buffers.push(msg);bufferTail=sliceBuffer(bufferTail,msgLength)}
var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,!0),i,total)})}}),(function(module,exports){module.exports=Object.keys||function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj){if(has.call(obj,i)){arr.push(i)}}
return arr}}),(function(module,exports,__webpack_require__){var isArray=__webpack_require__(10);var toString=Object.prototype.toString;var withNativeBlob=typeof Blob==='function'||typeof Blob!=='undefined'&&toString.call(Blob)==='[object BlobConstructor]';var withNativeFile=typeof File==='function'||typeof File!=='undefined'&&toString.call(File)==='[object FileConstructor]';module.exports=hasBinary;function hasBinary(obj){if(!obj||typeof obj!=='object'){return!1}
if(isArray(obj)){for(var i=0,l=obj.length;i<l;i++){if(hasBinary(obj[i])){return!0}}
return!1}
if((typeof Buffer==='function'&&Buffer.isBuffer&&Buffer.isBuffer(obj))||(typeof ArrayBuffer==='function'&&obj instanceof ArrayBuffer)||(withNativeBlob&&obj instanceof Blob)||(withNativeFile&&obj instanceof File)){return!0}
if(obj.toJSON&&typeof obj.toJSON==='function'&&arguments.length===1){return hasBinary(obj.toJSON(),!0)}
for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)&&hasBinary(obj[key])){return!0}}
return!1}}),(function(module,exports){module.exports=function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start=start||0;end=end||bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end)}
if(start<0){start+=bytes}
if(end<0){end+=bytes}
if(end>bytes){end=bytes}
if(start>=bytes||start>=end||bytes===0){return new ArrayBuffer(0)}
var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end-start);for(var i=start,ii=0;i<end;i++,ii++){result[ii]=abv[i]}
return result.buffer}}),(function(module,exports){module.exports=after
function after(count,callback,err_cb){var bail=!1
err_cb=err_cb||noop
proxy.count=count
return(count===0)?callback():proxy
function proxy(err,result){if(proxy.count<=0){throw new Error('after called too many times')}
--proxy.count
if(err){bail=!0
callback(err)
callback=err_cb}else if(proxy.count===0&&!bail){callback(null,result)}}}
function noop(){}}),(function(module,exports){var stringFromCharCode=String.fromCharCode;function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000)}else{output.push(value);counter--}}else{output.push(value)}}
return output}
function ucs2encode(array){var length=array.length;var index=-1;var value;var output='';while(++index<length){value=array[index];if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF}
output+=stringFromCharCode(value)}
return output}
function checkScalarValue(codePoint,strict){if(codePoint>=0xD800&&codePoint<=0xDFFF){if(strict){throw Error('Lone surrogate U+'+codePoint.toString(16).toUpperCase()+' is not a scalar value')}
return!1}
return!0}
function createByte(codePoint,shift){return stringFromCharCode(((codePoint>>shift)&0x3F)|0x80)}
function encodeCodePoint(codePoint,strict){if((codePoint&0xFFFFFF80)==0){return stringFromCharCode(codePoint)}
var symbol='';if((codePoint&0xFFFFF800)==0){symbol=stringFromCharCode(((codePoint>>6)&0x1F)|0xC0)}
else if((codePoint&0xFFFF0000)==0){if(!checkScalarValue(codePoint,strict)){codePoint=0xFFFD}
symbol=stringFromCharCode(((codePoint>>12)&0x0F)|0xE0);symbol+=createByte(codePoint,6)}
else if((codePoint&0xFFE00000)==0){symbol=stringFromCharCode(((codePoint>>18)&0x07)|0xF0);symbol+=createByte(codePoint,12);symbol+=createByte(codePoint,6)}
symbol+=stringFromCharCode((codePoint&0x3F)|0x80);return symbol}
function utf8encode(string,opts){opts=opts||{};var strict=!1!==opts.strict;var codePoints=ucs2decode(string);var length=codePoints.length;var index=-1;var codePoint;var byteString='';while(++index<length){codePoint=codePoints[index];byteString+=encodeCodePoint(codePoint,strict)}
return byteString}
function readContinuationByte(){if(byteIndex>=byteCount){throw Error('Invalid byte index')}
var continuationByte=byteArray[byteIndex]&0xFF;byteIndex++;if((continuationByte&0xC0)==0x80){return continuationByte&0x3F}
throw Error('Invalid continuation byte')}
function decodeSymbol(strict){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex>byteCount){throw Error('Invalid byte index')}
if(byteIndex==byteCount){return!1}
byte1=byteArray[byteIndex]&0xFF;byteIndex++;if((byte1&0x80)==0){return byte1}
if((byte1&0xE0)==0xC0){byte2=readContinuationByte();codePoint=((byte1&0x1F)<<6)|byte2;if(codePoint>=0x80){return codePoint}else{throw Error('Invalid continuation byte')}}
if((byte1&0xF0)==0xE0){byte2=readContinuationByte();byte3=readContinuationByte();codePoint=((byte1&0x0F)<<12)|(byte2<<6)|byte3;if(codePoint>=0x0800){return checkScalarValue(codePoint,strict)?codePoint:0xFFFD}else{throw Error('Invalid continuation byte')}}
if((byte1&0xF8)==0xF0){byte2=readContinuationByte();byte3=readContinuationByte();byte4=readContinuationByte();codePoint=((byte1&0x07)<<0x12)|(byte2<<0x0C)|(byte3<<0x06)|byte4;if(codePoint>=0x010000&&codePoint<=0x10FFFF){return codePoint}}
throw Error('Invalid UTF-8 detected')}
var byteArray;var byteCount;var byteIndex;function utf8decode(byteString,opts){opts=opts||{};var strict=!1!==opts.strict;byteArray=ucs2decode(byteString);byteCount=byteArray.length;byteIndex=0;var codePoints=[];var tmp;while((tmp=decodeSymbol(strict))!==!1){codePoints.push(tmp)}
return ucs2encode(codePoints)}
module.exports={version:'2.1.2',encode:utf8encode,decode:utf8decode}}),(function(module,exports){(function(){"use strict";var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var lookup=new Uint8Array(256);for(var i=0;i<chars.length;i++){lookup[chars.charCodeAt(i)]=i}
exports.encode=function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i=0;i<len;i+=3){base64+=chars[bytes[i]>>2];base64+=chars[((bytes[i]&3)<<4)|(bytes[i+1]>>4)];base64+=chars[((bytes[i+1]&15)<<2)|(bytes[i+2]>>6)];base64+=chars[bytes[i+2]&63]}
if((len%3)===2){base64=base64.substring(0,base64.length-1)+"="}else if(len%3===1){base64=base64.substring(0,base64.length-2)+"=="}
return base64};exports.decode=function(base64){var bufferLength=base64.length*0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length-1]==="="){bufferLength--;if(base64[base64.length-2]==="="){bufferLength--}}
var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i=0;i<len;i+=4){encoded1=lookup[base64.charCodeAt(i)];encoded2=lookup[base64.charCodeAt(i+1)];encoded3=lookup[base64.charCodeAt(i+2)];encoded4=lookup[base64.charCodeAt(i+3)];bytes[p++]=(encoded1<<2)|(encoded2>>4);bytes[p++]=((encoded2&15)<<4)|(encoded3>>2);bytes[p++]=((encoded3&3)<<6)|(encoded4&63)}
return arraybuffer}})()}),(function(module,exports){var BlobBuilder=typeof BlobBuilder!=='undefined'?BlobBuilder:typeof WebKitBlobBuilder!=='undefined'?WebKitBlobBuilder:typeof MSBlobBuilder!=='undefined'?MSBlobBuilder:typeof MozBlobBuilder!=='undefined'?MozBlobBuilder:!1;var blobSupported=(function(){try{var a=new Blob(['hi']);return a.size===2}catch(e){return!1}})();var blobSupportsArrayBufferView=blobSupported&&(function(){try{var b=new Blob([new Uint8Array([1,2])]);return b.size===2}catch(e){return!1}})();var blobBuilderSupported=BlobBuilder&&BlobBuilder.prototype.append&&BlobBuilder.prototype.getBlob;function mapArrayBufferViews(ary){return ary.map(function(chunk){if(chunk.buffer instanceof ArrayBuffer){var buf=chunk.buffer;if(chunk.byteLength!==buf.byteLength){var copy=new Uint8Array(chunk.byteLength);copy.set(new Uint8Array(buf,chunk.byteOffset,chunk.byteLength));buf=copy.buffer}
return buf}
return chunk})}
function BlobBuilderConstructor(ary,options){options=options||{};var bb=new BlobBuilder();mapArrayBufferViews(ary).forEach(function(part){bb.append(part)});return(options.type)?bb.getBlob(options.type):bb.getBlob()};function BlobConstructor(ary,options){return new Blob(mapArrayBufferViews(ary),options||{})};if(typeof Blob!=='undefined'){BlobBuilderConstructor.prototype=Blob.prototype;BlobConstructor.prototype=Blob.prototype}
module.exports=(function(){if(blobSupported){return blobSupportsArrayBufferView?Blob:BlobConstructor}else if(blobBuilderSupported){return BlobBuilderConstructor}else{return undefined}})()}),(function(module,exports){exports.encode=function(obj){var str='';for(var i in obj){if(obj.hasOwnProperty(i)){if(str.length)str+='&';str+=encodeURIComponent(i)+'='+encodeURIComponent(obj[i])}}
return str};exports.decode=function(qs){var qry={};var pairs=qs.split('&');for(var i=0,l=pairs.length;i<l;i++){var pair=pairs[i].split('=');qry[decodeURIComponent(pair[0])]=decodeURIComponent(pair[1])}
return qry}}),(function(module,exports){module.exports=function(a,b){var fn=function(){};fn.prototype=b.prototype;a.prototype=new fn;a.prototype.constructor=a}}),(function(module,exports){'use strict';var alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),length=64,map={},seed=0,i=0,prev;function encode(num){var encoded='';do{encoded=alphabet[num%length]+encoded;num=Math.floor(num/length)}while(num>0);return encoded}
function decode(str){var decoded=0;for(i=0;i<str.length;i++){decoded=decoded*length+map[str.charAt(i)]}
return decoded}
function yeast(){var now=encode(+new Date());if(now!==prev)return seed=0,prev=now;return now+'.'+encode(seed++)}
for(;i<length;i++)map[alphabet[i]]=i;yeast.encode=encode;yeast.decode=decode;module.exports=yeast}),(function(module,exports,__webpack_require__){(function(global){var Polling=__webpack_require__(19);var inherit=__webpack_require__(30);module.exports=JSONPPolling;var rNewline=/\n/g;var rEscapedNewline=/\\n/g;var callbacks;function empty(){}
function glob(){return typeof self!=='undefined'?self:typeof window!=='undefined'?window:typeof global!=='undefined'?global:{}}
function JSONPPolling(opts){Polling.call(this,opts);this.query=this.query||{};if(!callbacks){var global=glob();callbacks=global.___eio=(global.___eio||[])}
this.index=callbacks.length;var self=this;callbacks.push(function(msg){self.onData(msg)});this.query.j=this.index;if(typeof addEventListener==='function'){addEventListener('beforeunload',function(){if(self.script)self.script.onerror=empty},!1)}}
inherit(JSONPPolling,Polling);JSONPPolling.prototype.supportsBinary=!1;JSONPPolling.prototype.doClose=function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}
if(this.form){this.form.parentNode.removeChild(this.form);this.form=null;this.iframe=null}
Polling.prototype.doClose.call(this)};JSONPPolling.prototype.doPoll=function(){var self=this;var script=document.createElement('script');if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}
script.async=!0;script.src=this.uri();script.onerror=function(e){self.onError('jsonp poll error',e)};var insertAt=document.getElementsByTagName('script')[0];if(insertAt){insertAt.parentNode.insertBefore(script,insertAt)}else{(document.head||document.body).appendChild(script)}
this.script=script;var isUAgecko='undefined'!==typeof navigator&&/gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement('iframe');document.body.appendChild(iframe);document.body.removeChild(iframe)},100)}};JSONPPolling.prototype.doWrite=function(data,fn){var self=this;if(!this.form){var form=document.createElement('form');var area=document.createElement('textarea');var id=this.iframeId='eio_iframe_'+this.index;var iframe;form.className='socketio';form.style.position='absolute';form.style.top='-1000px';form.style.left='-1000px';form.target=id;form.method='POST';form.setAttribute('accept-charset','utf-8');area.name='d';form.appendChild(area);document.body.appendChild(form);this.form=form;this.area=area}
this.form.action=this.uri();function complete(){initIframe();fn()}
function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe)}catch(e){self.onError('jsonp polling iframe removal error',e)}}
try{var html='<iframe src="javascript:0" name="'+self.iframeId+'">';iframe=document.createElement(html)}catch(e){iframe=document.createElement('iframe');iframe.name=self.iframeId;iframe.src='javascript:0'}
iframe.id=self.iframeId;self.form.appendChild(iframe);self.iframe=iframe}
initIframe();data=data.replace(rEscapedNewline,'\\\n');this.area.value=data.replace(rNewline,'\\n');try{this.form.submit()}catch(e){}
if(this.iframe.attachEvent){this.iframe.onreadystatechange=function(){if(self.iframe.readyState==='complete'){complete()}}}else{this.iframe.onload=complete}}}.call(exports,(function(){return this}())))}),(function(module,exports,__webpack_require__){var Transport=__webpack_require__(20);var parser=__webpack_require__(21);var parseqs=__webpack_require__(29);var inherit=__webpack_require__(30);var yeast=__webpack_require__(31);var debug=__webpack_require__(3)('engine.io-client:websocket');var BrowserWebSocket,NodeWebSocket;if(typeof self==='undefined'){try{NodeWebSocket=__webpack_require__(34)}catch(e){}}else{BrowserWebSocket=self.WebSocket||self.MozWebSocket}
var WebSocket=BrowserWebSocket||NodeWebSocket;module.exports=WS;function WS(opts){var forceBase64=(opts&&opts.forceBase64);if(forceBase64){this.supportsBinary=!1}
this.perMessageDeflate=opts.perMessageDeflate;this.usingBrowserWebSocket=BrowserWebSocket&&!opts.forceNode;this.protocols=opts.protocols;if(!this.usingBrowserWebSocket){WebSocket=NodeWebSocket}
Transport.call(this,opts)}
inherit(WS,Transport);WS.prototype.name='websocket';WS.prototype.supportsBinary=!0;WS.prototype.doOpen=function(){if(!this.check()){return}
var uri=this.uri();var protocols=this.protocols;var opts={agent:this.agent,perMessageDeflate:this.perMessageDeflate};opts.pfx=this.pfx;opts.key=this.key;opts.passphrase=this.passphrase;opts.cert=this.cert;opts.ca=this.ca;opts.ciphers=this.ciphers;opts.rejectUnauthorized=this.rejectUnauthorized;if(this.extraHeaders){opts.headers=this.extraHeaders}
if(this.localAddress){opts.localAddress=this.localAddress}
try{this.ws=this.usingBrowserWebSocket&&!this.isReactNative?(protocols?new WebSocket(uri,protocols):new WebSocket(uri)):new WebSocket(uri,protocols,opts)}catch(err){return this.emit('error',err)}
if(this.ws.binaryType===undefined){this.supportsBinary=!1}
if(this.ws.supports&&this.ws.supports.binary){this.supportsBinary=!0;this.ws.binaryType='nodebuffer'}else{this.ws.binaryType='arraybuffer'}
this.addEventListeners()};WS.prototype.addEventListeners=function(){var self=this;this.ws.onopen=function(){self.onOpen()};this.ws.onclose=function(){self.onClose()};this.ws.onmessage=function(ev){self.onData(ev.data)};this.ws.onerror=function(e){self.onError('websocket error',e)}};WS.prototype.write=function(packets){var self=this;this.writable=!1;var total=packets.length;for(var i=0,l=total;i<l;i++){(function(packet){parser.encodePacket(packet,self.supportsBinary,function(data){if(!self.usingBrowserWebSocket){var opts={};if(packet.options){opts.compress=packet.options.compress}
if(self.perMessageDeflate){var len='string'===typeof data?Buffer.byteLength(data):data.length;if(len<self.perMessageDeflate.threshold){opts.compress=!1}}}
try{if(self.usingBrowserWebSocket){self.ws.send(data)}else{self.ws.send(data,opts)}}catch(e){debug('websocket closed before onclose event')}
--total||done()})})(packets[i])}
function done(){self.emit('flush');setTimeout(function(){self.writable=!0;self.emit('drain')},0)}};WS.prototype.onClose=function(){Transport.prototype.onClose.call(this)};WS.prototype.doClose=function(){if(typeof this.ws!=='undefined'){this.ws.close()}};WS.prototype.uri=function(){var query=this.query||{};var schema=this.secure?'wss':'ws';var port='';if(this.port&&(('wss'===schema&&Number(this.port)!==443)||('ws'===schema&&Number(this.port)!==80))){port=':'+this.port}
if(this.timestampRequests){query[this.timestampParam]=yeast()}
if(!this.supportsBinary){query.b64=1}
query=parseqs.encode(query);if(query.length){query='?'+query}
var ipv6=this.hostname.indexOf(':')!==-1;return schema+'://'+(ipv6?'['+this.hostname+']':this.hostname)+port+this.path+query};WS.prototype.check=function(){return!!WebSocket&&!('__initialize' in WebSocket&&this.name===WS.prototype.name)}}),(function(module,exports){}),(function(module,exports){var indexOf=[].indexOf;module.exports=function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i<arr.length;++i){if(arr[i]===obj)return i}
return-1}}),(function(module,exports,__webpack_require__){'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var parser=__webpack_require__(7);var Emitter=__webpack_require__(8);var toArray=__webpack_require__(37);var on=__webpack_require__(38);var bind=__webpack_require__(39);var debug=__webpack_require__(3)('socket.io-client:socket');var parseqs=__webpack_require__(29);var hasBin=__webpack_require__(23);module.exports=exports=Socket;var events={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1};var emit=Emitter.prototype.emit;function Socket(io,nsp,opts){this.io=io;this.nsp=nsp;this.json=this;this.ids=0;this.acks={};this.receiveBuffer=[];this.sendBuffer=[];this.connected=!1;this.disconnected=!0;this.flags={};if(opts&&opts.query){this.query=opts.query}
if(this.io.autoConnect)this.open()}
Emitter(Socket.prototype);Socket.prototype.subEvents=function(){if(this.subs)return;var io=this.io;this.subs=[on(io,'open',bind(this,'onopen')),on(io,'packet',bind(this,'onpacket')),on(io,'close',bind(this,'onclose'))]};Socket.prototype.open=Socket.prototype.connect=function(){if(this.connected)return this;this.subEvents();this.io.open();if('open'===this.io.readyState)this.onopen();this.emit('connecting');return this};Socket.prototype.send=function(){var args=toArray(arguments);args.unshift('message');this.emit.apply(this,args);return this};Socket.prototype.emit=function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this}
var args=toArray(arguments);var packet={type:(this.flags.binary!==undefined?this.flags.binary:hasBin(args))?parser.BINARY_EVENT:parser.EVENT,data:args};packet.options={};packet.options.compress=!this.flags||!1!==this.flags.compress;if('function'===typeof args[args.length-1]){debug('emitting packet with ack id %d',this.ids);this.acks[this.ids]=args.pop();packet.id=this.ids++}
if(this.connected){this.packet(packet)}else{this.sendBuffer.push(packet)}
this.flags={};return this};Socket.prototype.packet=function(packet){packet.nsp=this.nsp;this.io.packet(packet)};Socket.prototype.onopen=function(){debug('transport is open - connecting');if('/'!==this.nsp){if(this.query){var query=_typeof(this.query)==='object'?parseqs.encode(this.query):this.query;debug('sending connect packet with query %s',query);this.packet({type:parser.CONNECT,query:query})}else{this.packet({type:parser.CONNECT})}}};Socket.prototype.onclose=function(reason){debug('close (%s)',reason);this.connected=!1;this.disconnected=!0;delete this.id;this.emit('disconnect',reason)};Socket.prototype.onpacket=function(packet){var sameNamespace=packet.nsp===this.nsp;var rootNamespaceError=packet.type===parser.ERROR&&packet.nsp==='/';if(!sameNamespace&&!rootNamespaceError)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit('error',packet.data);break}};Socket.prototype.onevent=function(packet){var args=packet.data||[];debug('emitting event %j',args);if(null!=packet.id){debug('attaching ack callback to event');args.push(this.ack(packet.id))}
if(this.connected){emit.apply(this,args)}else{this.receiveBuffer.push(args)}};Socket.prototype.ack=function(id){var self=this;var sent=!1;return function(){if(sent)return;sent=!0;var args=toArray(arguments);debug('sending ack %j',args);self.packet({type:hasBin(args)?parser.BINARY_ACK:parser.ACK,id:id,data:args})}};Socket.prototype.onack=function(packet){var ack=this.acks[packet.id];if('function'===typeof ack){debug('calling ack %s with %j',packet.id,packet.data);ack.apply(this,packet.data);delete this.acks[packet.id]}else{debug('bad ack %s',packet.id)}};Socket.prototype.onconnect=function(){this.connected=!0;this.disconnected=!1;this.emit('connect');this.emitBuffered()};Socket.prototype.emitBuffered=function(){var i;for(i=0;i<this.receiveBuffer.length;i++){emit.apply(this,this.receiveBuffer[i])}
this.receiveBuffer=[];for(i=0;i<this.sendBuffer.length;i++){this.packet(this.sendBuffer[i])}
this.sendBuffer=[]};Socket.prototype.ondisconnect=function(){debug('server disconnect (%s)',this.nsp);this.destroy();this.onclose('io server disconnect')};Socket.prototype.destroy=function(){if(this.subs){for(var i=0;i<this.subs.length;i++){this.subs[i].destroy()}
this.subs=null}
this.io.destroy(this)};Socket.prototype.close=Socket.prototype.disconnect=function(){if(this.connected){debug('performing disconnect (%s)',this.nsp);this.packet({type:parser.DISCONNECT})}
this.destroy();if(this.connected){this.onclose('io client disconnect')}
return this};Socket.prototype.compress=function(compress){this.flags.compress=compress;return this};Socket.prototype.binary=function(binary){this.flags.binary=binary;return this}}),(function(module,exports){module.exports=toArray
function toArray(list,index){var array=[]
index=index||0
for(var i=index||0;i<list.length;i++){array[i-index]=list[i]}
return array}}),(function(module,exports){"use strict";module.exports=on;function on(obj,ev,fn){obj.on(ev,fn);return{destroy:function destroy(){obj.removeListener(ev,fn)}}}}),(function(module,exports){var slice=[].slice;module.exports=function(obj,fn){if('string'==typeof fn)fn=obj[fn];if('function'!=typeof fn)throw new Error('bind() requires a function');var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)))}}}),(function(module,exports){module.exports=Backoff;function Backoff(opts){opts=opts||{};this.ms=opts.min||100;this.max=opts.max||10000;this.factor=opts.factor||2;this.jitter=opts.jitter>0&&opts.jitter<=1?opts.jitter:0;this.attempts=0}
Backoff.prototype.duration=function(){var ms=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand*this.jitter*ms);ms=(Math.floor(rand*10)&1)==0?ms-deviation:ms+deviation}
return Math.min(ms,this.max)|0};Backoff.prototype.reset=function(){this.attempts=0};Backoff.prototype.setMin=function(min){this.ms=min};Backoff.prototype.setMax=function(max){this.max=max};Backoff.prototype.setJitter=function(jitter){this.jitter=jitter}})])})
// Console.Re Client Script ver: 0.5.1
if (!window.console) window.console = {};
(function(root, console) {
	'use strict';

	var chost = 'console.re',
		cport,
		name = 'toServerRe',
		channel;
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, fromIndex) {
			if (fromIndex == null) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, this.length + fromIndex);
			}
			for (var i = fromIndex, j = this.length; i < j; i++) {
				if (this[i] === obj) return i;
			}
			return -1;
		};
	}
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fn, scope) {
			var i, len;
			for (i = 0, len = this.length; i < len; ++i) {
				if (i in this) {
					fn.call(scope, this[i], i, this);
				}
			}
		};
	}
	var isArray =
		Array.isArray ||
		function(a) {
			return Object.prototype.toString.call(a) === '[object Array]';
		};
	if (!window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.host;
	if (window.consolere === undefined || window.consolere.channel === 'YOUR-CHANNEL-NAME') {
		channel =
			(document.getElementById('consolerescript') &&
				document.getElementById('consolerescript').getAttribute('data-channel')) ||
			'';
	} else {
		channel = window.consolere.channel || '';
	}

	if (!channel) {
		channel = 'public';
	}

	function askChannel(t) {
		t = t || '';
		var c = prompt(t + 'Enter Channel to using on Console.Re/Your-Channel-Name', 'Your-Channel-Name');
		if (c && c !== null && c !== 'Your-Channel-Name') {
			return c;
		} else {
			askChannel('Please ');
		}
	}

	function getCaller(d) {
		d = d || 7;
		var t = printStackTrace(),
			c = t[d],
			p;
		if (c !== undefined) {
			p = c.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)?$/);
			if (p === null) p = c.match(/^.*([\/<][^\/>]*>?):(\d*)?$/);
		} else {
			// IE 7-9
			p[1] = '';
			p[2] = '0';
			p[3] = '0';
		}
		return {
			file: p ? p[1] : '',
			line: p ? p[2] : '0',
			col: p ? p[3] : '0'
		};
	}

	function getWindowSize() {
		var w = document.width || window.outerWidth || document.documentElement.clientWidth,
			h = document.height || window.outerHeight || document.documentElement.clientHeight;
		return 'Window Size: [number]' + w + 'px[/number] by [number]' + h + 'px[/number]';
	}

	function getOtherTypes(t) {
		var e,
			o = '';
		try {
			e = eval(t);
			if (e === true) {
				o = '[booltrue]true[/booltrue]';
			} else if (e === false) {
				o = '[boolfalse]false[/boolfalse]';
			} else if (!isNaN(parseFloat(e)) && isFinite(e)) {
				o = '[number]' + e + '[/number]';
			} else if (typeof e === 'number') {
				o = '[number][Number][/number]';
			} else if (typeof e === 'string') {
				o = '"String"';
			} else if (typeof e === 'function') {
				o = '[Function]';
			} else if (e.nodeType) {
				o = '<' + e.nodeName + ' Element>';
			} else if (typeof e === 'object') {
				o = '{Object}';
				if (isArray(e)) o = '[Array]';
			} else {
				o = '[color=red]undefined[/color]';
			}
		} catch (err) {
			o = '[color=red]' + err + '[/color]';
		}
		return o;
	}

	function getType(t) {
		var o = '';
		if (typeof t !== 'string') return getOtherTypes(t);
		try {
			var obj = JSON.parse(t);
			if (typeof obj === 'object') {
				o = '{Object}';
				if (isArray(obj)) o = '[Array]';
			} else {
				o = getOtherTypes(t);
			}
		} catch (err) {
			o = getOtherTypes(t);
		}
		return o;
	}

	function replaceWithNum(s) {
		var st = '' + s;
		return st.replace(/([0-9]+)(px|em||)/g, '[number]$1$2[/number]');
	}

	function getSize(targetElement) {
		var w, h;
		if (targetElement) {
			w = getStyle(targetElement, 'width');
			h = getStyle(targetElement, 'height');
			return '[number]' + w + '[/number]' + ' by ' + '[number]' + h + '[/number]';
		}
		return '';
	}

	function getStyle(targetElement, styleProp) {
		if (targetElement) {
			if (targetElement.currentStyle) return targetElement.currentStyle[styleProp];
			else if (window.getComputedStyle)
				return document.defaultView.getComputedStyle(targetElement, null).getPropertyValue(styleProp);
		}
	}

	function stringify(obj, cmd, prop) {
		if (typeof obj === 'undefined') return '___undefined___';
		if (typeof obj !== 'object') return obj;
		var cache = [],
			k_map = [],
			t_array,
			i,
			d_node = {},
			nid = '',
			nclass = '',
			ps,
			s = JSON.stringify(obj, function(k, v) {
				if (typeof v === 'undefined') {
					return '___undefined___';
				}
				if (!v) return v;
				if (v.nodeType) {
					if (v.id) nid = v.id;
					if (v.className) nclass = v.className;
					if (cmd === 'size') {
						return '[tag]<' + v.nodeName + '>[/tag] ' + getSize(v);
					} else if (cmd === 'css') {
						if (isArray(prop)) {
							prop.forEach(function(p) {
								d_node[p] = replaceWithNum(getStyle(v, p));
							});
							return d_node;
						} else if (prop) {
							ps = ' ' + prop + ':' + getStyle(v, prop) + ';';
							if (nid) nid = " [attr]id=[/attr][string]'" + nid + "'[/string]";
							if (nclass) nclass = " [attr]class=[/attr][string]'" + nclass + "'[/string]";
							return '[tag]<' + v.nodeName + '' + nid + '' + nclass + '>[/tag]' + replaceWithNum(ps);
						}
					} else {
						d_node.element = v.nodeName;
						if (nid) d_node.id = nid;
						if (nclass) d_node['class'] = nclass;
						d_node.visible = VISIBILITY.isVisible(v);
						d_node.size = getSize(v);
						d_node.html = v.outerHTML;
					}
					return d_node;
				}
				if (v.window && v.window == v.window.window) return '{Window Object}';
				if (typeof v === 'function') return '[Function]';
				if (typeof v === 'object' && v !== null) {
					if (v.length && (t_array = Array.prototype.slice.call(v)).length === v.length) v = t_array;
					i = cache.indexOf(v);
					if (i !== -1) {
						return '[ Circular {' + (k_map[i] || 'root') + '} ]';
					}
					cache.push(v);
					k_map.push(k);
				}
				return v;
			});
		return s;
	}
	root[name] = (function() {
		var socket,
			caller = [],
			cache = [],
			gcount = [],
			gtimer = [],
			or_change = false,
			api = {
				client: true,
				server: true,
				loaded: false
			},
			levels = [
				'trace',
				'debug',
				'info',
				'log',
				'warn',
				'error',
				'size',
				'test',
				'assert',
				'count',
				'css',
				'media',
				'time',
				'time',
				'command'
			];

		function emit(level, args, cmd, cal) {
			caller = cal || getCaller();
			if ((!args.length || levels.indexOf(level) === -1) && level !== 'command') return;
			if (api.client) logConsole.apply(null, arguments);
			if (api.server) logIo.apply(null, arguments);
			if (!socket) return api.connect();
		}

		function logConsole(level, args) {
			level = level === 'trace' ? 'debug' : level;
			if (console.log) {
				var a = args.toString().replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2');
				Function.prototype.apply.call(console.log, console, ['console.re [' + level + ']'].concat(a));
			}
		}

		function logIo(level, args, cmd) {
			var data,
				counter,
				timer,
				t_end,
				last,
				command = '';
			cmd = cmd || '';
			if (typeof args === 'object' && !args.length) data = args;
			else {
				if (level == 'command') command = cmd;
				data = {
					command: command,
					channel: channel,
					browser: browser,
					level: level,
					args: args,
					caller: caller
				};
			}
			if (cmd === 'css') {
				last = args[args.length - 1];
				if (isArray(last) || 'string' === typeof last) args.pop();
				else cmd = '';
			} else if (cmd === 'count') {
				counter = args.toString();
				if (isNaN(gcount[counter])) {
					gcount[counter] = 1;
				} else {
					gcount[counter]++;
				}
				args.push(gcount[counter]);
			} else if (cmd === 'time') {
				timer = args.toString();
				gtimer[timer] = new Date().getTime();
				args.push('[white]started[/white]');
			} else if (cmd === 'timeEnd') {
				timer = args.toString();
				t_end = new Date().getTime() - gtimer[timer];
				if (!isNaN(t_end)) {
					args.push('[white]ends[/white] in [number]' + t_end + '[/number] ms');
				} else {
					args.push('[white]not started[/white]');
				}
			}

			for (var i = 0; i < args.length; i++) {
				args[i] = stringify(args[i], cmd, last);
			}
			if (socket) {
				if (cache.length) {
					sendCached(cache);
				}
				socket.emit(name, data);
			} else {
				cache.push([level, data]);
			}
		}

		for (var i = 0, l; i < levels.length; i++) {
			l = levels[i];
			api[l] = logLevel(l);
		}

		function logLevel(level) {
			return function() {
				api._dispatch(level, [].slice.call(arguments));
				return this;
			};
		}

		function onConnect() {
			if (socket) {
				socket.emit('channel', channel);
			}
			sendCached(cache);
		}

		function sendCached(c) {
			var ced = null;
			while ((ced = c.shift())) {
				logIo.apply(null, ced);
			}
		}

		api.disconnect = function() {
			socket.disconnect();
		};

		api.connect = function(redux) {
			if (consolereio) {
				socket = consolereio(chost + (typeof cport !== 'undefined' ? ':' + cport : ''));
				socket.on('connect', onConnect);
			} else if (!redux) {
				api.connect(true);
			}
		};

		api.size = function(s) {
			if (!s || typeof s === 'undefined' || s == 'window') {
				api._dispatch('size', [getWindowSize()]);
			} else {
				api._dispatch('size', [].slice.call(arguments), 'size');
			}
			return this;
		};

		api.count = function() {
			api._dispatch('count', [].slice.call(arguments), 'count');
			return this;
		};

		api.time = function() {
			api._dispatch('time', [].slice.call(arguments), 'time');
			return this;
		};

		api.timeEnd = function() {
			api._dispatch('time', [].slice.call(arguments), 'timeEnd');
			return this;
		};

		api.trace = function() {
			var t = printStackTrace(),
				out = [],
				a = [].slice.call(arguments);
			for (i = 0; t.length > i; i++) {
				if (!/console.re.js/gi.test(t[i])) out.push(t[i]);
			}
			api._dispatch('trace', [a.toString(), out]);
			return this;
		};

		api.css = function() {
			api._dispatch('css', [].slice.call(arguments), 'css');
			return this;
		};

		api.test = function() {
			var a = [].slice.call(arguments),
				type = '',
				out = [];
			a.forEach(function(t) {
				type = getType(t);
				if (/|[Function]|{Object}|[Array]|Element|/gi.test(type)) {
					type = '[color=#BBB519]' + type + '[/color]';
				}
				out.push('[color=#BC9044]' + t + '[/color]' + '[color=gray] is [/color]' + type);
			});
			api._dispatch('test', out);
			return this;
		};

		api.assert = function() {
			var a = [].slice.call(arguments),
				out = [];
			a.forEach(function(t, i) {
				if (typeof t !== 'string') {
					if (!t) {
						if (typeof a[i + 1] === 'string') {
							out.push('[color=red]' + a[i + 1] + '[/color]');
						} else {
							out.push('[color=red]Assertion Failure[/color]');
						}
					}
				}
			});
			if (out.length) api._dispatch('assert', out);
			return this;
		};

		api._dispatch = function(level, args, cmd, cal) {
			emit(level, args, cmd, cal);
		};

		api.media = function(a, cal) {
			var mq_list = [],
				out = [],
				m = [],
				s_type = false,
				s_query = true,
				o_t = 'landscape',
				o_r = window.orientation || 0,
				timer_cal;
			if (a === 'type') {
				s_type = true;
				s_query = false;
			} else if (a === 'all-types' || a === 'all') {
				s_query = s_type = true;
			}
			if (a === 'watch') {
				var _timerVar;
				timer_cal = getCaller(5);
				if (window.addEventListener) {
					window.addEventListener(
						'resize',
						function() {
							watchMediaQuery(timer_cal);
						},
						false
					);
					window.addEventListener(
						'orientationchange',
						function() {
							if (o_r !== window.orientation) or_change = true;
							watchMediaQuery(timer_cal);
						},
						false
					);
				}
			}
			createMQList();
			m = mqChange();
			if (m.length) {
				if (m.length == 1) out.push(mqChange()[0]);
				else out.push(mqChange());
			} else {
				out.push('[yellow]No Media Query Rules[/yellow]');
			}
			if (a === 'w') {
				out.push(getWindowSize());
				if (or_change) {
					if (Math.abs(window.orientation) !== 90) o_t = 'portrait';
					out.push('Orientation: [yellow]' + o_t + '[/yellow]');
				}
				api._dispatch('media', out, '', cal);
			} else {
				api._dispatch('media', out);
			}
			return this;

			function watchMediaQuery(t) {
				if (window.matchMedia) {
					clearTimeout(_timerVar);
					_timerVar = setTimeout(function() {
						api.media('w', t);
					}, 500);
				}
			}

			function inList(media) {
				for (var i = mq_list.length - 1; i >= 0; i--) {
					if (mq_list[i].media === media) {
						return true;
					}
				}
				return false;
			}

			function createMQList() {
				var mq = getMediaQueries(),
					i;
				if (s_query) {
					for (i = mq.length - 1; i >= 0; i--) {
						if (!inList(mq[i])) {
							mq_list.push(window.matchMedia(mq[i]));
						}
					}
				}
				if (s_type) {
					var links = document.getElementsByTagName('link');
					for (i = links.length - 1; i >= 0; i--) {
						if (links[i].media) {
							mq_list.push(window.matchMedia(links[i].media));
						}
					}
				}
			}

			function getMediaQueries() {
				var s = document.styleSheets,
					r,
					i,
					j,
					mq = [];
				for (i = s.length - 1; i >= 0; i--) {
					try {
						r = s[i].cssRules;
						if (r) {
							for (j = 0; j < r.length; j++) {
								if (r[j].type == CSSRule.MEDIA_RULE) {
									mq.push(r[j].media.mediaText);
								}
							}
						}
					} catch (e) {}
				}
				return mq;
			}

			function mqChange() {
				var q = [];
				for (var i in mq_list) {
					if (mq_list[i].matches) {
						q.push(replaceWithNum(mq_list[i].media));
					}
				}
				return q;
			}
		};

		api.clear = function() {
			api._dispatch('command', '', 'clear');
			return this;
		};

		return api;
	})();
	console.re = root[name];
	var BrowserDetect = {
		searchString: function(data) {
			for (var i = 0; i < data.length; i++) {
				var d_string = data[i].str;
				var d_prop = data[i].prop;
				this.versionSearchString = data[i].vsearch || data[i].name;
				if (d_string) {
					if (d_string.indexOf(data[i].substr) != -1) return data[i].name;
				} else if (d_prop) return data[i].name;
			}
		},
		searchVersion: function(dString) {
			var i = dString.indexOf(this.versionSearchString);
			if (i == -1) return;
			return parseFloat(dString.substr(i + this.versionSearchString.length + 1));
		},
		dataBrowser: [
			{
				str: navigator.userAgent,
				substr: 'OPR',
				vsearch: 'OPR',
				name: {
					f: 'Opera',
					s: 'OP'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Chrome',
				vsearch: 'Chrome',
				name: {
					f: 'Chrome',
					s: 'CR'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'OmniWeb',
				vsearch: 'OmniWeb',
				name: {
					f: 'OmniWeb',
					s: 'OW'
				}
			},
			{
				str: navigator.vendor,
				substr: 'Apple',
				name: {
					f: 'Safari',
					s: 'SF'
				},
				vsearch: 'Version'
			},
			{
				prop: window.opera,
				name: {
					f: 'Opera',
					s: 'OP'
				},
				vsearch: 'Version'
			},
			{
				str: navigator.vendor,
				substr: 'iCab',
				name: {
					f: 'iCab',
					s: 'iC'
				}
			},
			{
				str: navigator.vendor,
				substr: 'KDE',
				name: {
					f: 'Konqueror',
					s: 'KDE'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Firefox',
				name: {
					f: 'Firefox',
					s: 'FF'
				},
				vsearch: 'Firefox'
			},
			{
				str: navigator.vendor,
				substr: 'Camino',
				name: {
					f: 'Camino',
					s: 'CM'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'Netscape',
				name: {
					f: 'Netscape',
					s: 'NS'
				}
			},
			{
				str: navigator.userAgent,
				substr: 'MSIE',
				name: {
					f: 'Explorer',
					s: 'IE'
				},
				vsearch: 'MSIE'
			},
			{
				str: navigator.userAgent,
				substr: 'Trident',
				name: {
					f: 'Explorer',
					s: 'IE'
				},
				vsearch: 'rv'
			},
			{
				str: navigator.userAgent,
				substr: 'Mozilla',
				name: {
					f: 'Netscape',
					s: 'NS'
				},
				vsearch: 'Mozilla'
			}
		],
		dataOS: [
			{
				str: navigator.platform,
				substr: 'Win',
				name: 'Win'
			},
			{
				str: navigator.platform,
				substr: 'Mac',
				name: 'Mac'
			},
			{
				str: navigator.userAgent,
				substr: 'iPhone',
				name: 'iOS'
			},
			{
				str: navigator.userAgent,
				substr: 'iPad',
				name: 'iOS'
			},
			{
				str: navigator.userAgent,
				substr: 'Android',
				name: 'Android'
			},
			{
				str: navigator.platform,
				substr: 'Linux',
				name: 'Linux'
			}
		],
		init: function() {
			return {
				browser: this.searchString(this.dataBrowser) || 'An unknown browser',
				version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '',
				OS: this.searchString(this.dataOS) || 'an unknown OS'
			};
		}
	};
	var browser = BrowserDetect.init();

	function handleError(msg, url, num) {
		if (!url && msg.indexOf('Script error') === 0 && num === 0) return;
		var r = new RegExp(window.location.origin, 'g');
		url = url.replace(r, '');
		console.re.error('[color=red]' + msg + '[/color] in [i]' + url + '[/i] Line: [b]' + num + '[/b]');
		/* return true; */
	}
	window.onerror = handleError;
	window.ConsoleRe = true;
	window.console.re.settings = function(opt) {
		chost = opt.host || 'console.re';
		channel = opt.channel;

		var cprotocol = opt.port === '443' ? 'https://' : 'http://';

		if (opt.port !== '' && typeof opt.port !== 'undefined' && opt.port !== 80 && cprotocol !== 'https://') {
			cport = ':' + opt.port;
		}
	};
})(this, window.console);

window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),n=document.getElementsByTagName("script")[0],r=null;t.type="text/css";t.id="matchmediajs-test";n.parentNode.insertBefore(t,n);r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var n="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=n}else{t.textContent=n}return r.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());

var VISIBILITY=function(){function e(r,i,s,o,u,a,f){var l=r.parentNode,c=2;if(!n(r)){return false}if(9===l.nodeType){return true}if("0"===t(r,"opacity")||"none"===t(r,"display")||"hidden"===t(r,"visibility")){return false}if("undefined"===typeof i||"undefined"===typeof s||"undefined"===typeof o||"undefined"===typeof u||"undefined"===typeof a||"undefined"===typeof f){i=r.offsetTop;u=r.offsetLeft;o=i+r.offsetHeight;s=u+r.offsetWidth;a=r.offsetWidth;f=r.offsetHeight}if(l){if("hidden"===t(l,"overflow")||"scroll"===t(l,"overflow")){if(u+c>l.offsetWidth+l.scrollLeft||u+a-c<l.scrollLeft||i+c>l.offsetHeight+l.scrollTop||i+f-c<l.scrollTop){return false}}if(r.offsetParent===l){u+=l.offsetLeft;i+=l.offsetTop}return e(l,i,s,o,u,a,f)}return true}function t(e,t){if(window.getComputedStyle){return document.defaultView.getComputedStyle(e,null)[t]}if(e.currentStyle){return e.currentStyle[t]}}function n(e){while(e=e.parentNode){if(e==document){return true}}return false}return{getStyle:t,isVisible:e}}();

var printStackTrace=function(options){options=options||{guess:!0};var ex=options.e||null,guess=!!options.guess,mode=options.mode||null;var p=new printStackTrace.implementation(),result=p.run(ex,mode);return(guess)?p.guessAnonymousFunctions(result):result}
printStackTrace.implementation=function(){};printStackTrace.implementation.prototype={run:function(ex,mode){ex=ex||this.createException();mode=mode||this.mode(ex);if(mode==='other'){return this.other(arguments.callee)}else{return this[mode](ex)}},createException:function(){try{this.undef()}catch(e){return e}},mode:function(e){if(typeof window!=='undefined'&&window.navigator.userAgent.indexOf('PhantomJS')>-1){return'phantomjs'}
if(e['arguments']&&e.stack){return'chrome'}
if(e.stack&&e.sourceURL){return'safari'}
if(e.stack&&e.number){return'ie'}
if(e.stack&&e.fileName){return'firefox'}
if(e.message&&e['opera#sourceloc']){if(!e.stacktrace){return'opera9'}
if(e.message.indexOf('\n')>-1&&e.message.split('\n').length>e.stacktrace.split('\n').length){return'opera9'}
return'opera10a'}
if(e.message&&e.stack&&e.stacktrace){if(e.stacktrace.indexOf("called from line")<0){return'opera10b'}
return'opera11'}
if(e.stack&&!e.fileName){return'chrome'}
return'other'},instrumentFunction:function(context,functionName,callback){context=context||window;var original=context[functionName];context[functionName]=function instrumented(){callback.call(this,printStackTrace().slice(4));return context[functionName]._instrumented.apply(this,arguments)};context[functionName]._instrumented=original},deinstrumentFunction:function(context,functionName){if(context[functionName].constructor===Function&&context[functionName]._instrumented&&context[functionName]._instrumented.constructor===Function){context[functionName]=context[functionName]._instrumented}},chrome:function(e){return(e.stack+'\n').replace(/^[\s\S]+?\s+at\s+/,' at ').replace(/^\s+(at eval )?at\s+/gm,'').replace(/^([^\(]+?)([\n$])/gm,'{anonymous}() ($1)$2').replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,'{anonymous}() ($1)').replace(/^(.+) \((.+)\)$/gm,'$1@$2').split('\n').slice(0,-1)},safari:function(e){return e.stack.replace(/\[native code\]\n/m,'').replace(/^(?=\w+Error\:).*$\n/m,'').replace(/^@/gm,'{anonymous}()@').split('\n')},ie:function(e){return e.stack.replace(/^\s*at\s+(.*)$/gm,'$1').replace(/^Anonymous function\s+/gm,'{anonymous}() ').replace(/^(.+)\s+\((.+)\)$/gm,'$1@$2').split('\n').slice(1)},firefox:function(e){return e.stack.replace(/(?:\n@:0)?\s+$/m,'').replace(/^(?:\((\S*)\))?@/gm,'{anonymous}($1)@').split('\n')},opera11:function(e){var ANON='{anonymous}',lineRE=/^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;var lines=e.stacktrace.split('\n'),result=[];for(var i=0,len=lines.length;i<len;i+=2){var match=lineRE.exec(lines[i]);if(match){var location=match[4]+':'+match[1]+':'+match[2];var fnName=match[3]||"global code";fnName=fnName.replace(/<anonymous function: (\S+)>/,"$1").replace(/<anonymous function>/,ANON);result.push(fnName+'@'+location+' -- '+lines[i+1].replace(/^\s+/,''))}}
return result},opera10b:function(e){var lineRE=/^(.*)@(.+):(\d+)$/;var lines=e.stacktrace.split('\n'),result=[];for(var i=0,len=lines.length;i<len;i++){var match=lineRE.exec(lines[i]);if(match){var fnName=match[1]?(match[1]+'()'):"global code";result.push(fnName+'@'+match[2]+':'+match[3])}}
return result},opera10a:function(e){var ANON='{anonymous}',lineRE=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;var lines=e.stacktrace.split('\n'),result=[];for(var i=0,len=lines.length;i<len;i+=2){var match=lineRE.exec(lines[i]);if(match){var fnName=match[3]||ANON;result.push(fnName+'()@'+match[2]+':'+match[1]+' -- '+lines[i+1].replace(/^\s+/,''))}}
return result},opera9:function(e){var ANON='{anonymous}',lineRE=/Line (\d+).*script (?:in )?(\S+)/i;var lines=e.message.split('\n'),result=[];for(var i=2,len=lines.length;i<len;i+=2){var match=lineRE.exec(lines[i]);if(match){result.push(ANON+'()@'+match[2]+':'+match[1]+' -- '+lines[i+1].replace(/^\s+/,''))}}
return result},phantomjs:function(e){var ANON='{anonymous}',lineRE=/(\S+) \((\S+)\)/i;var lines=e.stack.split('\n'),result=[];for(var i=1,len=lines.length;i<len;i++){lines[i]=lines[i].replace(/^\s+at\s+/gm,'');var match=lineRE.exec(lines[i]);if(match){result.push(match[1]+'()@'+match[2])}
else{result.push(ANON+'()@'+lines[i])}}
return result},other:function(curr){var ANON='{anonymous}',fnRE=/function(?:\s+([\w$]+))?\s*\(/,stack=[],fn,args,maxStackSize=10;var slice=Array.prototype.slice;while(curr&&stack.length<maxStackSize){fn=fnRE.test(curr.toString())?RegExp.$1||ANON:ANON;try{args=slice.call(curr['arguments']||[])}catch(e){args=['Cannot access arguments: '+e]}
stack[stack.length]=fn+'('+this.stringifyArguments(args)+')';try{curr=curr.caller}catch(e){stack[stack.length]='Cannot access caller: '+e;break}}
return stack},stringifyArguments:function(args){var result=[];var slice=Array.prototype.slice;for(var i=0;i<args.length;++i){var arg=args[i];if(arg===undefined){result[i]='undefined'}else if(arg===null){result[i]='null'}else if(arg.constructor){if(arg.constructor===Array){if(arg.length<3){result[i]='['+this.stringifyArguments(arg)+']'}else{result[i]='['+this.stringifyArguments(slice.call(arg,0,1))+'...'+this.stringifyArguments(slice.call(arg,-1))+']'}}else if(arg.constructor===Object){result[i]='#object'}else if(arg.constructor===Function){result[i]='#function'}else if(arg.constructor===String){result[i]='"'+arg+'"'}else if(arg.constructor===Number){result[i]=arg}else{result[i]='?'}}}
return result.join(',')},sourceCache:{},ajax:function(url){var req=this.createXMLHTTPObject();if(req){try{req.open('GET',url,!1);req.send(null);return req.responseText}catch(e){}}
return''},createXMLHTTPObject:function(){var xmlhttp,XMLHttpFactories=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject('Msxml2.XMLHTTP')},function(){return new ActiveXObject('Msxml3.XMLHTTP')},function(){return new ActiveXObject('Microsoft.XMLHTTP')}];for(var i=0;i<XMLHttpFactories.length;i++){try{xmlhttp=XMLHttpFactories[i]();this.createXMLHTTPObject=XMLHttpFactories[i];return xmlhttp}catch(e){}}},isSameDomain:function(url){return typeof location!=="undefined"&&url.indexOf(location.hostname)!==-1},getSource:function(url){if(!(url in this.sourceCache)){this.sourceCache[url]=this.ajax(url).split('\n')}
return this.sourceCache[url]},guessAnonymousFunctions:function(stack){for(var i=0;i<stack.length;++i){var reStack=/\{anonymous\}\(.*\)@(.*)/,reRef=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,frame=stack[i],ref=reStack.exec(frame);if(ref){var m=reRef.exec(ref[1]);if(m){var file=m[1],lineno=m[2],charno=m[3]||0;if(file&&this.isSameDomain(file)&&lineno){var functionName=this.guessAnonymousFunction(file,lineno,charno);stack[i]=frame.replace('{anonymous}',functionName)}}}}
return stack},guessAnonymousFunction:function(url,lineNo,charNo){var ret;try{ret=this.findFunctionName(this.getSource(url),lineNo)}catch(e){ret='getSource failed with url: '+url+', exception: '+e.toString()}
return ret},findFunctionName:function(source,lineNo){var reFunctionDeclaration=/function\s+([^(]*?)\s*\(([^)]*)\)/;var reFunctionExpression=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;var reFunctionEvaluation=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;var code="",line,maxLines=Math.min(lineNo,20),m,commentPos;for(var i=0;i<maxLines;++i){line=source[lineNo-i-1];commentPos=line.indexOf('//');if(commentPos>=0){line=line.substr(0,commentPos)}
if(line){code=line+code;m=reFunctionExpression.exec(code);if(m&&m[1]){return m[1]}
m=reFunctionDeclaration.exec(code);if(m&&m[1]){return m[1]}
m=reFunctionEvaluation.exec(code);if(m&&m[1]){return m[1]}}}
return'(?)'}}