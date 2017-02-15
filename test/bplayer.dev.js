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

var css = __$styleInject("@font-face {\n\tfont-family: 'iconfont_bplayer';  /* project id 67267 */\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot');\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot?#iefix') format('embedded-opentype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.woff') format('woff'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.ttf') format('truetype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.svg#iconfont') format('svg');\n}\n\nbplayer {\n\tdisplay: block;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.iconfont_bplayer {\n\tfont-family:\"iconfont_bplayer\";\n\tfont-style:normal;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-stroke-width: 0.2px;\n}\n\n.bPlayer {\n\tbox-sizing: border-box;\n\tposition: relative;\n\toverflow: hidden;\n\tfont-family:\n\t\tHelvetica, Tahoma, Arial, \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", STXihei, STHeiti, Heiti, SimSun, sans-serif;\n\twidth: 100%;\n\theight: 60px;\n\tbackground-color: #FFF;\n\tcursor: default;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n}\n\n.cover_bplayer {\n\tbackground-color: #CCC;\n\theight: 60px;\n\twidth: 60px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n.cover_bplayer:before {\n\tcontent: \"\\e605\";\n\tfont-family:\"iconfont_bplayer\";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n}\n\n.coverimg_bplayer {\n\tposition: absolute;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.controlbtn_bplayer {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n\tbackground-color: rgba(0,0,0,0.27);\n\topacity: 0;\n\tdisplay: block;\n\ttransition: opacity 500ms;\n}\n.controlbtn_bplayer.playBtn_bplayer {\n\topacity: 0.8;\n}\n.controlbtn_bplayer:hover {\n\topacity: 1;\n}\n\n.info_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\theight: 60px;\n\twidth: 100%;\n}\n\n.titlewrap_bplayer {\n\tpadding-left: 72px;\n\tpadding-right: 140px;\n\tline-height: 60px;\n\theight: 60px;\n\tfont-size: 20px;\n\twhite-space: nowrap;\n\ttext-align: left;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\n\n.author_bplayer {\n\tfont-size: 80%;\n\topacity: 0.8;\n}\n.author_bplayer:before {\n\tcontent: \" - \";\n}\n\n.buttons_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tfont-size: 16px;\n\tright: 0;\n}\n.btn_bplayer {\n\theight: 20px;\n\twidth: 20px;\n\tline-height: 20px;\n\ttext-align: center;\n\tmargin-right: 8px;\n\tfloat: right;\n\topacity: 1;\n\ttransition: opacity 500ms;\n}\n\n.progress_bplayer {\n\tposition: absolute;\n\tbottom: 0;\n\theight: 2px;\n\twidth: 100%;\n\ttransition: height 500ms;\n}\n.progress_bplayer:hover {\n\theight: 6px;\n}\n.loaded_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #AAA;\n\ttransition: width 300ms linear;\n}\n.played_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #A91212;\n\ttransition: width 100ms linear;\n}\n.progressctl_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.time_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tright: 65px;\n\tline-height: 20px;\n\tfont-size: 12px;\n}\n.total_bplayer:before {\n\tcontent: \" / \";\n}\n\n.volume_bplayer {\n\tposition: relative;\n\tline-height: 20px;\n\theight: 20px;\n\twidth: 20px;\n\tfloat: right;\n\tmargin-right: 8px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\tbackground-color: #FFF;\n\ttransition: box-shadow 500ms, width 500ms;\n}\n.volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\twidth: 105px;\n}\n.volumebtn_bplayer {\n\tfloat: right;\n\tmargin: 0;\n}\n.volumebar_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 20px;\n\theight: 20px;\n\twidth: 85px;\n}\n.volumebg_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #AAA;\n}\n.volumeval_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #A91212;\n}\n.volumectl_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin-left: 5px;\n\theight: 20px;\n}\n\n\n.disabled_bplayer {\n\topacity: 0.2;\n}\n\n.hidden_bplayer {\n\topacity: 0;\n\tdisplay: none;\n}\n\n.narrow_bplayer .buttons_bplayer {\n\ttop: 35px;\n}\n.narrow_bplayer .time_bplayer {\n\ttop: 35px;\n}\n\n.narrow_bplayer .titlewrap_bplayer {\n\tpadding-right: 0;\n\tline-height: 40px;\n\tfont-size: 16px;\n}\n\n\n/* Section for bPayer_slim */\n.bPlayer.slim_bPlayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .cover_bplayer {\n\theight: 30px;\n\twidth: 30px;\n}\n.slim_bPlayer .cover_bplayer:before {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .controlbtn_bplayer {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .info_bplayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .titlewrap_bplayer {\n\tpadding-left: 38px;\n\tpadding-right: 140px;\n\tline-height: 30px;\n\theight: 30px;\n\tfont-size: 16px;\n}\n\n.slim_bPlayer .buttons_bplayer {\n\ttop: 0;\n\theight: 30px;\n}\n.slim_bPlayer .btn_bplayer {\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .time_bplayer {\n\ttop: 0;\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .volume_bplayer {\n\theight: 30px;\n\ttransition: width 500ms;\n}\n.slim_bPlayer .volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\twidth: 105px;\n}\n.slim_bPlayer .volumebar_bplayer {\n\theight: 30px;\n}\n.slim_bPlayer .volumebg_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumeval_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumectl_bplayer {\n\theight: 30px;\n}\n\n", undefined);

var appName = '[BP]';
var info = console.info.bind(console, appName);
var warn = console.warn.bind(console, appName);

window.bps = css;

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

	var hs = hours + ':';
	var ms = minutes + ':';
	var ss = '' + seconds;

	if (hours < 10) hs = '0' + hours + ':';
	if (minutes < 10) ms = '0' + minutes + ':';
	if (seconds < 10) ss = '0' + seconds;
	if (hours <= 0) hs = '';
	return '' + hs + ms + ss;
};

