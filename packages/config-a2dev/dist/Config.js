'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _commonA2dev=require('common-a2dev');var _commonA2dev2=_interopRequireDefault(_commonA2dev);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var STAGE={DEFAULT:'default'};var Config=function(){function Config(){_classCallCheck(this,Config)}_createClass(Config,null,[{key:'getEnv',// This function get value of Environment, if it can.
value:function getEnv(key){var def=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;if(!Config.isEnv)return def;return process.env[key]}},{key:'isExistsObject',value:function isExistsObject(v){return(typeof v==='undefined'?'undefined':_typeof(v))==='object'&&v!==null}},{key:'create',value:function create(config){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var _config={};// if not have setting return empty
if(!Config.isExistsObject(config))return _config;// get default
if(Config.isExistsObject(config[STAGE.DEFAULT]))_config=config[STAGE.DEFAULT];// options.stageに一致するconfigが存在するかチェック
if(!options.stage||!Config.isExistsObject(config[options.stage]))return _config;// over write specific configulation
_config=_commonA2dev2.default.fillObject(_config,config[options.stage]);return _config}},{key:'STAGE',get:function get(){return STAGE}},{key:'isEnv',get:function get(){if('_isEnv'in this)return this._isEnv;this._isEnv=process&&Config.isExistsObject(process.env);return this._isEnv}}]);return Config}();exports.default=Config;