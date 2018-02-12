/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _javascriptStateMachine = __webpack_require__(/*! javascript-state-machine */ 1);
	
	var _javascriptStateMachine2 = _interopRequireDefault(_javascriptStateMachine);
	
	var _boot = __webpack_require__(/*! ./boot */ 3);
	
	var _boot2 = _interopRequireDefault(_boot);
	
	var _menu = __webpack_require__(/*! ./menu */ 5);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _game = __webpack_require__(/*! ./game */ 6);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _gameover = __webpack_require__(/*! ./gameover */ 7);
	
	var _gameover2 = _interopRequireDefault(_gameover);
	
	var _extendedsprite = __webpack_require__(/*! ./extendedsprite */ 8);
	
	var _extendedsprite2 = _interopRequireDefault(_extendedsprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initConfig = {
	    device: navigator.userAgent
	};
	
	var configs = {
	    WIDTH: 1000,
	    HEIGHT: 1000,
	    DOM_ELEMENT: 'app'
	};
	
	var store = new _javascriptStateMachine2.default({
	    init: 'boot',
	    transitions: [{ name: 'initialize', from: 'boot', to: 'menu' }, { name: 'play', from: 'menu', to: 'game' }, { name: 'abandon', from: 'game', to: 'menu' }, { name: 'lose', from: 'game', to: 'menu' }],
	    data: {
	        game: new Phaser.Game(configs.WIDTH, configs.HEIGHT, Phaser.AUTO, configs.DOM_ELEMENT)
	    },
	    methods: {
	        onAbandon: function onAbandon() {
	            console.log('[STATE] onAbandon');
	        },
	        onLose: function onLose() {
	            console.log('[STATE] onLose');
	        },
	        onPlay: function onPlay() {
	            console.log('[STATE] onPlay');
	        },
	        onInitialize: function onInitialize(lifecycle, initConfig) {
	            console.log('[STATE] onPlay', lifecycle, initConfig);
	            store.game.state.add('Boot', _boot2.default);
	            store.game.state.add('Menu', _menu2.default);
	            store.game.state.add('Game', _game2.default);
	            store.game.state.add('GameOver', _gameover2.default);
	            store.game.state.start('Game', true, true, initConfig);
	        }
	    }
	});
	
	store.initialize(initConfig);

/***/ }),
/* 1 */
/*!*********************************************************!*\
  !*** ./~/javascript-state-machine/lib/state-machine.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function webpackUniversalModuleDefinition(root, factory) {
	  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["StateMachine"] = factory();else root["StateMachine"] = factory();
	})(undefined, function () {
	  return (/******/function (modules) {
	      // webpackBootstrap
	      /******/ // The module cache
	      /******/var installedModules = {};
	      /******/
	      /******/ // The require function
	      /******/function __webpack_require__(moduleId) {
	        /******/
	        /******/ // Check if module is in cache
	        /******/if (installedModules[moduleId]) {
	          /******/return installedModules[moduleId].exports;
	          /******/
	        }
	        /******/ // Create a new module (and put it into the cache)
	        /******/var module = installedModules[moduleId] = {
	          /******/i: moduleId,
	          /******/l: false,
	          /******/exports: {}
	          /******/ };
	        /******/
	        /******/ // Execute the module function
	        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	        /******/
	        /******/ // Flag the module as loaded
	        /******/module.l = true;
	        /******/
	        /******/ // Return the exports of the module
	        /******/return module.exports;
	        /******/
	      }
	      /******/
	      /******/
	      /******/ // expose the modules object (__webpack_modules__)
	      /******/__webpack_require__.m = modules;
	      /******/
	      /******/ // expose the module cache
	      /******/__webpack_require__.c = installedModules;
	      /******/
	      /******/ // identity function for calling harmony imports with the correct context
	      /******/__webpack_require__.i = function (value) {
	        return value;
	      };
	      /******/
	      /******/ // define getter function for harmony exports
	      /******/__webpack_require__.d = function (exports, name, getter) {
	        /******/if (!__webpack_require__.o(exports, name)) {
	          /******/Object.defineProperty(exports, name, {
	            /******/configurable: false,
	            /******/enumerable: true,
	            /******/get: getter
	            /******/ });
	          /******/
	        }
	        /******/
	      };
	      /******/
	      /******/ // getDefaultExport function for compatibility with non-harmony modules
	      /******/__webpack_require__.n = function (module) {
	        /******/var getter = module && module.__esModule ?
	        /******/function getDefault() {
	          return module['default'];
	        } :
	        /******/function getModuleExports() {
	          return module;
	        };
	        /******/__webpack_require__.d(getter, 'a', getter);
	        /******/return getter;
	        /******/
	      };
	      /******/
	      /******/ // Object.prototype.hasOwnProperty.call
	      /******/__webpack_require__.o = function (object, property) {
	        return Object.prototype.hasOwnProperty.call(object, property);
	      };
	      /******/
	      /******/ // __webpack_public_path__
	      /******/__webpack_require__.p = "";
	      /******/
	      /******/ // Load entry module and return exports
	      /******/return __webpack_require__(__webpack_require__.s = 5);
	      /******/
	    }(
	    /************************************************************************/
	    /******/[
	    /* 0 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      module.exports = function (target, sources) {
	        var n, source, key;
	        for (n = 1; n < arguments.length; n++) {
	          source = arguments[n];
	          for (key in source) {
	            if (source.hasOwnProperty(key)) target[key] = source[key];
	          }
	        }
	        return target;
	      };
	
	      /***/
	    },
	    /* 1 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      //-------------------------------------------------------------------------------------------------
	
	      var mixin = __webpack_require__(0);
	
	      //-------------------------------------------------------------------------------------------------
	
	      module.exports = {
	
	        build: function build(target, config) {
	          var n,
	              max,
	              plugin,
	              plugins = config.plugins;
	          for (n = 0, max = plugins.length; n < max; n++) {
	            plugin = plugins[n];
	            if (plugin.methods) mixin(target, plugin.methods);
	            if (plugin.properties) Object.defineProperties(target, plugin.properties);
	          }
	        },
	
	        hook: function hook(fsm, name, additional) {
	          var n,
	              max,
	              method,
	              plugin,
	              plugins = fsm.config.plugins,
	              args = [fsm.context];
	
	          if (additional) args = args.concat(additional);
	
	          for (n = 0, max = plugins.length; n < max; n++) {
	            plugin = plugins[n];
	            method = plugins[n][name];
	            if (method) method.apply(plugin, args);
	          }
	        }
	
	        //-------------------------------------------------------------------------------------------------
	
	
	        /***/ };
	    },
	    /* 2 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      //-------------------------------------------------------------------------------------------------
	
	      function camelize(label) {
	
	        if (label.length === 0) return label;
	
	        var n,
	            result,
	            word,
	            words = label.split(/[_-]/);
	
	        // single word with first character already lowercase, return untouched
	        if (words.length === 1 && words[0][0].toLowerCase() === words[0][0]) return label;
	
	        result = words[0].toLowerCase();
	        for (n = 1; n < words.length; n++) {
	          result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
	        }
	
	        return result;
	      }
	
	      //-------------------------------------------------------------------------------------------------
	
	      camelize.prepended = function (prepend, label) {
	        label = camelize(label);
	        return prepend + label[0].toUpperCase() + label.substring(1);
	      };
	
	      //-------------------------------------------------------------------------------------------------
	
	      module.exports = camelize;
	
	      /***/
	    },
	    /* 3 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      //-------------------------------------------------------------------------------------------------
	
	      var mixin = __webpack_require__(0),
	          camelize = __webpack_require__(2);
	
	      //-------------------------------------------------------------------------------------------------
	
	      function Config(options, StateMachine) {
	
	        options = options || {};
	
	        this.options = options; // preserving original options can be useful (e.g visualize plugin)
	        this.defaults = StateMachine.defaults;
	        this.states = [];
	        this.transitions = [];
	        this.map = {};
	        this.lifecycle = this.configureLifecycle();
	        this.init = this.configureInitTransition(options.init);
	        this.data = this.configureData(options.data);
	        this.methods = this.configureMethods(options.methods);
	
	        this.map[this.defaults.wildcard] = {};
	
	        this.configureTransitions(options.transitions || []);
	
	        this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);
	      }
	
	      //-------------------------------------------------------------------------------------------------
	
	      mixin(Config.prototype, {
	
	        addState: function addState(name) {
	          if (!this.map[name]) {
	            this.states.push(name);
	            this.addStateLifecycleNames(name);
	            this.map[name] = {};
	          }
	        },
	
	        addStateLifecycleNames: function addStateLifecycleNames(name) {
	          this.lifecycle.onEnter[name] = camelize.prepended('onEnter', name);
	          this.lifecycle.onLeave[name] = camelize.prepended('onLeave', name);
	          this.lifecycle.on[name] = camelize.prepended('on', name);
	        },
	
	        addTransition: function addTransition(name) {
	          if (this.transitions.indexOf(name) < 0) {
	            this.transitions.push(name);
	            this.addTransitionLifecycleNames(name);
	          }
	        },
	
	        addTransitionLifecycleNames: function addTransitionLifecycleNames(name) {
	          this.lifecycle.onBefore[name] = camelize.prepended('onBefore', name);
	          this.lifecycle.onAfter[name] = camelize.prepended('onAfter', name);
	          this.lifecycle.on[name] = camelize.prepended('on', name);
	        },
	
	        mapTransition: function mapTransition(transition) {
	          var name = transition.name,
	              from = transition.from,
	              to = transition.to;
	          this.addState(from);
	          if (typeof to !== 'function') this.addState(to);
	          this.addTransition(name);
	          this.map[from][name] = transition;
	          return transition;
	        },
	
	        configureLifecycle: function configureLifecycle() {
	          return {
	            onBefore: { transition: 'onBeforeTransition' },
	            onAfter: { transition: 'onAfterTransition' },
	            onEnter: { state: 'onEnterState' },
	            onLeave: { state: 'onLeaveState' },
	            on: { transition: 'onTransition' }
	          };
	        },
	
	        configureInitTransition: function configureInitTransition(init) {
	          if (typeof init === 'string') {
	            return this.mapTransition(mixin({}, this.defaults.init, { to: init, active: true }));
	          } else if ((typeof init === 'undefined' ? 'undefined' : _typeof(init)) === 'object') {
	            return this.mapTransition(mixin({}, this.defaults.init, init, { active: true }));
	          } else {
	            this.addState(this.defaults.init.from);
	            return this.defaults.init;
	          }
	        },
	
	        configureData: function configureData(data) {
	          if (typeof data === 'function') return data;else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') return function () {
	            return data;
	          };else return function () {
	            return {};
	          };
	        },
	
	        configureMethods: function configureMethods(methods) {
	          return methods || {};
	        },
	
	        configurePlugins: function configurePlugins(plugins, builtin) {
	          plugins = plugins || [];
	          var n, max, plugin;
	          for (n = 0, max = plugins.length; n < max; n++) {
	            plugin = plugins[n];
	            if (typeof plugin === 'function') plugins[n] = plugin = plugin();
	            if (plugin.configure) plugin.configure(this);
	          }
	          return plugins;
	        },
	
	        configureTransitions: function configureTransitions(transitions) {
	          var i,
	              n,
	              transition,
	              from,
	              to,
	              wildcard = this.defaults.wildcard;
	          for (n = 0; n < transitions.length; n++) {
	            transition = transitions[n];
	            from = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard];
	            to = transition.to || wildcard;
	            for (i = 0; i < from.length; i++) {
	              this.mapTransition({ name: transition.name, from: from[i], to: to });
	            }
	          }
	        },
	
	        transitionFor: function transitionFor(state, transition) {
	          var wildcard = this.defaults.wildcard;
	          return this.map[state][transition] || this.map[wildcard][transition];
	        },
	
	        transitionsFor: function transitionsFor(state) {
	          var wildcard = this.defaults.wildcard;
	          return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));
	        },
	
	        allStates: function allStates() {
	          return this.states;
	        },
	
	        allTransitions: function allTransitions() {
	          return this.transitions;
	        }
	
	      });
	
	      //-------------------------------------------------------------------------------------------------
	
	      module.exports = Config;
	
	      //-------------------------------------------------------------------------------------------------
	
	
	      /***/
	    },
	    /* 4 */
	    /***/function (module, exports, __webpack_require__) {
	
	      var mixin = __webpack_require__(0),
	          Exception = __webpack_require__(6),
	          plugin = __webpack_require__(1),
	          UNOBSERVED = [null, []];
	
	      //-------------------------------------------------------------------------------------------------
	
	      function JSM(context, config) {
	        this.context = context;
	        this.config = config;
	        this.state = config.init.from;
	        this.observers = [context];
	      }
	
	      //-------------------------------------------------------------------------------------------------
	
	      mixin(JSM.prototype, {
	
	        init: function init(args) {
	          mixin(this.context, this.config.data.apply(this.context, args));
	          plugin.hook(this, 'init');
	          if (this.config.init.active) return this.fire(this.config.init.name, []);
	        },
	
	        is: function is(state) {
	          return Array.isArray(state) ? state.indexOf(this.state) >= 0 : this.state === state;
	        },
	
	        isPending: function isPending() {
	          return this.pending;
	        },
	
	        can: function can(transition) {
	          return !this.isPending() && !!this.seek(transition);
	        },
	
	        cannot: function cannot(transition) {
	          return !this.can(transition);
	        },
	
	        allStates: function allStates() {
	          return this.config.allStates();
	        },
	
	        allTransitions: function allTransitions() {
	          return this.config.allTransitions();
	        },
	
	        transitions: function transitions() {
	          return this.config.transitionsFor(this.state);
	        },
	
	        seek: function seek(transition, args) {
	          var wildcard = this.config.defaults.wildcard,
	              entry = this.config.transitionFor(this.state, transition),
	              to = entry && entry.to;
	          if (typeof to === 'function') return to.apply(this.context, args);else if (to === wildcard) return this.state;else return to;
	        },
	
	        fire: function fire(transition, args) {
	          return this.transit(transition, this.state, this.seek(transition, args), args);
	        },
	
	        transit: function transit(transition, from, to, args) {
	
	          var lifecycle = this.config.lifecycle,
	              changed = this.config.options.observeUnchangedState || from !== to;
	
	          if (!to) return this.context.onInvalidTransition(transition, from, to);
	
	          if (this.isPending()) return this.context.onPendingTransition(transition, from, to);
	
	          this.config.addState(to); // might need to add this state if it's unknown (e.g. conditional transition or goto)
	
	          this.beginTransit();
	
	          args.unshift({ // this context will be passed to each lifecycle event observer
	            transition: transition,
	            from: from,
	            to: to,
	            fsm: this.context
	          });
	
	          return this.observeEvents([this.observersForEvent(lifecycle.onBefore.transition), this.observersForEvent(lifecycle.onBefore[transition]), changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED, this.observersForEvent(lifecycle.on.transition), changed ? ['doTransit', [this]] : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter[to]) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.on[to]) : UNOBSERVED, this.observersForEvent(lifecycle.onAfter.transition), this.observersForEvent(lifecycle.onAfter[transition]), this.observersForEvent(lifecycle.on[transition])], args);
	        },
	
	        beginTransit: function beginTransit() {
	          this.pending = true;
	        },
	        endTransit: function endTransit(result) {
	          this.pending = false;return result;
	        },
	        failTransit: function failTransit(result) {
	          this.pending = false;throw result;
	        },
	        doTransit: function doTransit(lifecycle) {
	          this.state = lifecycle.to;
	        },
	
	        observe: function observe(args) {
	          if (args.length === 2) {
	            var observer = {};
	            observer[args[0]] = args[1];
	            this.observers.push(observer);
	          } else {
	            this.observers.push(args[0]);
	          }
	        },
	
	        observersForEvent: function observersForEvent(event) {
	          // TODO: this could be cached
	          var n = 0,
	              max = this.observers.length,
	              observer,
	              result = [];
	          for (; n < max; n++) {
	            observer = this.observers[n];
	            if (observer[event]) result.push(observer);
	          }
	          return [event, result, true];
	        },
	
	        observeEvents: function observeEvents(events, args, previousEvent, previousResult) {
	          if (events.length === 0) {
	            return this.endTransit(previousResult === undefined ? true : previousResult);
	          }
	
	          var event = events[0][0],
	              observers = events[0][1],
	              pluggable = events[0][2];
	
	          args[0].event = event;
	          if (event && pluggable && event !== previousEvent) plugin.hook(this, 'lifecycle', args);
	
	          if (observers.length === 0) {
	            events.shift();
	            return this.observeEvents(events, args, event, previousResult);
	          } else {
	            var observer = observers.shift(),
	                result = observer[event].apply(observer, args);
	            if (result && typeof result.then === 'function') {
	              return result.then(this.observeEvents.bind(this, events, args, event)).catch(this.failTransit.bind(this));
	            } else if (result === false) {
	              return this.endTransit(false);
	            } else {
	              return this.observeEvents(events, args, event, result);
	            }
	          }
	        },
	
	        onInvalidTransition: function onInvalidTransition(transition, from, to) {
	          throw new Exception("transition is invalid in current state", transition, from, to, this.state);
	        },
	
	        onPendingTransition: function onPendingTransition(transition, from, to) {
	          throw new Exception("transition is invalid while previous transition is still in progress", transition, from, to, this.state);
	        }
	
	      });
	
	      //-------------------------------------------------------------------------------------------------
	
	      module.exports = JSM;
	
	      //-------------------------------------------------------------------------------------------------
	
	
	      /***/
	    },
	    /* 5 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      //-----------------------------------------------------------------------------------------------
	
	      var mixin = __webpack_require__(0),
	          camelize = __webpack_require__(2),
	          plugin = __webpack_require__(1),
	          Config = __webpack_require__(3),
	          JSM = __webpack_require__(4);
	
	      //-----------------------------------------------------------------------------------------------
	
	      var PublicMethods = {
	        is: function is(state) {
	          return this._fsm.is(state);
	        },
	        can: function can(transition) {
	          return this._fsm.can(transition);
	        },
	        cannot: function cannot(transition) {
	          return this._fsm.cannot(transition);
	        },
	        observe: function observe() {
	          return this._fsm.observe(arguments);
	        },
	        transitions: function transitions() {
	          return this._fsm.transitions();
	        },
	        allTransitions: function allTransitions() {
	          return this._fsm.allTransitions();
	        },
	        allStates: function allStates() {
	          return this._fsm.allStates();
	        },
	        onInvalidTransition: function onInvalidTransition(t, from, to) {
	          return this._fsm.onInvalidTransition(t, from, to);
	        },
	        onPendingTransition: function onPendingTransition(t, from, to) {
	          return this._fsm.onPendingTransition(t, from, to);
	        }
	      };
	
	      var PublicProperties = {
	        state: {
	          configurable: false,
	          enumerable: true,
	          get: function get() {
	            return this._fsm.state;
	          },
	          set: function set(state) {
	            throw Error('use transitions to change state');
	          }
	        }
	
	        //-----------------------------------------------------------------------------------------------
	
	      };function StateMachine(options) {
	        return apply(this || {}, options);
	      }
	
	      function factory() {
	        var cstor, options;
	        if (typeof arguments[0] === 'function') {
	          cstor = arguments[0];
	          options = arguments[1] || {};
	        } else {
	          cstor = function cstor() {
	            this._fsm.apply(this, arguments);
	          };
	          options = arguments[0] || {};
	        }
	        var config = new Config(options, StateMachine);
	        build(cstor.prototype, config);
	        cstor.prototype._fsm.config = config; // convenience access to shared config without needing an instance
	        return cstor;
	      }
	
	      //-------------------------------------------------------------------------------------------------
	
	      function apply(instance, options) {
	        var config = new Config(options, StateMachine);
	        build(instance, config);
	        instance._fsm();
	        return instance;
	      }
	
	      function build(target, config) {
	        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' || Array.isArray(target)) throw Error('StateMachine can only be applied to objects');
	        plugin.build(target, config);
	        Object.defineProperties(target, PublicProperties);
	        mixin(target, PublicMethods);
	        mixin(target, config.methods);
	        config.allTransitions().forEach(function (transition) {
	          target[camelize(transition)] = function () {
	            return this._fsm.fire(transition, [].slice.call(arguments));
	          };
	        });
	        target._fsm = function () {
	          this._fsm = new JSM(this, config);
	          this._fsm.init(arguments);
	        };
	      }
	
	      //-----------------------------------------------------------------------------------------------
	
	      StateMachine.version = '3.0.1';
	      StateMachine.factory = factory;
	      StateMachine.apply = apply;
	      StateMachine.defaults = {
	        wildcard: '*',
	        init: {
	          name: 'init',
	          from: 'none'
	        }
	
	        //===============================================================================================
	
	      };module.exports = StateMachine;
	
	      /***/
	    },
	    /* 6 */
	    /***/function (module, exports, __webpack_require__) {
	
	      "use strict";
	
	      module.exports = function (message, transition, from, to, current) {
	        this.message = message;
	        this.transition = transition;
	        this.from = from;
	        this.to = to;
	        this.current = current;
	      };
	
	      /***/
	    }]
	    /******/)
	  );
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/module.js */ 2)(module)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }),
/* 3 */
/*!****************************!*\
  !*** ./client/src/boot.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Boot = function (_GameState) {
	    _inherits(Boot, _GameState);
	
	    function Boot() {
	        _classCallCheck(this, Boot);
	
	        return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).call(this));
	    }
	
	    _createClass(Boot, [{
	        key: 'init',
	        value: function init(config) {
	            console.log('[BOOT] init', config);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            console.log('[BOOT] preload');
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[BOOT] create');
	        }
	    }]);
	
	    return Boot;
	}(_gamestate2.default);
	
	;
	
	exports.default = Boot;

/***/ }),
/* 4 */
/*!*********************************!*\
  !*** ./client/src/gamestate.js ***!
  \*********************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GameState = function (_Phaser$State) {
	    _inherits(GameState, _Phaser$State);
	
	    function GameState() {
	        _classCallCheck(this, GameState);
	
	        var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));
	
	        _this.EVENTS = {};
	        return _this;
	    }
	
	    _createClass(GameState, [{
	        key: 'init',
	        value: function init(config) {
	            console.log('[GAMESTATE] init', config);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            console.log('[GAMESTATE] preload');
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[GAMESTATE] create');
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            console.log('[GAMESTATE] update');
	            if (Math.random() < 0.001) {
	                this.dispatch('AN EVENT');
	            }
	            if (Math.random() < 0.001) {
	                this.dispatch('ANOTHER EVENT');
	            }
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe(eventName, callback) {
	            if (!this.EVENTS[eventName]) {
	                this.EVENTS[eventName] = new Phaser.Signal();
	            };
	            this.EVENTS[eventName].add(callback, this);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(eventName) {
	            this.EVENTS[eventName] && this.EVENTS[eventName].dispatch();
	        }
	    }]);
	
	    return GameState;
	}(Phaser.State);
	
	;
	
	exports.default = GameState;

/***/ }),
/* 5 */
/*!****************************!*\
  !*** ./client/src/menu.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_GameState) {
	    _inherits(Menu, _GameState);
	
	    function Menu() {
	        _classCallCheck(this, Menu);
	
	        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
	    }
	
	    _createClass(Menu, [{
	        key: 'init',
	        value: function init(config) {
	            console.log('[MENU] init', config);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            console.log('[MENU] preload');
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[MENU] create');
	        }
	    }]);
	
	    return Menu;
	}(_gamestate2.default);
	
	;
	
	exports.default = Menu;

/***/ }),
/* 6 */
/*!****************************!*\
  !*** ./client/src/game.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Game = function (_GameState) {
	    _inherits(Game, _GameState);
	
	    function Game() {
	        _classCallCheck(this, Game);
	
	        return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));
	    }
	
	    _createClass(Game, [{
	        key: 'init',
	        value: function init(config) {
	            var _this2 = this;
	
	            console.log('[GAME] init', config);
	            this.subscribe('AN EVENT', function () {
	                console.log('[AN EVENT] from init', _this2);
	            });
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            var _this3 = this;
	
	            console.log('[GAME] preload');
	            this.subscribe('AN EVENT', function () {
	                console.log('[AN EVENT] from preload', _this3);
	            });
	            this.subscribe('ANOTHER EVENT', function () {
	                console.log('[ANOTHER EVENT] from preload', _this3);
	            });
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[GAME] create');
	        }
	    }]);
	
	    return Game;
	}(_gamestate2.default);
	
	;
	
	exports.default = Game;

/***/ }),
/* 7 */
/*!********************************!*\
  !*** ./client/src/gameover.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GameOver = function (_GameState) {
	  _inherits(GameOver, _GameState);
	
	  function GameOver() {
	    _classCallCheck(this, GameOver);
	
	    return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
	  }
	
	  return GameOver;
	}(_gamestate2.default);
	
	;
	
	exports.default = GameOver;

/***/ }),
/* 8 */
/*!**************************************!*\
  !*** ./client/src/extendedsprite.js ***!
  \**************************************/
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ExtendedSprite = function (_Phaser$Sprite) {
	    _inherits(ExtendedSprite, _Phaser$Sprite);
	
	    function ExtendedSprite(game, x, y, sprite) {
	        _classCallCheck(this, ExtendedSprite);
	
	        return _possibleConstructorReturn(this, (ExtendedSprite.__proto__ || Object.getPrototypeOf(ExtendedSprite)).call(this, game, x, y, sprite));
	    }
	
	    return ExtendedSprite;
	}(Phaser.Sprite);
	
	;
	
	exports.default = ExtendedSprite;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map