function _data2(_data) {
	if (typeof _data !== 'undefined') {
		for (var i in defaults) {
			if (_data[i] !== null && typeof _data[i] !== 'undefined') {
				this[i](_data[i]);
			}
		}
		return this;
	}
	return {
		src: this.src(),
		cover: this.cover(),
		title: this.title(),
		artist: this.artist(),
		color: this.color(),
		slim: this.slim(),
		volume: this.volume(),
		muted: this.muted()
	};
}

function _src2(_src) {
	if (typeof _src !== 'undefined') {
		this._audio.src = _src;
		return this;
	}
	return this._audio.src;
}

function _cover2(_cover) {
	if (typeof _cover !== 'undefined') {
		this._els.cover.style.backgroundImage = 'url("' + _cover + '")';
		return this;
	}
	return this._els.cover.style.backgroundImage.split('")')[0].split('url("')[1];
}

function _title2(_title) {
	if (typeof _title !== 'undefined') {
		this._els.title.textContent = _title;
		return this;
	}
	return this._els.title.textContent;
}

function _artist2(_artist) {
	if (typeof _artist !== 'undefined') {
		this._els.artist.textContent = _artist;
		return this;
	}
	return this._els.artist.textContent;
}

function _color2(_color) {
	if (typeof _color !== 'undefined') {
		this._els.played.style.backgroundColor = _color;
		this._els.volumeVal.style.backgroundColor = _color;
		return this;
	}
	return this._els.played.style.backgroundColor;
}

function _slim2(_slim) {
	if (typeof _slim !== 'undefined') {
		_slim = !!_slim;
		if (_slim) this._el.classList.add('slim_bPlayer');else this._el.classList.remove('slim_bPlayer');
		return this;
	}
	return this._el.className.split(' ').indexOf('slim_bPlayer') !== -1;
}

function _muted2(_muted) {
	if (typeof _muted !== 'undefined') {
		_muted = !!_muted;
		this._audio.muted = _muted;
		if (_muted) this._els.volumeBtn.classList.add('disabled_bplayer');else this._els.volumeBtn.classList.remove('disabled_bplayer');
		return this;
	}
	return this._audio.muted;
}

function _volume2(_volume) {
	if (typeof _volume !== 'undefined') {
		this._audio.volume = _volume;
		return this;
	}
	return this._audio.volume;
}

function _loop2(_loop) {
	if (typeof _loop !== 'undefined') {
		_loop = !!_loop;
		this._audio.loop = _loop;
		if (_loop) this._els.loopBtn.classList.remove('disabled_bplayer');else this._els.loopBtn.classList.add('disabled_bplayer');
		return this;
	}
	return this._audio.loop;
}

function _autoplay2(_autoplay) {
	if (typeof _autoplay !== 'undefined') {
		_autoplay = !!_autoplay;
		this._audio.autoplay = _autoplay;
		return this;
	}
	return this._audio.autoplay;
}

function _addListener(type, fn) {
	this._audio.addEventListener(type, fn, false);
	return this;
}

function _removeListener(type, fn) {
	this._audio.removeEventListener(type, fn, false);
	return this;
}

function _play() {
	this._audio.play();
	return this;
}

function _pause() {
	this._audio.pause();
	return this;
}

function _get() {
	return this._audio.paused;
}

