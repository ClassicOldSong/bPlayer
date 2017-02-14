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

var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

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

var defined$1 = _defined;
var _toObject = function(it){
  return Object(defined$1(it));
};

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

var core$1  = _core;
var $JSON = core$1.JSON || (core$1.JSON = {stringify: JSON.stringify});
var stringify$1 = function stringify$1(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify = createCommonjsModule(function (module) {
module.exports = { "default": stringify$1, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify);

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

var style = "<style>\n\t.iconfont_bplayer {\n\t\tfont-family:\"iconfont_bplayer\";\n\t\tfont-style:normal;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-webkit-text-stroke-width: 0.2px;\n\t}\n\n\t.bPlayer {\n\t\tbox-sizing: border-box;\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tfont-family:\n\t\t\tHelvetica, Tahoma, Arial, \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", STXihei, STHeiti, Heiti, SimSun, sans-serif;\n\t\twidth: 100%;\n\t\theight: 60px;\n\t\tbackground-color: #FFF;\n\t\tcursor: default;\n\t\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\t\t-webkit-touch-callout: none;\n\t\t-webkit-user-select: none;\n\t\t-khtml-user-select: none;\n\t\t-moz-user-select: none;\n\t\t-ms-user-select: none;\n\t\tuser-select: none;\n\t}\n\n\t.cover_bplayer {\n\t\tbackground-color: #CCC;\n\t\theight: 60px;\n\t\twidth: 60px;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t}\n\t.cover_bplayer:before {\n\t\tcontent: \"\\e605\";\n\t\tfont-family:\"iconfont_bplayer\";\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tline-height: 60px;\n\t\ttext-align: center;\n\t\tfont-size: 40px;\n\t\tcolor: #FFF;\n\t}\n\n\t.coverimg_bplayer {\n\t\tposition: absolute;\n\t\tbackground-size: cover;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t}\n\n\t.controlbtn_bplayer {\n\t\tposition: absolute;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tline-height: 60px;\n\t\ttext-align: center;\n\t\tfont-size: 40px;\n\t\tcolor: #FFF;\n\t\tbackground-color: rgba(0,0,0,0.27);\n\t\topacity: 0;\n\t\tdisplay: block;\n\t\ttransition: opacity 500ms;\n\t}\n\t.controlbtn_bplayer.playBtn_bplayer {\n\t\topacity: 0.8;\n\t}\n\t.controlbtn_bplayer:hover {\n\t\topacity: 1;\n\t}\n\n\t.info_bplayer {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tright: 0;\n\t\theight: 60px;\n\t\twidth: 100%;\n\t}\n\n\t.titlewrap_bplayer {\n\t\tpadding-left: 72px;\n\t\tpadding-right: 140px;\n\t\tline-height: 60px;\n\t\theight: 60px;\n\t\tfont-size: 20px;\n\t\twhite-space: nowrap;\n\t\ttext-align: left;\n\t\ttext-overflow: ellipsis;\n\t\toverflow: hidden;\n\t}\n\n\t.author_bplayer {\n\t\tfont-size: 80%;\n\t\topacity: 0.8;\n\t}\n\t.author_bplayer:before {\n\t\tcontent: \" - \";\n\t}\n\n\t.buttons_bplayer {\n\t\tposition: absolute;\n\t\ttop: 20px;\n\t\tfont-size: 16px;\n\t\tright: 0;\n\t}\n\t.btn_bplayer {\n\t\theight: 20px;\n\t\twidth: 20px;\n\t\tline-height: 20px;\n\t\ttext-align: center;\n\t\tmargin-right: 8px;\n\t\tfloat: right;\n\t\topacity: 1;\n\t\ttransition: opacity 500ms;\n\t}\n\n\t.progress_bplayer {\n\t\tposition: absolute;\n\t\tbottom: 0;\n\t\theight: 2px;\n\t\twidth: 100%;\n\t\ttransition: height 500ms;\n\t}\n\t.progress_bplayer:hover {\n\t\theight: 6px;\n\t}\n\t.loaded_bplayer {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\theight: 100%;\n\t\twidth: 0;\n\t\tbackground-color: #AAA;\n\t\ttransition: width 300ms linear;\n\t}\n\t.played_bplayer {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\theight: 100%;\n\t\twidth: 0;\n\t\tbackground-color: #A91212;\n\t\ttransition: width 100ms linear;\n\t}\n\t.progressctl_bplayer {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t}\n\n\t.time_bplayer {\n\t\tposition: absolute;\n\t\ttop: 20px;\n\t\tright: 65px;\n\t\tline-height: 20px;\n\t\tfont-size: 12px;\n\t}\n\t.total_bplayer:before {\n\t\tcontent: \" / \";\n\t}\n\n\t.volume_bplayer {\n\t\tposition: relative;\n\t\tline-height: 20px;\n\t\theight: 20px;\n\t\twidth: 20px;\n\t\tfloat: right;\n\t\tmargin-right: 8px;\n\t\toverflow: hidden;\n\t\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\t\tbackground-color: #FFF;\n\t\ttransition: box-shadow 500ms, width 500ms;\n\t}\n\t.volume_bplayer:hover {\n\t\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\t\twidth: 105px;\n\t}\n\t.volumebtn_bplayer {\n\t\tfloat: right;\n\t\tmargin: 0;\n\t}\n\t.volumebar_bplayer {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tright: 20px;\n\t\theight: 20px;\n\t\twidth: 85px;\n\t}\n\t.volumebg_bplayer {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 80px;\n\t\tmargin: 8px 0 8px 5px;\n\t\theight: 4px;\n\t\tbackground-color: #AAA;\n\t}\n\t.volumeval_bplayer {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 80px;\n\t\tmargin: 8px 0 8px 5px;\n\t\theight: 4px;\n\t\tbackground-color: #A91212;\n\t}\n\t.volumectl_bplayer {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 80px;\n\t\tmargin-left: 5px;\n\t\theight: 20px;\n\t}\n\n\n\t.disabled_bplayer {\n\t\topacity: 0.2;\n\t}\n\n\t.hidden_bplayer {\n\t\topacity: 0;\n\t\tdisplay: none;\n\t}\n\n\t.narrow_bplayer .buttons_bplayer {\n\t\ttop: 35px;\n\t}\n\t.narrow_bplayer .time_bplayer {\n\t\ttop: 35px;\n\t}\n\n\t.narrow_bplayer .titlewrap_bplayer {\n\t\tpadding-right: 0;\n\t\tline-height: 40px;\n\t\tfont-size: 16px;\n\t}\n\n\n\t/* Section for bPayer_slim */\n\t.bPlayer.slim_bPlayer {\n\t\theight: 30px;\n\t}\n\n\t.slim_bPlayer .cover_bplayer {\n\t\theight: 30px;\n\t\twidth: 30px;\n\t}\n\t.slim_bPlayer .cover_bplayer:before {\n\t\tline-height: 30px;\n\t\tfont-size: 20px;\n\t}\n\n\t.slim_bPlayer .controlbtn_bplayer {\n\t\tline-height: 30px;\n\t\tfont-size: 20px;\n\t}\n\n\t.slim_bPlayer .info_bplayer {\n\t\theight: 30px;\n\t}\n\n\t.slim_bPlayer .titlewrap_bplayer {\n\t\tpadding-left: 38px;\n\t\tpadding-right: 140px;\n\t\tline-height: 30px;\n\t\theight: 30px;\n\t\tfont-size: 16px;\n\t}\n\n\t.slim_bPlayer .buttons_bplayer {\n\t\ttop: 0;\n\t\theight: 30px;\n\t}\n\t.slim_bPlayer .btn_bplayer {\n\t\theight: 30px;\n\t\tline-height: 30px;\n\t}\n\n\t.slim_bPlayer .time_bplayer {\n\t\ttop: 0;\n\t\theight: 30px;\n\t\tline-height: 30px;\n\t}\n\n\t.slim_bPlayer .volume_bplayer {\n\t\theight: 30px;\n\t\ttransition: width 500ms;\n\t}\n\t.slim_bPlayer .volume_bplayer:hover {\n\t\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\t\twidth: 105px;\n\t}\n\t.slim_bPlayer .volumebar_bplayer {\n\t\theight: 30px;\n\t}\n\t.slim_bPlayer .volumebg_bplayer {\n\t\tmargin: 13px 0 13px 5px;\n\t}\n\t.slim_bPlayer .volumeval_bplayer {\n\t\tmargin: 13px 0 13px 5px;\n\t}\n\t.slim_bPlayer .volumectl_bplayer {\n\t\theight: 30px;\n\t}\n</style>\n";

var css = __$styleInject("@font-face {\n\tfont-family: 'iconfont_bplayer';  /* project id 67267 */\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot');\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot?#iefix') format('embedded-opentype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.woff') format('woff'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.ttf') format('truetype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.svg#iconfont') format('svg');\n}\n\nbplayer {\n\tdisplay: block;\n}\n", undefined);

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
				this[i] = _data[i];
			}
		}
		return this;
	}
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

		if (el.bPlayer instanceof bPlayer) return warn('This element has already been attached!');

		el.bPlayer = this;

		if (el.tagName === 'AUDIO') {
			this._audio = el;
			el = document.createElement('bplayer');
			for (var i = 0; i < this._audio.attributes.length; i++) {
				if (!/(src|artist|slim|cover|color|autoplay|loop)/i.test(this._audio.attributes[i].name)) el.setAttribute(this._audio.attributes[i].name, this._audio.attributes[i].value);
			}
			this._audio.parentNode.insertBefore(el, this._audio);
		} else this._audio = new Audio();

		this._el = document.createElement('div');
		this._el.classList.add('bPlayer');
		this._el.innerHTML = content + style;

		this._status = {
			progressdown: false,
			volumedown: false
		};

		this._els = {
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


		window.addEventListener('resize', function () {
			return response.call(_this2._el);
		});
		progressCtl.addEventListener('click', function (e) {
			var w = this.clientWidth;
			var x = e.offsetX;
			try {
				_this._audio.currentTime = x / w * _this._audio.duration;
			} catch (err) {
				_JSON$stringify(err);
			}
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
				try {
					_this._audio.currentTime = x / w * _this._audio.duration;
				} catch (err) {
					_JSON$stringify(err);
				}
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
				try {
					_this._audio.currentTime = x / w * _this._audio.duration;
				} catch (err) {
					_JSON$stringify(err);
				}
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
				try {
					_this2._audio.volume = x / 80;
				} catch (err) {
					_JSON$stringify(err);
				}
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
				try {
					_this._audio.volume = x / 80;
				} catch (err) {
					_JSON$stringify(err);
				}
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
			try {
				loaded.style.width = this.buffered.end(this.length - 1) / this.duration * 100 + '%';
				total.textContent = formatTime(this.duration);
			} catch (err) {
				_JSON$stringify(err);
			}
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

		_Object$defineProperties(el, {
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

		el.appendChild(this._audio);
		var shadow = el.createShadowRoot();
		shadow.appendChild(this._el);

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

info('bPlayer v' + "1.0.0-alpha.dev.edff826" + ' loaded!');

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwiLi4vc3JjL2RlYnVnLmpzIiwiLi4vc3JjL2JwbGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnRpZXM6IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKX0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydGllcycpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKFQsIEQpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFQsIEQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwidmFyIGNvcmUgID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpXG4gICwgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHtzdHJpbmdpZnk6IEpTT04uc3RyaW5naWZ5fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhcHBOYW1lID0gJ1tCUF0nXG5jb25zdCBpbmZvID0gY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSwgYXBwTmFtZSlcbmNvbnN0IHdhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlLCBhcHBOYW1lKVxuXG5leHBvcnQgeyBpbmZvLCB3YXJuIH1cbiIsIi8qIGdsb2JhbCBWRVJTSU9OIGRlZmluZSovXG4ndXNlIHN0cmljdCdcblxuLy8gSW1wb3J0IGV2ZXJ5dGhpbmdcbmltcG9ydCBjb250ZW50IGZyb20gJy4vYnBsYXllci5odG1sJ1xuaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUuaHRtbCdcbmltcG9ydCBjc3MgZnJvbSAnLi9icGxheWVyLmNzcydcbmltcG9ydCB7IGluZm8sIHdhcm4gfSBmcm9tICcuL2RlYnVnLmpzJ1xuXG53aW5kb3cuYnBzID0gY3NzXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXHRzcmM6ICcnLFxuXHRjb3ZlcjogJycsXG5cdHRpdGxlOiAnVW5rbm93bicsXG5cdGFydGlzdDogJ1Vua25vd24nLFxuXHRjb2xvcjogJyNBOTEyMTInLFxuXHR2b2x1bWU6IDEsXG5cdG11dGVkOiBmYWxzZSxcblx0YXV0b3BsYXk6IGZhbHNlLFxuXHRsb29wOiBmYWxzZSxcblx0c2xpbTogZmFsc2Vcbn1cblxuY29uc3QgcmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMuY2xpZW50V2lkdGggPD0gNDYwKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKFwibmFycm93X2JwbGF5ZXJcIilcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXJyb3dfYnBsYXllclwiKVxuXHR9XG59XG5cbmNvbnN0IGZvcm1hdFRpbWUgPSBmdW5jdGlvbiAoc2VjKSB7XG5cdGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWMgLyAzNjAwKVxuXHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjIC0gKGhvdXJzICogMzYwMCkpIC8gNjApXG5cdGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHNlYyAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCkpXG5cblx0bGV0IGhzID0gYCR7aG91cnN9OmBcblx0bGV0IG1zID0gYCR7bWludXRlc306YFxuXHRsZXQgc3MgPSBgJHtzZWNvbmRzfWBcblxuXHRpZiAoaG91cnMgPCAxMCkgaHMgPSBgMCR7aG91cnN9OmBcblx0aWYgKG1pbnV0ZXMgPCAxMCkgbXMgPSBgMCR7bWludXRlc306YFxuXHRpZiAoc2Vjb25kcyA8IDEwKSBzcyA9IGAwJHtzZWNvbmRzfWBcblx0aWYgKGhvdXJzIDw9IDApIGhzID0gJydcblx0cmV0dXJuIGAke2hzfSR7bXN9JHtzc31gXG59XG5cbmNvbnN0IGJQbGF5ZXIgPSBjbGFzcyB7XG5cdGNvbnN0cnVjdG9yKGVsLCBkYXRhKSB7XG5cblx0XHQvKiBlc2xpbnQge2NvbnNpc3RlbnQtdGhpczogXCJvZmZcIn0gKi9cblx0XHRjb25zdCBfdGhpcyA9IHRoaXNcblxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIHR1cm5lZCBpbnRvIGJQbGF5ZXJcblx0XHRpZiAoZWwuYlBsYXllciBpbnN0YW5jZW9mIGJQbGF5ZXIpIHJldHVybiB3YXJuKCdUaGlzIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBhdHRhY2hlZCEnKVxuXG5cdFx0Ly8gTWFyayB0aGUgZWxlbWVudCBpbmNhc2UgYmluZCBhZ2FpblxuXHRcdGVsLmJQbGF5ZXIgPSB0aGlzXG5cblx0XHQvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBpcyBhbiBhdWRpbyB0YWdcblx0XHRpZiAoZWwudGFnTmFtZSA9PT0gJ0FVRElPJykge1xuXHRcdFx0dGhpcy5fYXVkaW8gPSBlbFxuXHRcdFx0ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicGxheWVyJylcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXVkaW8uYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoISgvKHNyY3xhcnRpc3R8c2xpbXxjb3Zlcnxjb2xvcnxhdXRvcGxheXxsb29wKS9pLnRlc3QodGhpcy5fYXVkaW8uYXR0cmlidXRlc1tpXS5uYW1lKSkpIGVsLnNldEF0dHJpYnV0ZSh0aGlzLl9hdWRpby5hdHRyaWJ1dGVzW2ldLm5hbWUsIHRoaXMuX2F1ZGlvLmF0dHJpYnV0ZXNbaV0udmFsdWUpXG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hdWRpby5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGhpcy5fYXVkaW8pXG5cdFx0fSBlbHNlIHRoaXMuX2F1ZGlvID0gbmV3IEF1ZGlvKClcblxuXHRcdHRoaXMuX2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHR0aGlzLl9lbC5jbGFzc0xpc3QuYWRkKCdiUGxheWVyJylcblx0XHR0aGlzLl9lbC5pbm5lckhUTUwgPSAoY29udGVudCArIHN0eWxlKVxuXG5cdFx0dGhpcy5fc3RhdHVzID0ge1xuXHRcdFx0cHJvZ3Jlc3Nkb3duOiBmYWxzZSxcblx0XHRcdHZvbHVtZWRvd246IGZhbHNlXG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGFsbCBuZWVkZWQgZWxlbWVudHNcblx0XHR0aGlzLl9lbHMgPSB7XG5cdFx0XHRjb3ZlcjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyaW1nX2JwbGF5ZXInKSxcblx0XHRcdHByb2dyZXNzQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NjdGxfYnBsYXllcicpLFxuXHRcdFx0dm9sdW1lQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lY3RsX2JwbGF5ZXInKSxcblx0XHRcdHRpdGxlOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudGl0bGVfYnBsYXllcicpLFxuXHRcdFx0YXJ0aXN0OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yX2JwbGF5ZXInKSxcblx0XHRcdHBsYXllZDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnBsYXllZF9icGxheWVyJyksXG5cdFx0XHRjdXJyZW50OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudF9icGxheWVyJyksXG5cdFx0XHRsb2FkZWQ6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZWRfYnBsYXllcicpLFxuXHRcdFx0dG90YWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy50b3RhbF9icGxheWVyJyksXG5cdFx0XHR2b2x1bWVWYWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWV2YWxfYnBsYXllcicpLFxuXHRcdFx0cGxheUN0bDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyX2JwbGF5ZXInKSxcblx0XHRcdHZvbHVtZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3ZvbHVtZUJ0bl9icGxheWVyJyksXG5cdFx0XHRsb29wQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjbG9vcEJ0bl9icGxheWVyJyksXG5cdFx0XHRwbGF5QnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGxheUJ0bl9icGxheWVyJyksXG5cdFx0XHRwYXVzZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3BhdXNlQnRuX2JwbGF5ZXInKVxuXHRcdH1cblxuXHRcdGNvbnN0IHtcblx0XHRcdHByb2dyZXNzQ3RsLFxuXHRcdFx0dm9sdW1lQ3RsLFxuXHRcdFx0cGxheWVkLFxuXHRcdFx0Y3VycmVudCxcblx0XHRcdGxvYWRlZCxcblx0XHRcdHRvdGFsLFxuXHRcdFx0dm9sdW1lVmFsLFxuXHRcdFx0dm9sdW1lQnRuLFxuXHRcdFx0cGxheUN0bCxcblx0XHRcdGxvb3BCdG4sXG5cdFx0XHRwbGF5QnRuLFxuXHRcdFx0cGF1c2VCdG5cblx0XHR9ID0gdGhpcy5fZWxzXG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gcmVzcG9uc2UuY2FsbCh0aGlzLl9lbCkpXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRjb25zdCB3ID0gdGhpcy5jbGllbnRXaWR0aFxuXHRcdFx0Y29uc3QgeCA9IGUub2Zmc2V0WFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0X3RoaXMuX2F1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBfdGhpcy5fYXVkaW8uZHVyYXRpb25cblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRKU09OLnN0cmluZ2lmeShlcnIpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcblx0XHRcdF90aGlzLl9zdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93bikge1xuXHRcdFx0XHRsZXQgdyA9IHRoaXMuY2xpZW50V2lkdGhcblx0XHRcdFx0bGV0IHggPSBlLm9mZnNldFhcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRfdGhpcy5fYXVkaW8uY3VycmVudFRpbWUgPSB4IC8gdyAqIF90aGlzLl9hdWRpby5kdXJhdGlvblxuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRKU09OLnN0cmluZ2lmeShlcnIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnByb2dyZXNzZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy5wcm9ncmVzc2Rvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKF90aGlzLl9zdGF0dXMucHJvZ3Jlc3Nkb3duKSB7XG5cdFx0XHRcdGxldCB3ID0gdGhpcy5jbGllbnRXaWR0aFxuXHRcdFx0XHRsZXQgeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRfdGhpcy5fYXVkaW8uY3VycmVudFRpbWUgPSB4IC8gdyAqIF90aGlzLl9hdWRpby5kdXJhdGlvblxuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRKU09OLnN0cmluZ2lmeShlcnIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRsZXQgeCA9IGUub2Zmc2V0WCArIDFcblx0XHRcdGlmICh4ID49IDApIHtcblx0XHRcdFx0X3RoaXMuX2F1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHRcdF90aGlzLl9zdGF0dXMudm9sdW1lZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMuX3N0YXR1cy52b2x1bWVkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcblx0XHRcdF90aGlzLl9zdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcblx0XHRcdGlmIChfdGhpcy5fc3RhdHVzLnZvbHVtZWRvd24pIHtcblx0XHRcdFx0bGV0IHggPSBlLm9mZnNldFggKyAxXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhpcy5fYXVkaW8udm9sdW1lID0geCAvIDgwXG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnZvbHVtZWRvd24gPSB0cnVlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5fc3RhdHVzLnZvbHVtZWRvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XG5cdFx0XHRpZiAoX3RoaXMuX3N0YXR1cy52b2x1bWVkb3duKSB7XG5cdFx0XHRcdGxldCB4ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIDFcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRfdGhpcy5fYXVkaW8udm9sdW1lID0geCAvIDgwXG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0X3RoaXMubXV0ZWQoIV90aGlzLm11dGVkKCkpXG5cdFx0fSlcblx0XHRwbGF5Q3RsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX2F1ZGlvLnBhdXNlZCkge1xuXHRcdFx0XHRfdGhpcy5wbGF5KClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF90aGlzLnBhdXNlKClcblx0XHRcdH1cblx0XHR9KVxuXHRcdGxvb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRfdGhpcy5sb29wKCFfdGhpcy5sb29wKCkpXG5cdFx0fSlcblxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRwbGF5ZWQuc3R5bGUud2lkdGggPSBgJHt0aGlzLmN1cnJlbnRUaW1lIC8gdGhpcy5kdXJhdGlvbiAqIDEwMH0lYFxuXHRcdFx0Y3VycmVudC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUodGhpcy5jdXJyZW50VGltZSlcblx0XHR9KVxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bG9hZGVkLnN0eWxlLndpZHRoID0gYCR7dGhpcy5idWZmZXJlZC5lbmQodGhpcy5sZW5ndGggLSAxKSAvIHRoaXMuZHVyYXRpb24gKiAxMDB9JWBcblx0XHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0SlNPTi5zdHJpbmdpZnkoZXJyKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0X3RoaXMuX2F1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3ZvbHVtZWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dm9sdW1lVmFsLnN0eWxlLndpZHRoID0gYCR7dGhpcy52b2x1bWUgKiA4MH1weGBcblx0XHR9KVxuXHRcdF90aGlzLl9hdWRpby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRwbGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbl9icGxheWVyJylcblx0XHRcdHBhdXNlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbl9icGxheWVyJylcblx0XHRcdHRvdGFsLnRleHRDb250ZW50ID0gZm9ybWF0VGltZSh0aGlzLmR1cmF0aW9uKVxuXHRcdH0pXG5cdFx0X3RoaXMuX2F1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRwbGF5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbl9icGxheWVyJylcblx0XHRcdHBhdXNlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbl9icGxheWVyJylcblx0XHRcdHRvdGFsLnRleHRDb250ZW50ID0gZm9ybWF0VGltZSh0aGlzLmR1cmF0aW9uKVxuXHRcdH0pXG5cdFx0X3RoaXMuX2F1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmxvb3ApIHtcblx0XHRcdFx0dGhpcy5wYXVzZSgpXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGVsLCB7XG5cdFx0XHRzbGltOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuc2xpbSgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChzbGltKSB7XG5cdFx0XHRcdFx0X3RoaXMuc2xpbShzbGltKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c3JjOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuc3JjKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNyYykge1xuXHRcdFx0XHRcdF90aGlzLnNyYyhzcmMpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjb3Zlcjoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLmNvdmVyKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGNvdmVyKSB7XG5cdFx0XHRcdFx0X3RoaXMuY292ZXIoY292ZXIpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLnRpdGxlKClcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHRpdGxlKSB7XG5cdFx0XHRcdFx0X3RoaXMudGl0bGUodGl0bGUpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhcnRpc3Q6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5hcnRpc3QoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXJ0aXN0KSB7XG5cdFx0XHRcdFx0X3RoaXMuYXJ0aXN0KGFydGlzdClcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvbG9yOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuY29sb3IoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoY29sb3IpIHtcblx0XHRcdFx0XHRfdGhpcy5jb2xvcihjb2xvcilcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHZvbHVtZToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLnZvbHVtZSgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldCh2b2x1bWUpIHtcblx0XHRcdFx0XHRfdGhpcy52b2x1bWUodm9sdW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bXV0ZWQ6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5tdXRlZCgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChtdXRlZCkge1xuXHRcdFx0XHRcdF90aGlzLm11dGVkKG11dGVkKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bG9vcDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLmxvb3AoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQobG9vcCkge1xuXHRcdFx0XHRcdF90aGlzLmxvb3AobG9vcClcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGF1dG9wbGF5OiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuYXV0b3BsYXkoKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXV0b3BsYXkpIHtcblx0XHRcdFx0XHRfdGhpcy5hdXRvcGxheShhdXRvcGxheSlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHBhdXNlZDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLl9hdWRpby5wYXVzZWRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFkZExpc3RlbmVyOiB7XG5cdFx0XHRcdHZhbHVlOiBfdGhpcy5hZGRMaXN0ZW5lclxuXHRcdFx0fSxcblx0XHRcdHJlbW92ZUxpc3RlbmVyOiB7XG5cdFx0XHRcdHZhbHVlOiBfdGhpcy5yZW1vdmVMaXN0ZW5lclxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRlbC5hcHBlbmRDaGlsZCh0aGlzLl9hdWRpbylcblx0XHRjb25zdCBzaGFkb3cgPSBlbC5jcmVhdGVTaGFkb3dSb290KClcblx0XHRzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5fZWwpXG5cblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBkZWZhdWx0cykge1xuXHRcdFx0XHRpZiAoZGF0YVtpXSA9PT0gbnVsbCB8fCB0eXBlb2YgZGF0YVtpXSA9PT0gJ3VuZGVmaW5lZCcpIGRhdGFbaV0gPSBkZWZhdWx0c1tpXVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpXG5cdFx0Zm9yIChsZXQgaSBpbiBkZWZhdWx0cykgdGhpc1tpXShkYXRhW2ldKVxuXHR9XG5cblx0ZGF0YShkYXRhKSB7XG5cdFx0aWYgKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBkZWZhdWx0cykge1xuXHRcdFx0XHRpZiAoZGF0YVtpXSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR0aGlzW2ldID0gZGF0YVtpXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0c3JjOiB0aGlzLnNyYyxcblx0XHRcdGNvdmVyOiB0aGlzLmNvdmVyLFxuXHRcdFx0dGl0bGU6IHRoaXMudGl0bGUsXG5cdFx0XHRhcnRpc3Q6IHRoaXMuYXJ0aXN0LFxuXHRcdFx0Y29sb3I6IHRoaXMuY29sb3IsXG5cdFx0XHRzbGltOiB0aGlzLnNsaW0sXG5cdFx0XHR2b2x1bWU6IHRoaXMudm9sdW1lLFxuXHRcdFx0bXV0ZWQ6IHRoaXMubXV0ZWRcblx0XHR9XG5cdH1cblxuXHRzcmMoc3JjKSB7XG5cdFx0aWYgKHR5cGVvZiBzcmMgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9hdWRpby5zcmMgPSBzcmNcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hdWRpby5zcmNcblx0fVxuXG5cdGNvdmVyKGNvdmVyKSB7XG5cdFx0aWYgKHR5cGVvZiBjb3ZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2Vscy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtjb3Zlcn1cIilgXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWxzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZS5zcGxpdCgnXCIpJylbMF0uc3BsaXQoJ3VybChcIicpWzFdXG5cdH1cblxuXHR0aXRsZSh0aXRsZSkge1xuXHRcdGlmICh0eXBlb2YgdGl0bGUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbHMudGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2Vscy50aXRsZS50ZXh0Q29udGVudFxuXHR9XG5cblx0YXJ0aXN0KGFydGlzdCkge1xuXHRcdGlmICh0eXBlb2YgYXJ0aXN0ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWxzLmFydGlzdC50ZXh0Q29udGVudCA9IGFydGlzdFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2Vscy5hcnRpc3QudGV4dENvbnRlbnRcblx0fVxuXG5cdGNvbG9yKGNvbG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBjb2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2Vscy5wbGF5ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XHRcdHRoaXMuX2Vscy52b2x1bWVWYWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbHMucGxheWVkLnN0eWxlLmJhY2tncm91bmRDb2xvclxuXHR9XG5cblx0c2xpbShzbGltKSB7XG5cdFx0aWYgKHR5cGVvZiBzbGltICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0c2xpbSA9ICEhc2xpbVxuXHRcdFx0aWYgKHNsaW0pIHRoaXMuX2VsLmNsYXNzTGlzdC5hZGQoJ3NsaW1fYlBsYXllcicpXG5cdFx0XHRlbHNlIHRoaXMuX2VsLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaW1fYlBsYXllcicpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZignc2xpbV9iUGxheWVyJykgIT09IC0xXG5cdH1cblxuXHRtdXRlZChtdXRlZCkge1xuXHRcdGlmICh0eXBlb2YgbXV0ZWQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRtdXRlZCA9ICEhbXV0ZWRcblx0XHRcdHRoaXMuX2F1ZGlvLm11dGVkID0gbXV0ZWRcblx0XHRcdGlmIChtdXRlZCkgdGhpcy5fZWxzLnZvbHVtZUJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdGVsc2UgdGhpcy5fZWxzLnZvbHVtZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hdWRpby5tdXRlZFxuXHR9XG5cblx0dm9sdW1lKHZvbHVtZSkge1xuXHRcdGlmICh0eXBlb2Ygdm9sdW1lICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fYXVkaW8udm9sdW1lID0gdm9sdW1lXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fYXVkaW8udm9sdW1lXG5cdH1cblxuXHRsb29wKGxvb3ApIHtcblx0XHRpZiAodHlwZW9mIGxvb3AgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsb29wID0gISFsb29wXG5cdFx0XHR0aGlzLl9hdWRpby5sb29wID0gbG9vcFxuXHRcdFx0aWYgKGxvb3ApIHRoaXMuX2Vscy5sb29wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0ZWxzZSB0aGlzLl9lbHMubG9vcEJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hdWRpby5sb29wXG5cdH1cblxuXHRhdXRvcGxheShhdXRvcGxheSkge1xuXHRcdGlmICh0eXBlb2YgYXV0b3BsYXkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRhdXRvcGxheSA9ICEhYXV0b3BsYXlcblx0XHRcdHRoaXMuX2F1ZGlvLmF1dG9wbGF5ID0gYXV0b3BsYXlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hdWRpby5hdXRvcGxheVxuXHR9XG5cblx0Z2V0IHBhdXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fYXVkaW8ucGF1c2VkXG5cdH1cblxuXHRhZGRMaXN0ZW5lcih0eXBlLCBmbikge1xuXHRcdHRoaXMuX2F1ZGlvLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRyZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuXHRcdHRoaXMuX2F1ZGlvLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRwbGF5KCkge1xuXHRcdHRoaXMuX2F1ZGlvLnBsYXkoKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRwYXVzZSgpIHtcblx0XHR0aGlzLl9hdWRpby5wYXVzZSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdC8vIEF1dG9tYXRpY2FsbHkgY29udmVydCBhdWRpbyB0YWdzIHdpdGggXCJjb250cm9sc1wiXG5cdC8vIGF0dHJpdHViZSB0aGF0IGhhdmUgdmFsdWUgb2YgXCJicGxheWVyXCIgaW50byBiUGxheWVyLlxuXHRzdGF0aWMgc2NhbigpIHtcblxuXHRcdC8qIGVzbGludCB7bm8tbmV3OiBcIm9mZlwifSAqL1xuXHRcdGNvbnN0IGF1ZGlvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2F1ZGlvJylcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF1ZGlvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJykgPT09ICdicGxheWVyJykge1xuXHRcdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHRcdHNyYzogYXVkaW9MaXN0W2ldLnNyYyxcblx0XHRcdFx0XHRsb29wOiBhdWRpb0xpc3RbaV0ubG9vcCxcblx0XHRcdFx0XHR0aXRsZTogYXVkaW9MaXN0W2ldLnRpdGxlLFxuXHRcdFx0XHRcdGF1dG9wbGF5OiBhdWRpb0xpc3RbaV0uYXV0b3BsYXksXG5cdFx0XHRcdFx0c2xpbTogSlNPTi5wYXJzZShhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdzbGltJykpLFxuXHRcdFx0XHRcdGNvdmVyOiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdjb3ZlcicpLFxuXHRcdFx0XHRcdGNvbG9yOiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdjb2xvcicpLFxuXHRcdFx0XHRcdGFydGlzdDogYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnYXJ0aXN0Jylcblx0XHRcdFx0fVxuXHRcdFx0XHRuZXcgYlBsYXllcihhdWRpb0xpc3RbaV0sIGRhdGEpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGJQbGF5ZXJcbn0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgoKSA9PiBiUGxheWVyKVxufSBlbHNlIHtcblx0d2luZG93LmJQbGF5ZXIgPSBiUGxheWVyXG59XG5cbi8vIFNob3cgaW5mb3JtYXRpb24gd2hlbiBiUGxheWVyIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG5pbmZvKGBiUGxheWVyIHYke1ZFUlNJT059IGxvYWRlZCFgKVxuIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJpc09iamVjdCIsInJlcXVpcmUkJDEiLCJkb2N1bWVudCIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiZFAiLCJnbG9iYWwiLCIkZXhwb3J0IiwiSU9iamVjdCIsInRvSW50ZWdlciIsIm1pbiIsInRvSU9iamVjdCIsImRlZmluZWQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNCIsImFuT2JqZWN0IiwiZ2V0S2V5cyIsImRlZmluZVByb3BlcnRpZXMiLCJjb3JlIiwic3RyaW5naWZ5IiwiJE9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiYXBwTmFtZSIsImluZm8iLCJjb25zb2xlIiwiYmluZCIsIndhcm4iLCJ3aW5kb3ciLCJicHMiLCJjc3MiLCJkZWZhdWx0cyIsInJlc3BvbnNlIiwiY2xpZW50V2lkdGgiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJmb3JtYXRUaW1lIiwic2VjIiwiaG91cnMiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImhzIiwibXMiLCJzcyIsImRhdGEiLCJpIiwic3JjIiwiY292ZXIiLCJ0aXRsZSIsImFydGlzdCIsImNvbG9yIiwic2xpbSIsInZvbHVtZSIsIm11dGVkIiwiX2F1ZGlvIiwiX2VscyIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwic3BsaXQiLCJ0ZXh0Q29udGVudCIsInBsYXllZCIsImJhY2tncm91bmRDb2xvciIsInZvbHVtZVZhbCIsIl9lbCIsImNsYXNzTmFtZSIsImluZGV4T2YiLCJ2b2x1bWVCdG4iLCJsb29wIiwibG9vcEJ0biIsImF1dG9wbGF5IiwidHlwZSIsImZuIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwbGF5IiwicGF1c2UiLCJwYXVzZWQiLCJiUGxheWVyIiwiZWwiLCJfdGhpcyIsIkVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJhdHRyaWJ1dGVzIiwibGVuZ3RoIiwidGVzdCIsIm5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJ2YWx1ZSIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJBdWRpbyIsImlubmVySFRNTCIsImNvbnRlbnQiLCJfc3RhdHVzIiwicHJvZ3Jlc3NDdGwiLCJ2b2x1bWVDdGwiLCJjdXJyZW50IiwibG9hZGVkIiwidG90YWwiLCJwbGF5Q3RsIiwicGxheUJ0biIsInBhdXNlQnRuIiwiY2FsbCIsImUiLCJ3IiwieCIsIm9mZnNldFgiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwiZXJyIiwicHJvZ3Jlc3Nkb3duIiwidG91Y2hlcyIsInBhZ2VYIiwidGFyZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInZvbHVtZWRvd24iLCJ3aWR0aCIsImJ1ZmZlcmVkIiwiZW5kIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwic2hhZG93IiwiY3JlYXRlU2hhZG93Um9vdCIsImF1ZGlvTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmaW5lIiwiYW1kIiwiVkVSU0lPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLE1BQU0sR0FBRyxjQUFjLEdBQUcsT0FBTyxNQUFNLElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtJQUM3RSxNQUFNLEdBQUcsT0FBTyxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztBQUNoRyxHQUFHLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDOzs7O0FDSHZDLElBQUksSUFBSSxHQUFHLGNBQWMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvQyxHQUFHLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOzs7QUNEckMsY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLEdBQUcsT0FBTyxFQUFFLElBQUksVUFBVSxDQUFDLE1BQU0sU0FBUyxDQUFDLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO0VBQ3ZFLE9BQU8sRUFBRSxDQUFDO0NBQ1g7O0FDRkQsSUFBSSxTQUFTLEdBQUdBLFVBQXdCLENBQUM7QUFDekMsUUFBYyxHQUFHLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7RUFDekMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2QsR0FBRyxJQUFJLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQ2hDLE9BQU8s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QUcsSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixTQUFTLEdBQUcsSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixRQUFRLElBQUksSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUM5RCxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQztNQUM5QixNQUFNLE1BQU0sU0FBUyxHQUFHRCxRQUFNLEdBQUcsU0FBUyxHQUFHQSxRQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQ0EsUUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUM7TUFDM0YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDbEIsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztFQUMzQixJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUM7O0lBRWhCLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUN4RCxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVM7O0lBRWxDLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7TUFFeEUsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMs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
