(function () {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive    = _toPrimitive;
var dP$1             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP$1(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP         = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var global$1    = _global;
var core      = _core;
var ctx       = _ctx;
var hide      = _hide;
var PROTOTYPE = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , IS_WRAP   = type & $export$1.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export$1.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject$1 = _iobject;
var defined = _defined;
var _toIobject = function(it){
  return IObject$1(defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var toInteger = _toInteger;
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$1 = _toInteger;
var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$1(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$1 = _toIobject;
var toLength  = _toLength;
var toIndex   = _toIndex;
var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject$1($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store  = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var uid    = _uid;
var _sharedKey = function(key){
  return shared[key] || (shared[key] = uid(key));
};

var has          = _has;
var toIObject    = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _objectKeysInternal;
var enumBugKeys = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)
var defined$1 = _defined;
var _toObject = function(it){
  return Object(defined$1(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _objectKeys;
var gOPS     = _objectGops;
var pIE      = _objectPie;
var toObject = _toObject;
var IObject  = _iobject;
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)
var $export = _export;

$export($export.S + $export.F, 'Object', {assign: _objectAssign});

var assign$2 = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign$2, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

var dP$2       = _objectDp;
var anObject$1 = _anObject;
var getKeys$1  = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  anObject$1(O);
  var keys   = getKeys$1(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP$2.f(O, P = keys[i++], Properties[P]);
  return O;
};

var $export$2 = _export;
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export$2($export$2.S + $export$2.F * !_descriptors, 'Object', {defineProperties: _objectDps});

var $Object = _core.Object;
var defineProperties$2 = function defineProperties$2(T, D){
  return $Object.defineProperties(T, D);
};

var defineProperties$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperties$2, __esModule: true };
});

var _Object$defineProperties = unwrapExports(defineProperties$1);

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var $export$3 = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$3($export$3.S + $export$3.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object$1 = _core.Object;
var defineProperty$3 = function defineProperty$3(it, key, desc){
  return $Object$1.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = defineProperty$1;

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var content = "<div class=\"info_bplayer\">\n\t<div class=\"titlewrap_bplayer\">\n\t\t<span class=\"title_bplayer\">Unknown Title</span>\n\t\t<span class=\"author_bplayer\">Unknown Artist</span>\n\t</div>\n\t<div class=\"time_bplayer\">\n\t\t<span class=\"current_bplayer\">00:00</span>\n\t\t<span class=\"total_bplayer\">00:00</span>\n\t</div>\n\t<div class=\"buttons_bplayer\">\n\t\t<div class=\"disabled_bplayer btn_bplayer\" id=\"loopBtn_bplayer\">\n\t\t\t<i class=\"iconfont_bplayer\">&#xe600;</i>\n\t\t</div>\n\t\t<div class=\"volume_bplayer\">\n\t\t\t<div class=\"volumebtn_bplayer btn_bplayer\" id=\"volumeBtn_bplayer\">\n\t\t\t\t<i class=\"iconfont_bplayer\">&#xe602;</i>\n\t\t\t</div>\n\t\t\t<div class=\"volumebar_bplayer\">\n\t\t\t\t<div class=\"volumebg_bplayer\"></div>\n\t\t\t\t<div class=\"volumeval_bplayer\"></div>\n\t\t\t\t<div class=\"volumectl_bplayer\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"cover_bplayer\">\n\t<div class=\"coverimg_bplayer\"></div>\n\t<div class=\"controlbtn_bplayer playBtn_bplayer\" id=\"playBtn_bplayer\">\n\t\t<i class=\"iconfont_bplayer\">&#xe601;</i>\n\t</div>\n\t<div class=\"controlbtn_bplayer hidden_bplayer\" id=\"pauseBtn_bplayer\">\n\t\t<i class=\"iconfont_bplayer\">&#xe603;</i>\n\t</div>\n</div>\n<div class=\"progress_bplayer\">\n\t<div class=\"loaded_bplayer\"></div>\n\t<div class=\"played_bplayer\"></div>\n\t<div class=\"progressctl_bplayer\"></div>\n</div>\n";

var appName = '[BP]';
var info = console.info.bind(console, appName);
var warn = console.warn.bind(console, appName);

__$styleInject("@font-face {\n\tfont-family: 'iconfont_bplayer';  /* project id 67267 */\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot');\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot?#iefix') format('embedded-opentype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.woff') format('woff'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.ttf') format('truetype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.svg#iconfont') format('svg');\n}\n\nbplayer {\n\tdisplay: block;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.iconfont_bplayer {\n\tfont-family:\"iconfont_bplayer\";\n\tfont-style:normal;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-stroke-width: 0.2px;\n}\n\n.bPlayer {\n\tbox-sizing: border-box;\n\tposition: relative;\n\toverflow: hidden;\n\tfont-family:\n\t\tHelvetica, Tahoma, Arial, \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", STXihei, STHeiti, Heiti, SimSun, sans-serif;\n\twidth: 100%;\n\theight: 60px;\n\tbackground-color: #FFF;\n\tcursor: default;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n}\n\n.cover_bplayer {\n\tbackground-color: #CCC;\n\theight: 60px;\n\twidth: 60px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n.cover_bplayer:before {\n\tcontent: \"\\e605\";\n\tfont-family:\"iconfont_bplayer\";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n}\n\n.coverimg_bplayer {\n\tposition: absolute;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.controlbtn_bplayer {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n\tbackground-color: rgba(0,0,0,0.27);\n\topacity: 0;\n\tdisplay: block;\n\ttransition: opacity 500ms;\n}\n.controlbtn_bplayer.playBtn_bplayer {\n\topacity: 0.8;\n}\n.controlbtn_bplayer:hover {\n\topacity: 1;\n}\n\n.info_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\theight: 60px;\n\twidth: 100%;\n}\n\n.titlewrap_bplayer {\n\tpadding-left: 72px;\n\tpadding-right: 140px;\n\tline-height: 60px;\n\theight: 60px;\n\tfont-size: 20px;\n\twhite-space: nowrap;\n\ttext-align: left;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\n\n.author_bplayer {\n\tfont-size: 80%;\n\topacity: 0.8;\n}\n.author_bplayer:before {\n\tcontent: \" - \";\n}\n\n.buttons_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tfont-size: 16px;\n\tright: 0;\n}\n.btn_bplayer {\n\theight: 20px;\n\twidth: 20px;\n\tline-height: 20px;\n\ttext-align: center;\n\tmargin-right: 8px;\n\tfloat: right;\n\topacity: 1;\n\ttransition: opacity 500ms;\n}\n\n.progress_bplayer {\n\tposition: absolute;\n\tbottom: 0;\n\theight: 2px;\n\twidth: 100%;\n\ttransition: height 500ms;\n}\n.progress_bplayer:hover {\n\theight: 6px;\n}\n.loaded_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #AAA;\n\ttransition: width 300ms linear;\n}\n.played_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #A91212;\n\ttransition: width 100ms linear;\n}\n.progressctl_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.time_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tright: 65px;\n\tline-height: 20px;\n\tfont-size: 12px;\n}\n.total_bplayer:before {\n\tcontent: \" / \";\n}\n\n.volume_bplayer {\n\tposition: relative;\n\tline-height: 20px;\n\theight: 20px;\n\twidth: 20px;\n\tfloat: right;\n\tmargin-right: 8px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\tbackground-color: #FFF;\n\ttransition: box-shadow 500ms, width 500ms;\n}\n.volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\twidth: 105px;\n}\n.volumebtn_bplayer {\n\tfloat: right;\n\tmargin: 0;\n}\n.volumebar_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 20px;\n\theight: 20px;\n\twidth: 85px;\n}\n.volumebg_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #AAA;\n}\n.volumeval_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #A91212;\n}\n.volumectl_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin-left: 5px;\n\theight: 20px;\n}\n\n\n.disabled_bplayer {\n\topacity: 0.2;\n}\n\n.hidden_bplayer {\n\topacity: 0;\n\tdisplay: none;\n}\n\n.narrow_bplayer .buttons_bplayer {\n\ttop: 35px;\n}\n.narrow_bplayer .time_bplayer {\n\ttop: 35px;\n}\n\n.narrow_bplayer .titlewrap_bplayer {\n\tpadding-right: 0;\n\tline-height: 40px;\n\tfont-size: 16px;\n}\n\n\n/* Section for bPayer_slim */\n.bPlayer.slim_bPlayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .cover_bplayer {\n\theight: 30px;\n\twidth: 30px;\n}\n.slim_bPlayer .cover_bplayer:before {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .controlbtn_bplayer {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .info_bplayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .titlewrap_bplayer {\n\tpadding-left: 38px;\n\tpadding-right: 140px;\n\tline-height: 30px;\n\theight: 30px;\n\tfont-size: 16px;\n}\n\n.slim_bPlayer .buttons_bplayer {\n\ttop: 0;\n\theight: 30px;\n}\n.slim_bPlayer .btn_bplayer {\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .time_bplayer {\n\ttop: 0;\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .volume_bplayer {\n\theight: 30px;\n\ttransition: width 500ms;\n}\n.slim_bPlayer .volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\twidth: 105px;\n}\n.slim_bPlayer .volumebar_bplayer {\n\theight: 30px;\n}\n.slim_bPlayer .volumebg_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumeval_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumectl_bplayer {\n\theight: 30px;\n}\n\n", undefined);

var defaults = {
	src: '',
	cover: '',
	title: 'Unknown',
	artist: 'Unknown',
	color: '#A91212',
	volume: 1,
	muted: false,
	autoplay: false,
	loop: false,
	slim: false
};

var response = function response() {
	if (this.clientWidth <= 460) {
		this.classList.add("narrow_bplayer");
	} else {
		this.classList.remove("narrow_bplayer");
	}
};

var formatTime = function formatTime(sec) {
	var hours = Math.floor(sec / 3600);
	var minutes = Math.floor((sec - hours * 3600) / 60);
	var seconds = Math.floor(sec - hours * 3600 - minutes * 60);

	var hs = '';
	var ms = '';
	var ss = '';

	hs = hours + ':';
	if (isNaN(minutes)) ms = '00:';else ms = '' + minutes;
	if (isNaN(seconds)) ss = '00';else ss = '' + seconds;
	if (hours < 10) hs = '0' + hours + ':';
	if (minutes < 10) ms = '0' + minutes + ':';
	if (seconds < 10) ss = '0' + seconds;
	if (isNaN(hours) || hours <= 0) hs = '';
	return '' + hs + ms + ss;
};

function _get() {
	return {
		src: this.src,
		cover: this.cover,
		title: this.title,
		artist: this.artist,
		color: this.color,
		slim: this.slim,
		volume: this.volume,
		muted: this.muted
	};
}

function _set(data) {
	for (var _i in defaults) {
		if (data[_i] !== null && typeof data[_i] !== 'undefined') {
			this[_i] = data[_i];
		}
	}
}

function _get2() {
	return this.className.split(' ').indexOf('slim_bPlayer') !== -1;
}

function _set2(slim) {
	slim = !!slim;
	if (slim) this.classList.add('slim_bPlayer');else this.classList.remove('slim_bPlayer');
}

function _data2(_data) {
	if (typeof _data !== 'undefined') {
		this._el.data = _data;
		return this;
	}
	return this._el.data;
}

function _slim2(_slim) {
	if (typeof _slim !== 'undefined') {
		this._el.slim = _slim;
		return this;
	}
	return this._el.slim;
}

function _src2(_src) {
	if (typeof _src !== 'undefined') {
		this._el.src = _src;
		return this;
	}
	return this._el.src;
}

function _cover2(_cover) {
	if (typeof _cover !== 'undefined') {
		this._el.cover = _cover;
		return this;
	}
	return this._el.cover;
}

function _title2(_title) {
	if (typeof _title !== 'undefined') {
		this._el.title = _title;
		return this;
	}
	return this._el.title;
}

function _artist2(_artist) {
	if (typeof _artist !== 'undefined') {
		this._el.artist = _artist;
		return this;
	}
	return this._el.artist;
}

function _color2(_color) {
	if (typeof _color !== 'undefined') {
		this._el.color = _color;
		return this;
	}
	return this._el.color;
}

function _volume2(_volume) {
	if (typeof _volume !== 'undefined') {
		this._el.volume = _volume;
		return this;
	}
	return this._el.volume;
}

function _muted2(_muted) {
	if (typeof _muted !== 'undefined') {
		this._el.muted = _muted;
		return this;
	}
	return this._el.muted;
}

function _loop2(_loop) {
	if (typeof _loop !== 'undefined') {
		this._el.loop = _loop;
		return this;
	}
	return this._el.loop;
}

function _autoplay2(_autoplay) {
	if (typeof _autoplay !== 'undefined') {
		this._el.autoplay = _autoplay;
		return this;
	}
	return this._el.autoplay;
}

function _addListener() {
	var _el;

	(_el = this._el).addListener.apply(_el, arguments);
	return this;
}

function _removeListener() {
	var _el2;

	(_el2 = this._el).removeListener.apply(_el2, arguments);
	return this;
}

function _play() {
	this._el.play();
	return this;
}

function _pause() {
	this._el.pause();
	return this;
}

function _get3() {
	return this._el.paused;
}

function _get4() {
	return this;
}

function _get5() {
	return "1.0.0.master.02df966";
}

var bPlayer = function () {
	function bPlayer(el, data) {
		var _this = this;

		_classCallCheck(this, bPlayer);

		if (!(el instanceof Element)) el = document.querySelector(el);

		if (el.bp instanceof bPlayer) return warn('This element has already been attached!');
		Object.defineProperty(el, 'bp', { value: this });

		var parent = el.parentNode;

		Object.defineProperty(this, '_el', { value: document.createElement('bplayer') });

		var _response = response.bind(this._el);

		for (var i = 0; i < el.attributes.length; i++) {
			if (!/(src|title|artist|slim|cover|color|autoplay|loop|controls)/i.test(el.attributes[i].name)) this._el.setAttribute(el.attributes[i].name, el.attributes[i].value);
		}
		this._el.classList.add('bPlayer');
		this._el.insertAdjacentHTML('afterbegin', content);

		var status = {
			progressdown: false,
			volumedown: false
		};

		var els = {
			cover: this._el.querySelector('.coverimg_bplayer'),
			progressCtl: this._el.querySelector('.progressctl_bplayer'),
			volumeCtl: this._el.querySelector('.volumectl_bplayer'),
			title: this._el.querySelector('.title_bplayer'),
			artist: this._el.querySelector('.author_bplayer'),
			played: this._el.querySelector('.played_bplayer'),
			current: this._el.querySelector('.current_bplayer'),
			loaded: this._el.querySelector('.loaded_bplayer'),
			total: this._el.querySelector('.total_bplayer'),
			volumeVal: this._el.querySelector('.volumeval_bplayer'),
			playCtl: this._el.querySelector('.cover_bplayer'),
			volumeBtn: this._el.querySelector('#volumeBtn_bplayer'),
			loopBtn: this._el.querySelector('#loopBtn_bplayer'),
			playBtn: this._el.querySelector('#playBtn_bplayer'),
			pauseBtn: this._el.querySelector('#pauseBtn_bplayer')
		};

		if (el.tagName.toUpperCase() === 'AUDIO') {
			els.audio = el;
			el = document.createTextNode('');
			parent.insertBefore(el, els.audio);
		} else els.audio = new Audio();

		els.audio.controls = false;

		this._el.appendChild(els.audio);
		parent.replaceChild(this._el, el);
		window.addEventListener('resize', _response);
		_response();

		var progressCtl = els.progressCtl,
		    volumeCtl = els.volumeCtl,
		    played = els.played,
		    current = els.current,
		    loaded = els.loaded,
		    total = els.total,
		    volumeVal = els.volumeVal,
		    volumeBtn = els.volumeBtn,
		    playCtl = els.playCtl,
		    loopBtn = els.loopBtn,
		    playBtn = els.playBtn,
		    pauseBtn = els.pauseBtn;


		progressCtl.addEventListener('click', function (e) {
			var w = this.clientWidth;
			var x = e.offsetX;
			els.audio.currentTime = x / w * els.audio.duration;
		});
		progressCtl.addEventListener('mousedown', function () {
			status.progressdown = true;
		});
		progressCtl.addEventListener('mouseup', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('mouseout', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('mousemove', function (e) {
			if (status.progressdown) {
				var w = this.clientWidth;
				var x = e.offsetX;
				els.audio.currentTime = x / w * els.audio.duration;
			}
		});
		progressCtl.addEventListener('touchstart', function () {
			status.progressdown = true;
		});
		progressCtl.addEventListener('touchend', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('touchmove', function (e) {
			if (status.progressdown) {
				var w = this.clientWidth;
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left;
				els.audio.currentTime = x / w * els.audio.duration;
			}
		});
		volumeCtl.addEventListener('click', function (e) {
			var x = e.offsetX + 1;
			if (x >= 0) els.audio.volume = x / 80;
		});
		volumeCtl.addEventListener('mousedown', function () {
			status.volumedown = true;
		});
		volumeCtl.addEventListener('mouseup', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('mouseout', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('mousemove', function (e) {
			if (status.volumedown) {
				var x = e.offsetX + 1;
				if (x >= 0) els.audio.volume = x / 80;
			}
		});
		volumeCtl.addEventListener('touchstart', function () {
			status.volumedown = true;
		});
		volumeCtl.addEventListener('touchend', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('touchmove', function (e) {
			if (status.volumedown) {
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left + 1;
				if (x >= 0) els.audio.volume = x / 80;
			}
		});
		volumeBtn.addEventListener('click', function () {
			_this._el.muted = !_this._el.muted;
		});
		playCtl.addEventListener('click', function () {
			if (els.audio.paused) {
				_this._el.play();
			} else {
				_this._el.pause();
			}
		});
		loopBtn.addEventListener('click', function () {
			_this._el.loop = !_this._el.loop;
		});

		els.audio.addEventListener('timeupdate', function () {
			played.style.width = this.currentTime / this.duration * 100 + '%';
			current.textContent = formatTime(this.currentTime);
		});
		els.audio.addEventListener('progress', function () {
			if (this.buffered.length === 1) loaded.style.width = this.buffered.end(0) / this.duration * 100 + '%';
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('volumechange', function () {
			volumeVal.style.width = this.volume * 80 + 'px';
		});
		els.audio.addEventListener('play', function () {
			playBtn.classList.add('hidden_bplayer');
			pauseBtn.classList.remove('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('pause', function () {
			playBtn.classList.remove('hidden_bplayer');
			pauseBtn.classList.add('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('ended', function () {
			if (!_this.loop) {
				_this.pause();
			}
		});

		_Object$defineProperties(this._el, {
			data: {
				get: _get,
				set: _set
			},
			slim: {
				get: _get2,
				set: _set2
			},
			src: {
				get: function get() {
					return els.audio.src;
				},
				set: function set(src) {
					els.audio.src = src;
				}
			},
			cover: {
				get: function get() {
					return els.cover.style.backgroundImage.split('")')[0].split('url("')[1];
				},
				set: function set(cover) {
					els.cover.style.backgroundImage = 'url("' + cover + '")';
				}
			},
			title: {
				get: function get() {
					return els.title.textContent;
				},
				set: function set(title) {
					els.title.textContent = title;
				}
			},
			artist: {
				get: function get() {
					return els.artist.textContent;
				},
				set: function set(artist) {
					els.artist.textContent = artist;
				}
			},
			color: {
				get: function get() {
					return els.played.style.backgroundColor;
				},
				set: function set(color) {
					els.played.style.backgroundColor = color;
					els.volumeVal.style.backgroundColor = color;
				}
			},
			volume: {
				get: function get() {
					return els.audio.volume;
				},
				set: function set(volume) {
					els.audio.volume = volume;
				}
			},
			muted: {
				get: function get() {
					return els.audio.muted;
				},
				set: function set(muted) {
					muted = !!muted;
					els.audio.muted = muted;
					if (muted) els.volumeBtn.classList.add('disabled_bplayer');else els.volumeBtn.classList.remove('disabled_bplayer');
				}
			},
			loop: {
				get: function get() {
					return els.audio.loop;
				},
				set: function set(loop) {
					loop = !!loop;
					els.audio.loop = loop;
					if (loop) els.loopBtn.classList.remove('disabled_bplayer');else els.loopBtn.classList.add('disabled_bplayer');
				}
			},
			autoplay: {
				get: function get() {
					return els.audio.autoplay;
				},
				set: function set(autoplay) {
					autoplay = !!autoplay;
					els.audio.autoplay = autoplay;
				}
			},
			paused: {
				get: function get() {
					return els.audio.paused;
				}
			},
			addListener: {
				value: function value(type, fn) {
					return els.audio.addEventListener(type, fn, false);
				}
			},
			removeListener: {
				value: function value(type, fn) {
					return els.audio.removeEventListener(type, fn, false);
				}
			},
			play: {
				value: els.audio.play.bind(els.audio)
			},
			pause: {
				value: els.audio.pause.bind(els.audio)
			},
			bp: {
				value: this
			}
		});

		if (data) {
			for (var _i2 in defaults) {
				if (data[_i2] === null || typeof data[_i2] === 'undefined') data[_i2] = defaults[_i2];
			}
		} else data = _Object$assign({}, defaults);
		for (var _i3 in defaults) {
			this[_i3](data[_i3]);
		}
	}

	_createClass(bPlayer, [{
		key: 'data',
		value: _data2
	}, {
		key: 'slim',
		value: _slim2
	}, {
		key: 'src',
		value: _src2
	}, {
		key: 'cover',
		value: _cover2
	}, {
		key: 'title',
		value: _title2
	}, {
		key: 'artist',
		value: _artist2
	}, {
		key: 'color',
		value: _color2
	}, {
		key: 'volume',
		value: _volume2
	}, {
		key: 'muted',
		value: _muted2
	}, {
		key: 'loop',
		value: _loop2
	}, {
		key: 'autoplay',
		value: _autoplay2
	}, {
		key: 'addListener',
		value: _addListener
	}, {
		key: 'removeListener',
		value: _removeListener
	}, {
		key: 'play',
		value: _play
	}, {
		key: 'pause',
		value: _pause
	}, {
		key: 'paused',
		get: _get3
	}, {
		key: 'bp',
		get: _get4
	}], [{
		key: 'scan',
		value: function scan() {
			var audioList = document.querySelectorAll('audio[controls="bplayer"]');
			for (var i = 0; i < audioList.length; i++) {
				var data = {
					src: audioList[i].src,
					loop: audioList[i].loop,
					title: audioList[i].title,
					autoplay: audioList[i].autoplay,
					slim: JSON.parse(audioList[i].getAttribute('slim')),
					cover: audioList[i].getAttribute('cover'),
					color: audioList[i].getAttribute('color'),
					artist: audioList[i].getAttribute('artist')
				};
				new bPlayer(audioList[i], data);
			}
		}
	}, {
		key: 'version',
		get: _get5
	}]);

	return bPlayer;
}();

function _ref() {
	return bPlayer;
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = bPlayer;
} else if (typeof define === 'function' && define.amd) {
	define(_ref);
} else {
	window.bPlayer = bPlayer;
}

var ls1 = '\nbackground-color: #A91212;\nfont-weight: bold;\ncolor: #FFF;\nfont-size: 20px;\n';
var ls2 = '\nbackground-color: #531212;\nfont-weight: bold;\ncolor: #FEDCBA;\nfont-size: 20px;\n';
var ls3 = '\nbackground-color: #000;\nfont-weight: bold;\ncolor: #FEDCBA;\nfont-size: 12px;\n';

console.log('%c bPlayer %c v' + "1.0.0.master.02df966" + ' \n%c See http://bplayer.js.org for detail. ', ls1, ls2, ls3);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL3NyYy9kZWJ1Zy5qcyIsIi4uL3NyYy9icGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0aWVzOiByZXF1aXJlKCcuL19vYmplY3QtZHBzJyl9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhULCBEKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhULCBEKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCdcblxuY29uc3QgYXBwTmFtZSA9ICdbQlBdJ1xuY29uc3QgaW5mbyA9IGNvbnNvbGUuaW5mby5iaW5kKGNvbnNvbGUsIGFwcE5hbWUpXG5jb25zdCB3YXJuID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSwgYXBwTmFtZSlcblxuZXhwb3J0IHsgaW5mbywgd2FybiB9XG4iLCIvKiBnbG9iYWwgVkVSU0lPTiBkZWZpbmUgKi9cbid1c2Ugc3RyaWN0J1xuXG4vLyBJbXBvcnQgZXZlcnl0aGluZ1xuaW1wb3J0IGNvbnRlbnQgZnJvbSAnLi9icGxheWVyLmh0bWwnXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi9kZWJ1Zy5qcydcbmltcG9ydCAnLi9icGxheWVyLmNzcydcblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cdHNyYzogJycsXG5cdGNvdmVyOiAnJyxcblx0dGl0bGU6ICdVbmtub3duJyxcblx0YXJ0aXN0OiAnVW5rbm93bicsXG5cdGNvbG9yOiAnI0E5MTIxMicsXG5cdHZvbHVtZTogMSxcblx0bXV0ZWQ6IGZhbHNlLFxuXHRhdXRvcGxheTogZmFsc2UsXG5cdGxvb3A6IGZhbHNlLFxuXHRzbGltOiBmYWxzZVxufVxuXG5jb25zdCByZXNwb25zZSA9IGZ1bmN0aW9uKCkge1xuXHRpZiAodGhpcy5jbGllbnRXaWR0aCA8PSA0NjApIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoXCJuYXJyb3dfYnBsYXllclwiKVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcIm5hcnJvd19icGxheWVyXCIpXG5cdH1cbn1cblxuY29uc3QgZm9ybWF0VGltZSA9IGZ1bmN0aW9uIChzZWMpIHtcblx0Y29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlYyAvIDM2MDApXG5cdGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWMgLSAoaG91cnMgKiAzNjAwKSkgLyA2MClcblx0Y29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3Ioc2VjIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKSlcblxuXHRsZXQgaHMgPSAnJ1xuXHRsZXQgbXMgPSAnJ1xuXHRsZXQgc3MgPSAnJ1xuXG5cdGhzID0gYCR7aG91cnN9OmBcblx0aWYgKGlzTmFOKG1pbnV0ZXMpKSBtcyA9ICcwMDonXG5cdGVsc2UgbXMgPSBgJHttaW51dGVzfWBcblx0aWYgKGlzTmFOKHNlY29uZHMpKSBzcyA9ICcwMCdcblx0ZWxzZSBzcyA9IGAke3NlY29uZHN9YFxuXHRpZiAoaG91cnMgPCAxMCkgaHMgPSBgMCR7aG91cnN9OmBcblx0aWYgKG1pbnV0ZXMgPCAxMCkgbXMgPSBgMCR7bWludXRlc306YFxuXHRpZiAoc2Vjb25kcyA8IDEwKSBzcyA9IGAwJHtzZWNvbmRzfWBcblx0aWYgKGlzTmFOKGhvdXJzKSB8fCBob3VycyA8PSAwKSBocyA9ICcnXG5cdHJldHVybiBgJHtoc30ke21zfSR7c3N9YFxufVxuXG5jb25zdCBiUGxheWVyID0gY2xhc3Mge1xuXHRjb25zdHJ1Y3RvcihlbCwgZGF0YSkge1xuXHRcdC8vIEVuc3VyZSBlbGVtZW50XG5cdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBFbGVtZW50KSkgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaGFzIGJlZW4gdHVybmVkIGludG8gYlBsYXllclxuXHRcdGlmIChlbC5icCBpbnN0YW5jZW9mIGJQbGF5ZXIpIHJldHVybiB3YXJuKCdUaGlzIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBhdHRhY2hlZCEnKVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgJ2JwJyAsIHsgdmFsdWU6IHRoaXMgfSlcblxuXHRcdGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudE5vZGVcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2VsJywgeyB2YWx1ZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnBsYXllcicpIH0pXG5cblx0XHRjb25zdCBfcmVzcG9uc2UgPSByZXNwb25zZS5iaW5kKHRoaXMuX2VsKVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoISgvKHNyY3x0aXRsZXxhcnRpc3R8c2xpbXxjb3Zlcnxjb2xvcnxhdXRvcGxheXxsb29wfGNvbnRyb2xzKS9pLnRlc3QoZWwuYXR0cmlidXRlc1tpXS5uYW1lKSkpIHRoaXMuX2VsLnNldEF0dHJpYnV0ZShlbC5hdHRyaWJ1dGVzW2ldLm5hbWUsIGVsLmF0dHJpYnV0ZXNbaV0udmFsdWUpXG5cdFx0fVxuXHRcdHRoaXMuX2VsLmNsYXNzTGlzdC5hZGQoJ2JQbGF5ZXInKVxuXHRcdHRoaXMuX2VsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGNvbnRlbnQpXG5cblx0XHRjb25zdCBzdGF0dXMgPSB7XG5cdFx0XHRwcm9ncmVzc2Rvd246IGZhbHNlLFxuXHRcdFx0dm9sdW1lZG93bjogZmFsc2Vcblx0XHR9XG5cblx0XHQvLyBHZXQgYWxsIG5lZWRlZCBlbGVtZW50c1xuXHRcdGNvbnN0IGVscyA9IHtcblx0XHRcdGNvdmVyOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuY292ZXJpbWdfYnBsYXllcicpLFxuXHRcdFx0cHJvZ3Jlc3NDdGw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzc2N0bF9icGxheWVyJyksXG5cdFx0XHR2b2x1bWVDdGw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVjdGxfYnBsYXllcicpLFxuXHRcdFx0dGl0bGU6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZV9icGxheWVyJyksXG5cdFx0XHRhcnRpc3Q6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5hdXRob3JfYnBsYXllcicpLFxuXHRcdFx0cGxheWVkOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucGxheWVkX2JwbGF5ZXInKSxcblx0XHRcdGN1cnJlbnQ6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50X2JwbGF5ZXInKSxcblx0XHRcdGxvYWRlZDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmxvYWRlZF9icGxheWVyJyksXG5cdFx0XHR0b3RhbDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnRvdGFsX2JwbGF5ZXInKSxcblx0XHRcdHZvbHVtZVZhbDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnZvbHVtZXZhbF9icGxheWVyJyksXG5cdFx0XHRwbGF5Q3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuY292ZXJfYnBsYXllcicpLFxuXHRcdFx0dm9sdW1lQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjdm9sdW1lQnRuX2JwbGF5ZXInKSxcblx0XHRcdGxvb3BCdG46IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJyNsb29wQnRuX2JwbGF5ZXInKSxcblx0XHRcdHBsYXlCdG46IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJyNwbGF5QnRuX2JwbGF5ZXInKSxcblx0XHRcdHBhdXNlQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGF1c2VCdG5fYnBsYXllcicpXG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgYW4gYXVkaW8gdGFnXG5cdFx0aWYgKGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0FVRElPJykge1xuXHRcdFx0ZWxzLmF1ZGlvID0gZWxcblx0XHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG5cdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCBlbHMuYXVkaW8pXG5cdFx0fSBlbHNlIGVscy5hdWRpbyA9IG5ldyBBdWRpbygpXG5cblx0XHQvLyBIaWRlIHRoZSBhdWRpbyBlbGVtZW50XG5cdFx0ZWxzLmF1ZGlvLmNvbnRyb2xzID0gZmFsc2VcblxuXHRcdC8vIEF0dGFjaCB0byBET01cblx0XHR0aGlzLl9lbC5hcHBlbmRDaGlsZChlbHMuYXVkaW8pXG5cdFx0cGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLl9lbCwgZWwpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF9yZXNwb25zZSlcblx0XHRfcmVzcG9uc2UoKVxuXG5cdFx0Y29uc3Qge1xuXHRcdFx0cHJvZ3Jlc3NDdGwsXG5cdFx0XHR2b2x1bWVDdGwsXG5cdFx0XHRwbGF5ZWQsXG5cdFx0XHRjdXJyZW50LFxuXHRcdFx0bG9hZGVkLFxuXHRcdFx0dG90YWwsXG5cdFx0XHR2b2x1bWVWYWwsXG5cdFx0XHR2b2x1bWVCdG4sXG5cdFx0XHRwbGF5Q3RsLFxuXHRcdFx0bG9vcEJ0bixcblx0XHRcdHBsYXlCdG4sXG5cdFx0XHRwYXVzZUJ0blxuXHRcdH0gPSBlbHNcblxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0Y29uc3QgdyA9IHRoaXMuY2xpZW50V2lkdGhcblx0XHRcdGNvbnN0IHggPSBlLm9mZnNldFhcblx0XHRcdGVscy5hdWRpby5jdXJyZW50VGltZSA9IHggLyB3ICogZWxzLmF1ZGlvLmR1cmF0aW9uXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy5wcm9ncmVzc2Rvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChzdGF0dXMucHJvZ3Jlc3Nkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdGNvbnN0IHggPSBlLm9mZnNldFhcblx0XHRcdFx0ZWxzLmF1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBlbHMuYXVkaW8uZHVyYXRpb25cblx0XHRcdH1cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChzdGF0dXMucHJvZ3Jlc3Nkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdGVscy5hdWRpby5jdXJyZW50VGltZSA9IHggLyB3ICogZWxzLmF1ZGlvLmR1cmF0aW9uXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0Y29uc3QgeCA9IGUub2Zmc2V0WCArIDFcblx0XHRcdGlmICh4ID49IDApIGVscy5hdWRpby52b2x1bWUgPSB4IC8gODBcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdFx0c3RhdHVzLnZvbHVtZWRvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuXHRcdFx0c3RhdHVzLnZvbHVtZWRvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG5cdFx0XHRpZiAoc3RhdHVzLnZvbHVtZWRvd24pIHtcblx0XHRcdFx0Y29uc3QgeCA9IGUub2Zmc2V0WCArIDFcblx0XHRcdFx0aWYgKHggPj0gMCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy52b2x1bWVkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHN0YXR1cy52b2x1bWVkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgMVxuXHRcdFx0XHRpZiAoeCA+PSAwKSBlbHMuYXVkaW8udm9sdW1lID0geCAvIDgwXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR2b2x1bWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9lbC5tdXRlZCA9ICF0aGlzLl9lbC5tdXRlZFxuXHRcdH0pXG5cdFx0cGxheUN0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGlmIChlbHMuYXVkaW8ucGF1c2VkKSB7XG5cdFx0XHRcdHRoaXMuX2VsLnBsYXkoKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZWwucGF1c2UoKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0bG9vcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuX2VsLmxvb3AgPSAhdGhpcy5fZWwubG9vcFxuXHRcdH0pXG5cblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheWVkLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50VGltZSAvIHRoaXMuZHVyYXRpb24gKiAxMDB9JWBcblx0XHRcdGN1cnJlbnQudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuY3VycmVudFRpbWUpXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLmJ1ZmZlcmVkLmxlbmd0aCA9PT0gMSkgbG9hZGVkLnN0eWxlLndpZHRoID0gYCR7dGhpcy5idWZmZXJlZC5lbmQoMCkgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdGVscy5hdWRpby5hZGRFdmVudExpc3RlbmVyKCd2b2x1bWVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZvbHVtZVZhbC5zdHlsZS53aWR0aCA9IGAke3RoaXMudm9sdW1lICogODB9cHhgXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHRwYXVzZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdGVscy5hdWRpby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHRwYXVzZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdGVscy5hdWRpby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcblx0XHRcdGlmICghdGhpcy5sb29wKSB7XG5cdFx0XHRcdHRoaXMucGF1c2UoKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLl9lbCwge1xuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHNyYzogdGhpcy5zcmMsXG5cdFx0XHRcdFx0XHRjb3ZlcjogdGhpcy5jb3Zlcixcblx0XHRcdFx0XHRcdHRpdGxlOiB0aGlzLnRpdGxlLFxuXHRcdFx0XHRcdFx0YXJ0aXN0OiB0aGlzLmFydGlzdCxcblx0XHRcdFx0XHRcdGNvbG9yOiB0aGlzLmNvbG9yLFxuXHRcdFx0XHRcdFx0c2xpbTogdGhpcy5zbGltLFxuXHRcdFx0XHRcdFx0dm9sdW1lOiB0aGlzLnZvbHVtZSxcblx0XHRcdFx0XHRcdG11dGVkOiB0aGlzLm11dGVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoZGF0YSkge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgaW4gZGVmYXVsdHMpIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhW2ldICE9PSBudWxsICYmIHR5cGVvZiBkYXRhW2ldICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHR0aGlzW2ldID0gZGF0YVtpXVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNsaW06IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoJ3NsaW1fYlBsYXllcicpICE9PSAtMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoc2xpbSkge1xuXHRcdFx0XHRcdHNsaW0gPSAhIXNsaW1cblx0XHRcdFx0XHRpZiAoc2xpbSkgdGhpcy5jbGFzc0xpc3QuYWRkKCdzbGltX2JQbGF5ZXInKVxuXHRcdFx0XHRcdGVsc2UgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzbGltX2JQbGF5ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c3JjOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoc3JjKSB7XG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLnNyYyA9IHNyY1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y292ZXI6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuY292ZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlLnNwbGl0KCdcIiknKVswXS5zcGxpdCgndXJsKFwiJylbMV1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGNvdmVyKSB7XG5cdFx0XHRcdFx0ZWxzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2NvdmVyfVwiKWBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLnRpdGxlLnRleHRDb250ZW50XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldCh0aXRsZSkge1xuXHRcdFx0XHRcdGVscy50aXRsZS50ZXh0Q29udGVudCA9IHRpdGxlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhcnRpc3Q6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuYXJ0aXN0LnRleHRDb250ZW50XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChhcnRpc3QpIHtcblx0XHRcdFx0XHRlbHMuYXJ0aXN0LnRleHRDb250ZW50ID0gYXJ0aXN0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjb2xvcjoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5wbGF5ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChjb2xvcikge1xuXHRcdFx0XHRcdGVscy5wbGF5ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XHRcdFx0XHRlbHMudm9sdW1lVmFsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR2b2x1bWU6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuYXVkaW8udm9sdW1lXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldCh2b2x1bWUpIHtcblx0XHRcdFx0XHRlbHMuYXVkaW8udm9sdW1lID0gdm9sdW1lXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtdXRlZDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5tdXRlZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQobXV0ZWQpIHtcblx0XHRcdFx0XHRtdXRlZCA9ICEhbXV0ZWRcblx0XHRcdFx0XHRlbHMuYXVkaW8ubXV0ZWQgPSBtdXRlZFxuXHRcdFx0XHRcdGlmIChtdXRlZCkgZWxzLnZvbHVtZUJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdFx0XHRlbHNlIGVscy52b2x1bWVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRsb29wOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLmxvb3Bcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGxvb3ApIHtcblx0XHRcdFx0XHRsb29wID0gISFsb29wXG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLmxvb3AgPSBsb29wXG5cdFx0XHRcdFx0aWYgKGxvb3ApIGVscy5sb29wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0XHRcdGVsc2UgZWxzLmxvb3BCdG4uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhdXRvcGxheToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5hdXRvcGxheVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXV0b3BsYXkpIHtcblx0XHRcdFx0XHRhdXRvcGxheSA9ICEhYXV0b3BsYXlcblx0XHRcdFx0XHRlbHMuYXVkaW8uYXV0b3BsYXkgPSBhdXRvcGxheVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cGF1c2VkOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLnBhdXNlZFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YWRkTGlzdGVuZXI6IHtcblx0XHRcdFx0dmFsdWU6ICh0eXBlLCBmbikgPT4gZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKVxuXHRcdFx0fSxcblx0XHRcdHJlbW92ZUxpc3RlbmVyOiB7XG5cdFx0XHRcdHZhbHVlOiAodHlwZSwgZm4pID0+IGVscy5hdWRpby5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSlcblx0XHRcdH0sXG5cdFx0XHRwbGF5OiB7XG5cdFx0XHRcdHZhbHVlOiBlbHMuYXVkaW8ucGxheS5iaW5kKGVscy5hdWRpbylcblx0XHRcdH0sXG5cdFx0XHRwYXVzZToge1xuXHRcdFx0XHR2YWx1ZTogZWxzLmF1ZGlvLnBhdXNlLmJpbmQoZWxzLmF1ZGlvKVxuXHRcdFx0fSxcblx0XHRcdGJwOiB7XG5cdFx0XHRcdHZhbHVlOiB0aGlzXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdGlmIChkYXRhW2ldID09PSBudWxsIHx8IHR5cGVvZiBkYXRhW2ldID09PSAndW5kZWZpbmVkJykgZGF0YVtpXSA9IGRlZmF1bHRzW2ldXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cylcblx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB0aGlzW2ldKGRhdGFbaV0pXG5cdH1cblxuXHRkYXRhKGRhdGEpIHtcblx0XHRpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5kYXRhID0gZGF0YVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmRhdGFcblx0fVxuXG5cdHNsaW0oc2xpbSkge1xuXHRcdGlmICh0eXBlb2Ygc2xpbSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnNsaW0gPSBzbGltXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuc2xpbVxuXHR9XG5cblx0c3JjKHNyYykge1xuXHRcdGlmICh0eXBlb2Ygc3JjICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuc3JjID0gc3JjXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuc3JjXG5cdH1cblxuXHRjb3Zlcihjb3Zlcikge1xuXHRcdGlmICh0eXBlb2YgY292ZXIgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5jb3ZlciA9IGNvdmVyXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuY292ZXJcblx0fVxuXG5cdHRpdGxlKHRpdGxlKSB7XG5cdFx0aWYgKHR5cGVvZiB0aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnRpdGxlID0gdGl0bGVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC50aXRsZVxuXHR9XG5cblx0YXJ0aXN0KGFydGlzdCkge1xuXHRcdGlmICh0eXBlb2YgYXJ0aXN0ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuYXJ0aXN0ID0gYXJ0aXN0XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuYXJ0aXN0XG5cdH1cblxuXHRjb2xvcihjb2xvcikge1xuXHRcdGlmICh0eXBlb2YgY29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5jb2xvciA9IGNvbG9yXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuY29sb3Jcblx0fVxuXG5cdHZvbHVtZSh2b2x1bWUpIHtcblx0XHRpZiAodHlwZW9mIHZvbHVtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnZvbHVtZSA9IHZvbHVtZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLnZvbHVtZVxuXHR9XG5cblx0bXV0ZWQobXV0ZWQpIHtcblx0XHRpZiAodHlwZW9mIG11dGVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwubXV0ZWQgPSBtdXRlZFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLm11dGVkXG5cdH1cblxuXHRsb29wKGxvb3ApIHtcblx0XHRpZiAodHlwZW9mIGxvb3AgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5sb29wID0gbG9vcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmxvb3Bcblx0fVxuXG5cdGF1dG9wbGF5KGF1dG9wbGF5KSB7XG5cdFx0aWYgKHR5cGVvZiBhdXRvcGxheSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLmF1dG9wbGF5ID0gYXV0b3BsYXlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5hdXRvcGxheVxuXHR9XG5cblx0Z2V0IHBhdXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZWwucGF1c2VkXG5cdH1cblxuXHRhZGRMaXN0ZW5lciguLi5hcmdzKSB7XG5cdFx0dGhpcy5fZWwuYWRkTGlzdGVuZXIoLi4uYXJncylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0cmVtb3ZlTGlzdGVuZXIoLi4uYXJncykge1xuXHRcdHRoaXMuX2VsLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBsYXkoKSB7XG5cdFx0dGhpcy5fZWwucGxheSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBhdXNlKCkge1xuXHRcdHRoaXMuX2VsLnBhdXNlKClcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Z2V0IGJwKCkge1xuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHQvLyBBdXRvbWF0aWNhbGx5IGNvbnZlcnQgYXVkaW8gdGFncyB3aXRoIFwiY29udHJvbHNcIlxuXHQvLyBhdHRyaXR1YmUgdGhhdCBoYXZlIHZhbHVlIG9mIFwiYnBsYXllclwiIGludG8gYlBsYXllci5cblx0c3RhdGljIHNjYW4oKSB7XG5cblx0XHQvKiBlc2xpbnQge25vLW5ldzogXCJvZmZcIn0gKi9cblx0XHRjb25zdCBhdWRpb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhdWRpb1tjb250cm9scz1cImJwbGF5ZXJcIl0nKVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXVkaW9MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHRzcmM6IGF1ZGlvTGlzdFtpXS5zcmMsXG5cdFx0XHRcdGxvb3A6IGF1ZGlvTGlzdFtpXS5sb29wLFxuXHRcdFx0XHR0aXRsZTogYXVkaW9MaXN0W2ldLnRpdGxlLFxuXHRcdFx0XHRhdXRvcGxheTogYXVkaW9MaXN0W2ldLmF1dG9wbGF5LFxuXHRcdFx0XHRzbGltOiBKU09OLnBhcnNlKGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ3NsaW0nKSksXG5cdFx0XHRcdGNvdmVyOiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdjb3ZlcicpLFxuXHRcdFx0XHRjb2xvcjogYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnY29sb3InKSxcblx0XHRcdFx0YXJ0aXN0OiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdhcnRpc3QnKVxuXHRcdFx0fVxuXHRcdFx0bmV3IGJQbGF5ZXIoYXVkaW9MaXN0W2ldLCBkYXRhKVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgdmVyc2lvbigpIHtcblx0XHRyZXR1cm4gVkVSU0lPTlxuXHR9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGJQbGF5ZXJcbn0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgoKSA9PiBiUGxheWVyKVxufSBlbHNlIHtcblx0d2luZG93LmJQbGF5ZXIgPSBiUGxheWVyXG59XG5cbi8vIFNldCBzdHlsZSBmb3IgaW5mb1xuY29uc3QgbHMxID0gYFxuYmFja2dyb3VuZC1jb2xvcjogI0E5MTIxMjtcbmZvbnQtd2VpZ2h0OiBib2xkO1xuY29sb3I6ICNGRkY7XG5mb250LXNpemU6IDIwcHg7XG5gXG5jb25zdCBsczIgPSBgXG5iYWNrZ3JvdW5kLWNvbG9yOiAjNTMxMjEyO1xuZm9udC13ZWlnaHQ6IGJvbGQ7XG5jb2xvcjogI0ZFRENCQTtcbmZvbnQtc2l6ZTogMjBweDtcbmBcbmNvbnN0IGxzMyA9IGBcbmJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5mb250LXdlaWdodDogYm9sZDtcbmNvbG9yOiAjRkVEQ0JBO1xuZm9udC1zaXplOiAxMnB4O1xuYFxuLy8gU2hvdyBpbmZvcm1hdGlvbiB3aGVuIGJQbGF5ZXIgbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbmNvbnNvbGUubG9nKGAlYyBiUGxheWVyICVjIHYke1ZFUlNJT059IFxcbiVjIFNlZSBodHRwOi8vYnBsYXllci5qcy5vcmcgZm9yIGRldGFpbC4gYCwgbHMxLCBsczIsIGxzMylcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiaXNPYmplY3QiLCJyZXF1aXJlJCQxIiwiZG9jdW1lbnQiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsImRQIiwiZ2xvYmFsIiwiJGV4cG9ydCIsIklPYmplY3QiLCJ0b0ludGVnZXIiLCJtaW4iLCJ0b0lPYmplY3QiLCJkZWZpbmVkIiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDQiLCJhbk9iamVjdCIsImdldEtleXMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiJE9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYXBwTmFtZSIsImluZm8iLCJjb25zb2xlIiwiYmluZCIsIndhcm4iLCJkZWZhdWx0cyIsInJlc3BvbnNlIiwiY2xpZW50V2lkdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJmb3JtYXRUaW1lIiwic2VjIiwiaG91cnMiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImhzIiwibXMiLCJzcyIsImlzTmFOIiwic3JjIiwiY292ZXIiLCJ0aXRsZSIsImFydGlzdCIsImNvbG9yIiwic2xpbSIsInZvbHVtZSIsIm11dGVkIiwiZGF0YSIsImkiLCJjbGFzc05hbWUiLCJzcGxpdCIsImluZGV4T2YiLCJfZWwiLCJsb29wIiwiYXV0b3BsYXkiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicGxheSIsInBhdXNlIiwicGF1c2VkIiwiVkVSU0lPTiIsImJQbGF5ZXIiLCJlbCIsIkVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnAiLCJ2YWx1ZSIsInBhcmVudCIsInBhcmVudE5vZGUiLCJjcmVhdGVFbGVtZW50IiwiX3Jlc3BvbnNlIiwiYXR0cmlidXRlcyIsImxlbmd0aCIsInRlc3QiLCJuYW1lIiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiY29udGVudCIsInN0YXR1cyIsImVscyIsInRhZ05hbWUiLCJ0b1VwcGVyQ2FzZSIsImF1ZGlvIiwiY3JlYXRlVGV4dE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJBdWRpbyIsImNvbnRyb2xzIiwiYXBwZW5kQ2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJvZ3Jlc3NDdGwiLCJ2b2x1bWVDdGwiLCJwbGF5ZWQiLCJjdXJyZW50IiwibG9hZGVkIiwidG90YWwiLCJ2b2x1bWVWYWwiLCJ2b2x1bWVCdG4iLCJwbGF5Q3RsIiwibG9vcEJ0biIsInBsYXlCdG4iLCJwYXVzZUJ0biIsImUiLCJ3IiwieCIsIm9mZnNldFgiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwicHJvZ3Jlc3Nkb3duIiwidG91Y2hlcyIsInBhZ2VYIiwidGFyZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInZvbHVtZWRvd24iLCJzdHlsZSIsIndpZHRoIiwidGV4dENvbnRlbnQiLCJidWZmZXJlZCIsImVuZCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRDb2xvciIsInR5cGUiLCJmbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhdWRpb0xpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiSlNPTiIsInBhcnNlIiwiZ2V0QXR0cmlidXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmluZSIsImFtZCIsImxzMSIsImxzMiIsImxzMyIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLE1BQU0sR0FBRyxjQUFjLEdBQUcsT0FBTyxNQUFNLElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtJQUM3RSxNQUFNLEdBQUcsT0FBTyxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztBQUNoRyxHQUFHLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDOzs7O0FDSHZDLElBQUksSUFBSSxHQUFHLGNBQWMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvQyxHQUFHLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOzs7QUNEckMsY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLEdBQUcsT0FBTyxFQUFFLElBQUksVUFBVSxDQUFDLE1BQU0sU0FBUyxDQUFDLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO0VBQ3ZFLE9BQU8sRUFBRSxDQUFDO0NBQ1g7O0FDSEQ7QUFDQSxJQUFJLFNBQVMsR0FBR0EsVUFBd0IsQ0FBQztBQUN6QyxRQUFjLEdBQUcsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztFQUN6QyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDZCxHQUFHLElBQUksS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDaEMsT0FBTyxNQUFNO0lBQ1gsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLENBQUMs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