var bPlayer = function () {
	function bPlayer(el, data) {
		var _this2 = this;

		_classCallCheck(this, bPlayer);

		var _this = this;

		if (!(el instanceof Element)) el = document.querySelector(el);

		if (el.bp instanceof bPlayer) return warn('This element has already been attached!');

		el.bp = this;

		var parent = el.parentNode;

		Object.defineProperty(this, '_el', { value: document.createElement('bplayer') });
		this._el.bp = this;

		var _response = response.bind(this._el);

		for (var i = 0; i < el.attributes.length; i++) {
			if (!/(src|title|artist|slim|cover|color|autoplay|loop|controls)/i.test(el.attributes[i].name)) this._el.setAttribute(el.attributes[i].name, el.attributes[i].value);
		}
		this._el.classList.add('bPlayer');
		this._el.insertAdjacentHTML('afterbegin', content);

		if (el.tagName.toUpperCase() === 'AUDIO') {
			Object.defineProperty(this, '_audio', { value: el });
			el = document.createTextNode('');
			parent.insertBefore(el, this._audio);
		} else Object.defineProperty(this, '_audio', { value: new Audio() });

		this._audio.controls = false;

		this._el.appendChild(this._audio);
		parent.replaceChild(this._el, el);
		window.addEventListener('resize', _response);
		_response();

		Object.defineProperty(this, '_status', {
			value: {
				progressdown: false,
				volumedown: false
			}
		});

		Object.defineProperty(this, '_els', {
			value: {
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
			}
		});

		var _els = this._els,
		    progressCtl = _els.progressCtl,
		    volumeCtl = _els.volumeCtl,
		    played = _els.played,
		    current = _els.current,
		    loaded = _els.loaded,
		    total = _els.total,
		    volumeVal = _els.volumeVal,
		    volumeBtn = _els.volumeBtn,
		    playCtl = _els.playCtl,
		    loopBtn = _els.loopBtn,
		    playBtn = _els.playBtn,
		    pauseBtn = _els.pauseBtn;


		progressCtl.addEventListener('click', function (e) {
			var w = this.clientWidth;
			var x = e.offsetX;
			_this._audio.currentTime = x / w * _this._audio.duration;
		});
		progressCtl.addEventListener('mousedown', function () {
			_this._status.progressdown = true;
		});
		progressCtl.addEventListener('mouseup', function () {
			_this._status.progressdown = false;
		});
		progressCtl.addEventListener('mouseout', function () {
			_this._status.progressdown = false;
		});
		progressCtl.addEventListener('mousemove', function (e) {
			if (_this._status.progressdown) {
				var w = this.clientWidth;
				var x = e.offsetX;
				_this._audio.currentTime = x / w * _this._audio.duration;
			}
		});
		progressCtl.addEventListener('touchstart', function () {
			_this._status.progressdown = true;
		});
		progressCtl.addEventListener('touchend', function () {
			_this._status.progressdown = false;
		});
		progressCtl.addEventListener('touchmove', function (e) {
			if (_this._status.progressdown) {
				var w = this.clientWidth;
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left;
				_this._audio.currentTime = x / w * _this._audio.duration;
			}
		});
		volumeCtl.addEventListener('click', function (e) {
			var x = e.offsetX + 1;
			if (x >= 0) {
				_this._audio.volume = x / 80;
			}
		});
		volumeCtl.addEventListener('mousedown', function () {
			_this._status.volumedown = true;
		});
		volumeCtl.addEventListener('mouseup', function () {
			_this._status.volumedown = false;
		});
		volumeCtl.addEventListener('mouseout', function () {
			_this._status.volumedown = false;
		});
		volumeCtl.addEventListener('mousemove', function (e) {
			if (_this._status.volumedown) {
				var x = e.offsetX + 1;
				_this2._audio.volume = x / 80;
			}
		});
		volumeCtl.addEventListener('touchstart', function () {
			_this._status.volumedown = true;
		});
		volumeCtl.addEventListener('touchend', function () {
			_this._status.volumedown = false;
		});
		volumeCtl.addEventListener('touchmove', function (e) {
			if (_this._status.volumedown) {
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left + 1;
				_this._audio.volume = x / 80;
			}
		});
		volumeBtn.addEventListener('click', function () {
			_this.muted(!_this.muted());
		});
		playCtl.addEventListener('click', function () {
			if (_this2._audio.paused) {
				_this.play();
			} else {
				_this.pause();
			}
		});
		loopBtn.addEventListener('click', function () {
			_this.loop(!_this.loop());
		});

		_this._audio.addEventListener('timeupdate', function () {
			played.style.width = this.currentTime / this.duration * 100 + '%';
			current.textContent = formatTime(this.currentTime);
		});
		_this._audio.addEventListener('progress', function () {
			loaded.style.width = this.buffered.end(this.length - 1) / this.duration * 100 + '%';
			total.textContent = formatTime(this.duration);
		});
		_this._audio.addEventListener('volumechange', function () {
			volumeVal.style.width = this.volume * 80 + 'px';
		});
		_this._audio.addEventListener('play', function () {
			playBtn.classList.add('hidden_bplayer');
			pauseBtn.classList.remove('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		_this._audio.addEventListener('pause', function () {
			playBtn.classList.remove('hidden_bplayer');
			pauseBtn.classList.add('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		_this._audio.addEventListener('ended', function () {
			if (!_this2.loop) {
				_this2.pause();
			}
		});

		_Object$defineProperties(this._el, {
			data: {
				get: function get() {
					return _this.data();
				},
				set: function set(data) {
					_this.data(data);
				}
			},
			slim: {
				get: function get() {
					return _this.slim();
				},
				set: function set(slim) {
					_this.slim(slim);
				}
			},
			src: {
				get: function get() {
					return _this.src();
				},
				set: function set(src) {
					_this.src(src);
				}
			},
			cover: {
				get: function get() {
					return _this.cover();
				},
				set: function set(cover) {
					_this.cover(cover);
				}
			},
			title: {
				get: function get() {
					return _this.title();
				},
				set: function set(title) {
					_this.title(title);
				}
			},
			artist: {
				get: function get() {
					return _this.artist();
				},
				set: function set(artist) {
					_this.artist(artist);
				}
			},
			color: {
				get: function get() {
					return _this.color();
				},
				set: function set(color) {
					_this.color(color);
				}
			},
			volume: {
				get: function get() {
					return _this.volume();
				},
				set: function set(volume) {
					_this.volume(volume);
				}
			},
			muted: {
				get: function get() {
					return _this.muted();
				},
				set: function set(muted) {
					_this.muted(muted);
				}
			},
			loop: {
				get: function get() {
					return _this.loop();
				},
				set: function set(loop) {
					_this.loop(loop);
				}
			},
			autoplay: {
				get: function get() {
					return _this.autoplay();
				},
				set: function set(autoplay) {
					_this.autoplay(autoplay);
				}
			},
			paused: {
				get: function get() {
					return _this._audio.paused;
				}
			},
			addListener: {
				value: _this.addListener
			},
			removeListener: {
				value: _this.removeListener
			}
		});

		if (data) {
			for (var _i in defaults) {
				if (data[_i] === null || typeof data[_i] === 'undefined') data[_i] = defaults[_i];
			}
		} else data = _Object$assign({}, defaults);
		for (var _i2 in defaults) {
			this[_i2](data[_i2]);
		}
	}

	_createClass(bPlayer, [{
		key: 'data',
		value: _data2
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
		key: 'slim',
		value: _slim2
	}, {
		key: 'muted',
		value: _muted2
	}, {
		key: 'volume',
		value: _volume2
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
		get: _get
	}], [{
		key: 'scan',
		value: function scan() {
			var audioList = document.querySelectorAll('audio');
			for (var i = 0; i < audioList.length; i++) {
				if (audioList[i].getAttribute('controls') === 'bplayer') {
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
		}
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

info('bPlayer v' + "1.0.0-alpha.master.9bc4c88" + ' loaded!');

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL3NyYy9kZWJ1Zy5qcyIsIi4uL3NyYy9icGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjMgLyAxNS4yLjMuNyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0aWVzOiByZXF1aXJlKCcuL19vYmplY3QtZHBzJyl9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhULCBEKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhULCBEKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCdcblxuY29uc3QgYXBwTmFtZSA9ICdbQlBdJ1xuY29uc3QgaW5mbyA9IGNvbnNvbGUuaW5mby5iaW5kKGNvbnNvbGUsIGFwcE5hbWUpXG5jb25zdCB3YXJuID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSwgYXBwTmFtZSlcblxuZXhwb3J0IHsgaW5mbywgd2FybiB9XG4iLCIvKiBnbG9iYWwgVkVSU0lPTiBkZWZpbmUqL1xuJ3VzZSBzdHJpY3QnXG5cbi8vIEltcG9ydCBldmVyeXRoaW5nXG5pbXBvcnQgY29udGVudCBmcm9tICcuL2JwbGF5ZXIuaHRtbCdcbmltcG9ydCBjc3MgZnJvbSAnLi9icGxheWVyLmNzcydcbmltcG9ydCB7IGluZm8sIHdhcm4gfSBmcm9tICcuL2RlYnVnLmpzJ1xuXG53aW5kb3cuYnBzID0gY3NzXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXHRzcmM6ICcnLFxuXHRjb3ZlcjogJycsXG5cdHRpdGxlOiAnVW5rbm93bicsXG5cdGFydGlzdDogJ1Vua25vd24nLFxuXHRjb2xvcjogJyNBOTEyMTInLFxuXHR2b2x1bWU6IDEsXG5cdG11dGVkOiBmYWxzZSxcblx0YXV0b3BsYXk6IGZhbHNlLFxuXHRsb29wOiBmYWxzZSxcblx0c2xpbTogZmFsc2Vcbn1cblxuY29uc3QgcmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMuY2xpZW50V2lkdGggPD0gNDYwKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKFwibmFycm93X2JwbGF5ZXJcIilcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXJyb3dfYnBsYXllclwiKVxuXHR9XG59XG5cbmNvbnN0IGZvcm1hdFRpbWUgPSBmdW5jdGlvbiAoc2VjKSB7XG5cdGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWMgLyAzNjAwKVxuXHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjIC0gKGhvdXJzICogMzYwMCkpIC8gNjApXG5cdGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHNlYyAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCkpXG5cblx0bGV0IGhzID0gYCR7aG91cnN9OmBcblx0bGV0IG1zID0gYCR7bWludXRlc306YFxuXHRsZXQgc3MgPSBgJHtzZWNvbmRzfWBcblxuXHRpZiAoaG91cnMgPCAxMCkgaHMgPSBgMCR7aG91cnN9OmBcblx0aWYgKG1pbnV0ZXMgPCAxMCkgbXMgPSBgMCR7bWludXRlc306YFxuXHRpZiAoc2Vjb25kcyA8IDEwKSBzcyA9IGAwJHtzZWNvbmRzfWBcblx0aWYgKGhvdXJzIDw9IDApIGhzID0gJydcblx0cmV0dXJuIGAke2hzfSR7bXN9JHtzc31gXG59XG5cbmNvbnN0IGJQbGF5ZXIgPSBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGVsLCBkYXRhKSB7XG5cblx0XHQvKiBlc2xpbnQge2NvbnNpc3RlbnQtdGhpczogXCJvZmZcIn0gKi9cblx0XHRjb25zdCBfdGhpcyA9IHRoaXNcblxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIHR1cm5lZCBpbnRvIGJQbGF5ZXJcblx0XHRpZiAoZWwuYnAgaW5zdGFuY2VvZiBiUGxheWVyKSByZXR1cm4gd2FybignVGhpcyBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNoZWQhJylcblxuXHRcdC8vIE1hcmsgdGhlIGVsZW1lbnQgaW5jYXNlIG9mIGF0dGFjaCBhZ2FpblxuXHRcdGVsLmJwID0gdGhpc1xuXG5cdFx0Y29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZWwnLCB7IHZhbHVlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicGxheWVyJykgfSlcblx0XHR0aGlzLl9lbC5icCA9IHRoaXNcblxuXHRcdGNvbnN0IF9yZXNwb25zZSA9IHJlc3BvbnNlLmJpbmQodGhpcy5fZWwpXG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghKC8oc3JjfHRpdGxlfGFydGlzdHxzbGltfGNvdmVyfGNvbG9yfGF1dG9wbGF5fGxvb3B8Y29udHJvbHMpL2kudGVzdChlbC5hdHRyaWJ1dGVzW2ldLm5hbWUpKSkgdGhpcy5fZWwuc2V0QXR0cmlidXRlKGVsLmF0dHJpYnV0ZXNbaV0ubmFtZSwgZWwuYXR0cmlidXRlc1tpXS52YWx1ZSlcblx0XHR9XG5cdFx0dGhpcy5fZWwuY2xhc3NMaXN0LmFkZCgnYlBsYXllcicpXG5cdFx0dGhpcy5fZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgY29udGVudClcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGFuIGF1ZGlvIHRhZ1xuXHRcdGlmIChlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBVURJTycpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2F1ZGlvJywgeyB2YWx1ZTogZWwgfSlcblx0XHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG5cdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLl9hdWRpbylcblx0XHR9IGVsc2UgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfYXVkaW8nLCB7IHZhbHVlOiBuZXcgQXVkaW8oKSB9KVxuXG5cdFx0Ly8gSGlkZSB0aGUgYXVkaW8gZWxlbWVudFxuXHRcdHRoaXMuX2F1ZGlvLmNvbnRyb2xzID0gZmFsc2VcblxuXHRcdC8vIEF0dGFjaCB0byBET01cblx0XHR0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl9hdWRpbylcblx0XHRwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMuX2VsLCBlbClcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3Jlc3BvbnNlKVxuXHRcdF9yZXNwb25zZSgpXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3N0YXR1cycsIHtcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdHByb2dyZXNzZG93bjogZmFsc2UsXG5cdFx0XHRcdHZvbHVtZWRvd246IGZhbHNlXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdC8vIEdldCBhbGwgbmVlZGVkIGVsZW1lbnRzXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZWxzJywge1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0Y292ZXI6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5jb3ZlcmltZ19icGxheWVyJyksXG5cdFx0XHRcdHByb2dyZXNzQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NjdGxfYnBsYXllcicpLFxuXHRcdFx0XHR2b2x1bWVDdGw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVjdGxfYnBsYXllcicpLFxuXHRcdFx0XHR0aXRsZTogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnRpdGxlX2JwbGF5ZXInKSxcblx0XHRcdFx0YXJ0aXN0OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yX2JwbGF5ZXInKSxcblx0XHRcdFx0cGxheWVkOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucGxheWVkX2JwbGF5ZXInKSxcblx0XHRcdFx0Y3VycmVudDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmN1cnJlbnRfYnBsYXllcicpLFxuXHRcdFx0XHRsb2FkZWQ6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZWRfYnBsYXllcicpLFxuXHRcdFx0XHR0b3RhbDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnRvdGFsX2JwbGF5ZXInKSxcblx0XHRcdFx0dm9sdW1lVmFsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudm9sdW1ldmFsX2JwbGF5ZXInKSxcblx0XHRcdFx0cGxheUN0bDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyX2JwbGF5ZXInKSxcblx0XHRcdFx0dm9sdW1lQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjdm9sdW1lQnRuX2JwbGF5ZXInKSxcblx0XHRcdFx0bG9vcEJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI2xvb3BCdG5fYnBsYXllcicpLFxuXHRcdFx0XHRwbGF5QnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGxheUJ0bl9icGxheWVyJyksXG5cdFx0XHRcdHBhdXNlQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGF1c2VCdG5fYnBsYXllcicpXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdGNvbnN0IHtcblx0XHRcdHByb2dyZXNzQ3RsLFxuXHRcdFx0dm9sdW1lQ3RsLFxuXHRcdFx0cGxheWVkLFxuXHRcdFx0Y3VycmVudCxcblx0XHRcdGxvYWRlZCxcblx0XHRcdHRvdGFsLFxuXHRcdFx0dm9sdW1lVmFsLFxuXHRcdFx0dm9sdW1lQnRuLFxuXHRcdFx0cGxheUN0bCxcblx0XHRcdGxvb3BCdG4sXG5cdFx0XHRwbGF5QnRuLFxuXHRcdFx0cGF1c2VCdG5cblx0XHR9ID0gdGhpcy5fZWxzXG5cblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRjb25zdCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRfdGhpcy5fYXVkaW8uY3VycmVudFRpbWUgPSB4IC8gdyAqIF90aGlzLl9hdWRpby5kdXJhdGlvblxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy5wcm9ncmVzc2Rvd24gPSB0cnVlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy5wcm9ncmVzc2Rvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoX3RoaXMuX3N0YXR1cy5wcm9ncmVzc2Rvd24pIHtcblx0XHRcdFx0bGV0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdGxldCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRcdF90aGlzLl9hdWRpby5jdXJyZW50VGltZSA9IHggLyB3ICogX3RoaXMuX2F1ZGlvLmR1cmF0aW9uXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy5wcm9ncmVzc2Rvd24gPSB0cnVlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcblx0XHRcdF90aGlzLl9zdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93bikge1xuXHRcdFx0XHRsZXQgdyA9IHRoaXMuY2xpZW50V2lkdGhcblx0XHRcdFx0bGV0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdF90aGlzLl9hdWRpby5jdXJyZW50VGltZSA9IHggLyB3ICogX3RoaXMuX2F1ZGlvLmR1cmF0aW9uXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0bGV0IHggPSBlLm9mZnNldFggKyAxXG5cdFx0XHRpZiAoeCA+PSAwKSB7XG5cdFx0XHRcdF90aGlzLl9hdWRpby52b2x1bWUgPSB4IC8gODBcblx0XHRcdH1cblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnZvbHVtZWRvd24gPSB0cnVlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcblx0XHRcdF90aGlzLl9zdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnZvbHVtZWRvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG5cdFx0XHRpZiAoX3RoaXMuX3N0YXR1cy52b2x1bWVkb3duKSB7XG5cdFx0XHRcdGxldCB4ID0gZS5vZmZzZXRYICsgMVxuXHRcdFx0XHR0aGlzLl9hdWRpby52b2x1bWUgPSB4IC8gODBcblx0XHRcdH1cblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy52b2x1bWVkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy52b2x1bWVkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuXHRcdFx0aWYgKF90aGlzLl9zdGF0dXMudm9sdW1lZG93bikge1xuXHRcdFx0XHRsZXQgeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyAxXG5cdFx0XHRcdF90aGlzLl9hdWRpby52b2x1bWUgPSB4IC8gODBcblx0XHRcdH1cblx0XHR9KVxuXHRcdHZvbHVtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdF90aGlzLm11dGVkKCFfdGhpcy5tdXRlZCgpKVxuXHRcdH0pXG5cdFx0cGxheUN0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGlmICh0aGlzLl9hdWRpby5wYXVzZWQpIHtcblx0XHRcdFx0X3RoaXMucGxheSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfdGhpcy5wYXVzZSgpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRsb29wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMubG9vcCghX3RoaXMubG9vcCgpKVxuXHRcdH0pXG5cblx0XHRfdGhpcy5fYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheWVkLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jdXJyZW50VGltZSAvIHRoaXMuZHVyYXRpb24gKiAxMDB9JWBcblx0XHRcdGN1cnJlbnQudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuY3VycmVudFRpbWUpXG5cdFx0fSlcblx0XHRfdGhpcy5fYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcblx0XHRcdGxvYWRlZC5zdHlsZS53aWR0aCA9IGAke3RoaXMuYnVmZmVyZWQuZW5kKHRoaXMubGVuZ3RoIC0gMSkgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCd2b2x1bWVjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZvbHVtZVZhbC5zdHlsZS53aWR0aCA9IGAke3RoaXMudm9sdW1lICogODB9cHhgXG5cdFx0fSlcblx0XHRfdGhpcy5fYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHRwYXVzZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cGxheUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHRwYXVzZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW5fYnBsYXllcicpXG5cdFx0XHR0b3RhbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbilcblx0XHR9KVxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcblx0XHRcdGlmICghdGhpcy5sb29wKSB7XG5cdFx0XHRcdHRoaXMucGF1c2UoKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLl9lbCwge1xuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLmRhdGEoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoZGF0YSkge1xuXHRcdFx0XHRcdF90aGlzLmRhdGEoZGF0YSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNsaW06IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5zbGltKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNsaW0pIHtcblx0XHRcdFx0XHRfdGhpcy5zbGltKHNsaW0pXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzcmM6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5zcmMoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoc3JjKSB7XG5cdFx0XHRcdFx0X3RoaXMuc3JjKHNyYylcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvdmVyOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuY292ZXIoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoY292ZXIpIHtcblx0XHRcdFx0XHRfdGhpcy5jb3Zlcihjb3Zlcilcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMudGl0bGUoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQodGl0bGUpIHtcblx0XHRcdFx0XHRfdGhpcy50aXRsZSh0aXRsZSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFydGlzdDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLmFydGlzdCgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChhcnRpc3QpIHtcblx0XHRcdFx0XHRfdGhpcy5hcnRpc3QoYXJ0aXN0KVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29sb3I6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5jb2xvcigpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChjb2xvcikge1xuXHRcdFx0XHRcdF90aGlzLmNvbG9yKGNvbG9yKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dm9sdW1lOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMudm9sdW1lKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHZvbHVtZSkge1xuXHRcdFx0XHRcdF90aGlzLnZvbHVtZSh2b2x1bWUpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtdXRlZDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLm11dGVkKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KG11dGVkKSB7XG5cdFx0XHRcdFx0X3RoaXMubXV0ZWQobXV0ZWQpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRsb29wOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMubG9vcCgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChsb29wKSB7XG5cdFx0XHRcdFx0X3RoaXMubG9vcChsb29wKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YXV0b3BsYXk6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5hdXRvcGxheSgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChhdXRvcGxheSkge1xuXHRcdFx0XHRcdF90aGlzLmF1dG9wbGF5KGF1dG9wbGF5KVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cGF1c2VkOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuX2F1ZGlvLnBhdXNlZFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YWRkTGlzdGVuZXI6IHtcblx0XHRcdFx0dmFsdWU6IF90aGlzLmFkZExpc3RlbmVyXG5cdFx0XHR9LFxuXHRcdFx0cmVtb3ZlTGlzdGVuZXI6IHtcblx0XHRcdFx0dmFsdWU6IF90aGlzLnJlbW92ZUxpc3RlbmVyXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdGlmIChkYXRhW2ldID09PSBudWxsIHx8IHR5cGVvZiBkYXRhW2ldID09PSAndW5kZWZpbmVkJykgZGF0YVtpXSA9IGRlZmF1bHRzW2ldXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cylcblx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB0aGlzW2ldKGRhdGFbaV0pXG5cdH1cblxuXHRkYXRhKGRhdGEpIHtcblx0XHRpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdGlmIChkYXRhW2ldICE9PSBudWxsICYmIHR5cGVvZiBkYXRhW2ldICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdHRoaXNbaV0oZGF0YVtpXSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNyYzogdGhpcy5zcmMoKSxcblx0XHRcdGNvdmVyOiB0aGlzLmNvdmVyKCksXG5cdFx0XHR0aXRsZTogdGhpcy50aXRsZSgpLFxuXHRcdFx0YXJ0aXN0OiB0aGlzLmFydGlzdCgpLFxuXHRcdFx0Y29sb3I6IHRoaXMuY29sb3IoKSxcblx0XHRcdHNsaW06IHRoaXMuc2xpbSgpLFxuXHRcdFx0dm9sdW1lOiB0aGlzLnZvbHVtZSgpLFxuXHRcdFx0bXV0ZWQ6IHRoaXMubXV0ZWQoKVxuXHRcdH1cblx0fVxuXG5cdHNyYyhzcmMpIHtcblx0XHRpZiAodHlwZW9mIHNyYyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2F1ZGlvLnNyYyA9IHNyY1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2F1ZGlvLnNyY1xuXHR9XG5cblx0Y292ZXIoY292ZXIpIHtcblx0XHRpZiAodHlwZW9mIGNvdmVyICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWxzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2NvdmVyfVwiKWBcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbHMuY292ZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlLnNwbGl0KCdcIiknKVswXS5zcGxpdCgndXJsKFwiJylbMV1cblx0fVxuXG5cdHRpdGxlKHRpdGxlKSB7XG5cdFx0aWYgKHR5cGVvZiB0aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2Vscy50aXRsZS50ZXh0Q29udGVudCA9IHRpdGxlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWxzLnRpdGxlLnRleHRDb250ZW50XG5cdH1cblxuXHRhcnRpc3QoYXJ0aXN0KSB7XG5cdFx0aWYgKHR5cGVvZiBhcnRpc3QgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbHMuYXJ0aXN0LnRleHRDb250ZW50ID0gYXJ0aXN0XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWxzLmFydGlzdC50ZXh0Q29udGVudFxuXHR9XG5cblx0Y29sb3IoY29sb3IpIHtcblx0XHRpZiAodHlwZW9mIGNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWxzLnBsYXllZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcdFx0dGhpcy5fZWxzLnZvbHVtZVZhbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2Vscy5wbGF5ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yXG5cdH1cblxuXHRzbGltKHNsaW0pIHtcblx0XHRpZiAodHlwZW9mIHNsaW0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRzbGltID0gISFzbGltXG5cdFx0XHRpZiAoc2xpbSkgdGhpcy5fZWwuY2xhc3NMaXN0LmFkZCgnc2xpbV9iUGxheWVyJylcblx0XHRcdGVsc2UgdGhpcy5fZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2xpbV9iUGxheWVyJylcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKCdzbGltX2JQbGF5ZXInKSAhPT0gLTFcblx0fVxuXG5cdG11dGVkKG11dGVkKSB7XG5cdFx0aWYgKHR5cGVvZiBtdXRlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdG11dGVkID0gISFtdXRlZFxuXHRcdFx0dGhpcy5fYXVkaW8ubXV0ZWQgPSBtdXRlZFxuXHRcdFx0aWYgKG11dGVkKSB0aGlzLl9lbHMudm9sdW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0ZWxzZSB0aGlzLl9lbHMudm9sdW1lQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2F1ZGlvLm11dGVkXG5cdH1cblxuXHR2b2x1bWUodm9sdW1lKSB7XG5cdFx0aWYgKHR5cGVvZiB2b2x1bWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9hdWRpby52b2x1bWUgPSB2b2x1bWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hdWRpby52b2x1bWVcblx0fVxuXG5cdGxvb3AobG9vcCkge1xuXHRcdGlmICh0eXBlb2YgbG9vcCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxvb3AgPSAhIWxvb3Bcblx0XHRcdHRoaXMuX2F1ZGlvLmxvb3AgPSBsb29wXG5cdFx0XHRpZiAobG9vcCkgdGhpcy5fZWxzLmxvb3BCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRlbHNlIHRoaXMuX2Vscy5sb29wQnRuLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2F1ZGlvLmxvb3Bcblx0fVxuXG5cdGF1dG9wbGF5KGF1dG9wbGF5KSB7XG5cdFx0aWYgKHR5cGVvZiBhdXRvcGxheSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGF1dG9wbGF5ID0gISFhdXRvcGxheVxuXHRcdFx0dGhpcy5fYXVkaW8uYXV0b3BsYXkgPSBhdXRvcGxheVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2F1ZGlvLmF1dG9wbGF5XG5cdH1cblxuXHRnZXQgcGF1c2VkKCkge1xuXHRcdHJldHVybiB0aGlzLl9hdWRpby5wYXVzZWRcblx0fVxuXG5cdGFkZExpc3RlbmVyKHR5cGUsIGZuKSB7XG5cdFx0dGhpcy5fYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKSB7XG5cdFx0dGhpcy5fYXVkaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBsYXkoKSB7XG5cdFx0dGhpcy5fYXVkaW8ucGxheSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBhdXNlKCkge1xuXHRcdHRoaXMuX2F1ZGlvLnBhdXNlKClcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Ly8gQXV0b21hdGljYWxseSBjb252ZXJ0IGF1ZGlvIHRhZ3Mgd2l0aCBcImNvbnRyb2xzXCJcblx0Ly8gYXR0cml0dWJlIHRoYXQgaGF2ZSB2YWx1ZSBvZiBcImJwbGF5ZXJcIiBpbnRvIGJQbGF5ZXIuXG5cdHN0YXRpYyBzY2FuKCkge1xuXG5cdFx0LyogZXNsaW50IHtuby1uZXc6IFwib2ZmXCJ9ICovXG5cdFx0Y29uc3QgYXVkaW9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXVkaW8nKVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXVkaW9MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnY29udHJvbHMnKSA9PT0gJ2JwbGF5ZXInKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRcdFx0c3JjOiBhdWRpb0xpc3RbaV0uc3JjLFxuXHRcdFx0XHRcdGxvb3A6IGF1ZGlvTGlzdFtpXS5sb29wLFxuXHRcdFx0XHRcdHRpdGxlOiBhdWRpb0xpc3RbaV0udGl0bGUsXG5cdFx0XHRcdFx0YXV0b3BsYXk6IGF1ZGlvTGlzdFtpXS5hdXRvcGxheSxcblx0XHRcdFx0XHRzbGltOiBKU09OLnBhcnNlKGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ3NsaW0nKSksXG5cdFx0XHRcdFx0Y292ZXI6IGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ2NvdmVyJyksXG5cdFx0XHRcdFx0Y29sb3I6IGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ2NvbG9yJyksXG5cdFx0XHRcdFx0YXJ0aXN0OiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdhcnRpc3QnKVxuXHRcdFx0XHR9XG5cdFx0XHRcdG5ldyBiUGxheWVyKGF1ZGlvTGlzdFtpXSwgZGF0YSlcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gYlBsYXllclxufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCgpID0+IGJQbGF5ZXIpXG59IGVsc2Uge1xuXHR3aW5kb3cuYlBsYXllciA9IGJQbGF5ZXJcbn1cblxuLy8gU2hvdyBpbmZvcm1hdGlvbiB3aGVuIGJQbGF5ZXIgbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbmluZm8oYGJQbGF5ZXIgdiR7VkVSU0lPTn0gbG9hZGVkIWApXG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsImlzT2JqZWN0IiwicmVxdWlyZSQkMSIsImRvY3VtZW50IiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJkUCIsImdsb2JhbCIsIiRleHBvcnQiLCJJT2JqZWN0IiwidG9JbnRlZ2VyIiwibWluIiwidG9JT2JqZWN0IiwiZGVmaW5lZCIsInJlcXVpcmUkJDUiLCJyZXF1aXJlJCQ0IiwiYW5PYmplY3QiLCJnZXRLZXlzIiwiZGVmaW5lUHJvcGVydGllcyIsIiRPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImFwcE5hbWUiLCJpbmZvIiwiY29uc29sZSIsImJpbmQiLCJ3YXJuIiwid2luZG93IiwiYnBzIiwiY3NzIiwiZGVmYXVsdHMiLCJyZXNwb25zZSIsImNsaWVudFdpZHRoIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZm9ybWF0VGltZSIsInNlYyIsImhvdXJzIiwiTWF0aCIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJocyIsIm1zIiwic3MiLCJkYXRhIiwiaSIsInNyYyIsImNvdmVyIiwidGl0bGUiLCJhcnRpc3QiLCJjb2xvciIsInNsaW0iLCJ2b2x1bWUiLCJtdXRlZCIsIl9hdWRpbyIsIl9lbHMiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInNwbGl0IiwidGV4dENvbnRlbnQiLCJwbGF5ZWQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2b2x1bWVWYWwiLCJfZWwiLCJjbGFzc05hbWUiLCJpbmRleE9mIiwidm9sdW1lQnRuIiwibG9vcCIsImxvb3BCdG4iLCJhdXRvcGxheSIsInR5cGUiLCJmbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGxheSIsInBhdXNlIiwicGF1c2VkIiwiYlBsYXllciIsImVsIiwiX3RoaXMiLCJFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImJwIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInZhbHVlIiwiY3JlYXRlRWxlbWVudCIsIl9yZXNwb25zZSIsImF0dHJpYnV0ZXMiLCJsZW5ndGgiLCJ0ZXN0IiwibmFtZSIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsImNvbnRlbnQiLCJ0YWdOYW1lIiwidG9VcHBlckNhc2UiLCJjcmVhdGVUZXh0Tm9kZSIsImluc2VydEJlZm9yZSIsIk9iamVjdCIsIkF1ZGlvIiwiY29udHJvbHMiLCJhcHBlbmRDaGlsZCIsInJlcGxhY2VDaGlsZCIsInByb2dyZXNzQ3RsIiwidm9sdW1lQ3RsIiwiY3VycmVudCIsImxvYWRlZCIsInRvdGFsIiwicGxheUN0bCIsInBsYXlCdG4iLCJwYXVzZUJ0biIsImUiLCJ3IiwieCIsIm9mZnNldFgiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwiX3N0YXR1cyIsInByb2dyZXNzZG93biIsInRvdWNoZXMiLCJwYWdlWCIsInRhcmdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ2b2x1bWVkb3duIiwid2lkdGgiLCJidWZmZXJlZCIsImVuZCIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJhdWRpb0xpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0QXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmluZSIsImFtZCIsIlZFUlNJT04iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxNQUFNLEdBQUcsY0FBYyxHQUFHLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUk7SUFDN0UsTUFBTSxHQUFHLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsUUFB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
