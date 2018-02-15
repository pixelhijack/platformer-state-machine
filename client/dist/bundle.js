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
	
	var _gameover = __webpack_require__(/*! ./gameover */ 10);
	
	var _gameover2 = _interopRequireDefault(_gameover);
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	var _extendedsprite = __webpack_require__(/*! ./extendedsprite */ 8);
	
	var _extendedsprite2 = _interopRequireDefault(_extendedsprite);
	
	var _config = __webpack_require__(/*! ./config */ 11);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new Phaser.Game(_config2.default.width, _config2.default.height, Phaser.AUTO, _config2.default.domElement);
	
	var store = new _javascriptStateMachine2.default({
	    init: 'boot',
	    transitions: [{ name: 'initialize', from: 'boot', to: 'menu' }, { name: 'play', from: 'menu', to: 'game' }, { name: 'abandon', from: 'game', to: 'menu' }, { name: 'lose', from: 'game', to: 'menu' }],
	    data: {},
	    methods: {
	        onAbandon: function onAbandon() {
	            console.log('[STATE] onAbandon');
	        },
	        onLose: function onLose() {
	            console.log('[STATE] onLose');
	        },
	        onPlay: function onPlay(lifecycle, level) {
	            console.log('[STATE] onPlay');
	            game.state.start('Game', true, true, {
	                config: _config2.default,
	                keyboardEvents: {
	                    'SPACE': 'PLAYER:HIT',
	                    'ARROWUP': 'PLAYER:JUMP',
	                    'ARROWDOWN': 'PLAYER:DUCK',
	                    'ARROWLEFT': 'PLAYER:LEFT',
	                    'ARROWRIGHT': 'PLAYER:RIGHT'
	                },
	                events: [{
	                    type: 'GAME:ABANDON',
	                    action: function action() {
	                        store.abandon();
	                    }
	                }, {
	                    type: 'GAME:OVER',
	                    action: function action() {
	                        store.lose();
	                    }
	                }, {
	                    type: 'PLAYER:HIT',
	                    action: function action(event) {
	                        console.log('this', this);
	                        this.PLAYER.hit();
	                    }
	                }, {
	                    type: 'PLAYER:JUMP',
	                    action: function action(event) {
	                        this.PLAYER.jump();
	                    }
	                }, {
	                    type: 'PLAYER:DUCK',
	                    action: function action(event) {
	                        this.PLAYER.duck();
	                    }
	                }, {
	                    type: 'PLAYER:LEFT',
	                    action: function action(event) {
	                        this.PLAYER.moveLeft();
	                    }
	                }, {
	                    type: 'PLAYER:RIGHT',
	                    action: function action(event) {
	                        this.PLAYER.moveRight();
	                    }
	                }]
	            });
	        },
	        onInitialize: function onInitialize(lifecycle, config) {
	            console.log('[STATE] onInitialize', lifecycle, config);
	            game.state.add('Boot', _boot2.default);
	            game.state.add('Menu', _menu2.default);
	            game.state.add('Game', _game2.default);
	            game.state.add('GameOver', _gamestate2.default);
	            game.state.start('Menu', true, true, {
	                config: config,
	                keyboardEvents: {
	                    'SPACE': 'GAME:START'
	                },
	                events: [{ type: 'GAME:START', action: function action() {
	                        store.play();
	                    } }]
	            });
	        }
	    }
	});
	
	store.initialize(_config2.default);

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
	        _this.KEYS = {};
	        return _this;
	    }
	
	    _createClass(GameState, [{
	        key: 'init',
	        value: function init(_ref) {
	            var config = _ref.config,
	                keyboardEvents = _ref.keyboardEvents,
	                events = _ref.events;
	
	            console.log('[ GAMESTATE ] init', config, keyboardEvents, events);
	            this.setupKeys(keyboardEvents);
	            this.subscribeAll(events);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            console.log('[ GAMESTATE ] preload');
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[ GAMESTATE ] create');
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            console.log('[ GAMESTATE ] update');
	            if (Math.random() < 0.001) {
	                this.dispatch('AN EVENT');
	            }
	            if (Math.random() < 0.001) {
	                this.dispatch('GAME:INIT', { time: new Date() });
	            }
	        }
	    }, {
	        key: 'setupKeys',
	        value: function setupKeys(keyboardEvents) {
	            var _this2 = this;
	
	            this.KEYS = keyboardEvents;
	            this.game.input.keyboard.onDownCallback = function (event) {
	                if (_this2.KEYS[event.code.toUpperCase()]) {
	                    _this2.dispatch(_this2.KEYS[event.code.toUpperCase()], event);
	                }
	            };
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe(type, action, priority, args) {
	            if (!this.EVENTS[type]) {
	                this.EVENTS[type] = new Phaser.Signal();
	            };
	            this.EVENTS[type].add(action, this, priority, args);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(type, args) {
	            if (this.EVENTS[type]) {
	                this.EVENTS[type].dispatch(args);
	                console.log('[ EVENTS ] %s dispatched', type, args);
	            } else {
	                console.warn('[ GameState.dispatch ] %s type not found', type);
	            };
	        }
	    }, {
	        key: 'subscribeAll',
	        value: function subscribeAll(events) {
	            var _this3 = this;
	
	            events.forEach(function (event) {
	                _this3.subscribe(event.type, event.action);
	            });
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
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
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
	        key: 'preload',
	        value: function preload() {
	            console.log('[MENU] preload');
	            _get(Menu.prototype.__proto__ || Object.getPrototypeOf(Menu.prototype), 'preload', this).call(this);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[MENU] create');
	            _get(Menu.prototype.__proto__ || Object.getPrototypeOf(Menu.prototype), 'create', this).call(this);
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
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _gamestate = __webpack_require__(/*! ./gamestate */ 4);
	
	var _gamestate2 = _interopRequireDefault(_gamestate);
	
	var _man = __webpack_require__(/*! ./man */ 7);
	
	var _man2 = _interopRequireDefault(_man);
	
	var _creatureconfig = __webpack_require__(/*! ./creatureconfig */ 9);
	
	var _creatureconfig2 = _interopRequireDefault(_creatureconfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Game = function (_GameState) {
	    _inherits(Game, _GameState);
	
	    function Game() {
	        _classCallCheck(this, Game);
	
	        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));
	
	        _this.ENTITIES = {/*
	                          'bear': [],
	                          'dino': []
	                          */};
	        _this.PLAYER = undefined;
	        _this.levelConfig = undefined;
	        _this.creatureConfig = _creatureconfig2.default;
	        return _this;
	    }
	
	    _createClass(Game, [{
	        key: 'init',
	        value: function init(level) {
	            console.log('[ GAME ] init', level);
	            _get(Game.prototype.__proto__ || Object.getPrototypeOf(Game.prototype), 'init', this).call(this, level);
	
	            this.levelConfig = level.config;
	
	            // event params can be bound beforehand:
	            this.subscribe('AN EVENT', function (level) {
	                console.log('[ AN EVENT ] from init', level);
	            }, null, level);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            console.log('[ GAME ] preload');
	            _get(Game.prototype.__proto__ || Object.getPrototypeOf(Game.prototype), 'preload', this).call(this);
	            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	            this.game.scale.pageAlignHorizontally = true;
	            this.game.scale.pageAlignVertically = true;
	            this.game.load.atlas('pre2atlas', 'assets/pre2atlas.png', 'assets/pre2atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            console.log('[ GAME ] create');
	            _get(Game.prototype.__proto__ || Object.getPrototypeOf(Game.prototype), 'create', this).call(this);
	
	            this.PLAYER = new _man2.default(this.game, this.levelConfig.entryPoint.x, this.levelConfig.entryPoint.y, this.levelConfig.textureAtlasName, this.creatureConfig.man);
	        }
	    }]);
	
	    return Game;
	}(_gamestate2.default);
	
	;
	
	exports.default = Game;

/***/ }),
/* 7 */
/*!***************************!*\
  !*** ./client/src/man.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _extendedsprite = __webpack_require__(/*! ./extendedsprite */ 8);
	
	var _extendedsprite2 = _interopRequireDefault(_extendedsprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Man = function (_ExtendedSprite) {
	    _inherits(Man, _ExtendedSprite);
	
	    function Man(game, x, y, sprite, props) {
	        _classCallCheck(this, Man);
	
	        return _possibleConstructorReturn(this, (Man.__proto__ || Object.getPrototypeOf(Man)).call(this, game, x, y, sprite, props));
	    }
	
	    _createClass(Man, [{
	        key: 'preload',
	        value: function preload() {
	            _get(Man.prototype.__proto__ || Object.getPrototypeOf(Man.prototype), 'preload', this).call(this);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            _get(Man.prototype.__proto__ || Object.getPrototypeOf(Man.prototype), 'create', this).call(this);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            _get(Man.prototype.__proto__ || Object.getPrototypeOf(Man.prototype), 'update', this).call(this);
	        }
	    }, {
	        key: 'hit',
	        value: function hit() {
	            console.log('[ MAN ] hit');
	        }
	    }, {
	        key: 'jump',
	        value: function jump() {
	            console.log('[ MAN ] jump');
	        }
	    }, {
	        key: 'duck',
	        value: function duck() {
	            console.log('[ MAN ] duck');
	        }
	    }, {
	        key: 'moveLeft',
	        value: function moveLeft() {
	            console.log('[ MAN ] moveLeft');
	        }
	    }, {
	        key: 'moveRight',
	        value: function moveRight() {
	            console.log('[MAN] moveRight');
	        }
	    }]);
	
	    return Man;
	}(_extendedsprite2.default);
	
	;
	
	exports.default = Man;

/***/ }),
/* 8 */
/*!**************************************!*\
  !*** ./client/src/extendedsprite.js ***!
  \**************************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ExtendedSprite = function (_Phaser$Sprite) {
	    _inherits(ExtendedSprite, _Phaser$Sprite);
	
	    function ExtendedSprite(game, x, y, sprite, props) {
	        _classCallCheck(this, ExtendedSprite);
	
	        var _this = _possibleConstructorReturn(this, (ExtendedSprite.__proto__ || Object.getPrototypeOf(ExtendedSprite)).call(this, game, x, y, sprite));
	
	        _this.props = props || { animations: [] };
	
	        _this.props.animations.forEach(function (animation) {
	            _this.animations.add(animation.name, animation.frames.map(function (frame) {
	                return frame.toString();
	            }), animation.fps, animation.loop);
	        });
	        _this.game.add.existing(_this);
	        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
	        _this.body.gravity.y = _this.props.gravity;
	        _this.anchor.setTo(0.5, 1);
	        _this.body.collideWorldBounds = true;
	        _this.checkWorldBounds = true;
	        _this.outOfBoundsKill = true;
	        return _this;
	    }
	
	    _createClass(ExtendedSprite, [{
	        key: 'update',
	        value: function update() {
	            this.animations.play('idle');
	        }
	    }]);
	
	    return ExtendedSprite;
	}(Phaser.Sprite);
	
	;
	
	exports.default = ExtendedSprite;

/***/ }),
/* 9 */
/*!**************************************!*\
  !*** ./client/src/creatureconfig.js ***!
  \**************************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var creatureDefaults = {
	    active: true,
	    gravity: 500,
	    bounce: 0.2,
	    mass: 1,
	    jumping: 300,
	    maxSpeed: 100,
	    acceleration: 10,
	    collide: true,
	    lives: 1,
	    lifespan: Infinity,
	    sense: 150,
	    animations: [],
	    timeOf: {
	        'move': 200,
	        'hit': 100,
	        'hurt': 500,
	        'stop': 200,
	        'idle': 10
	    },
	    boundTo: {
	        x1: 1000,
	        x2: 1200
	    },
	    correctedAnchor: {
	        x: 0.5,
	        y: 0.5
	    }
	};
	
	var creatureConfigs = {
	    man: {
	        maxSpeed: 200,
	        lives: 8,
	        lifespan: Infinity,
	        animations: [{
	            name: 'move',
	            frames: [11, '03', '05', 14, 20],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'hit',
	            frames: [22, 24, 28, 31, 34, 22, 24, 28, 31, 34],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'stop',
	            frames: [42, 45, 49, 52],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'jump',
	            frames: [16, 41, 47, 50, 50, 50, 50, 50, 50, 50, 50, 13, 50, 13, 50, 13],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'idle',
	            frames: [25, 25, 25, 25, 25, 25, 25, 25, 27, 27, 27, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 25, 25, 25, 25, 25, 25, 25, 25, 27, 30, 27, 30, 35, 36, 25, 25, 25, 25, 25, 25, 25, 25, '07', '07', '07', '07', '02', '02'],
	            fps: 5,
	            loop: true
	        }, {
	            name: 'hurt',
	            frames: [19],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'stun',
	            frames: [19],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [19],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'spawn',
	            frames: [11, '03', '05', 14, 20],
	            fps: 10,
	            loop: false
	        }],
	        correctedAnchor: {
	            x: 0.5,
	            y: 0.8
	        }
	    },
	    dino: {
	        mass: 1.5,
	        jumping: 300,
	        maxSpeed: 50,
	        acceleration: 5,
	        animations: [{
	            name: 'idle',
	            frames: [360, 360, 360, 360, 360, 360, 360, 367],
	            fps: 5,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [360, 361, 364, 367, 369],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'jump',
	            frames: [360, 361, 364, 367, 369],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'fall',
	            frames: [369],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [371],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [360, 361, 364, 367],
	            fps: 10,
	            loop: true
	        }]
	    },
	    bear: {
	        mass: 1.2,
	        maxSpeed: 75,
	        jumping: 0,
	        acceleration: 15,
	        animations: [{
	            name: 'idle',
	            frames: [321],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'move',
	            frames: [320, 321, 324],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [366, 363, 358, 317],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'die',
	            frames: [328],
	            fps: 10,
	            loop: true
	        }]
	    },
	    'super-bear': {
	        acceleration: 30,
	        maxSpeed: 200,
	        image: 'super-bear-sprite-ref', // override sprite (creature name by default)
	        animations: []
	    },
	    tiger: {
	        mass: 1.5,
	        jumping: 300,
	        maxSpeed: 50,
	        acceleration: 20,
	        animations: [{
	            name: 'idle',
	            frames: [393, 395],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [393, 395],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'jump',
	            frames: [399, 401],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'fall',
	            frames: [399],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'die',
	            frames: [402],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [393, 395],
	            fps: 10,
	            loop: true
	        }]
	    },
	    ptero: {
	        mass: 0.5,
	        gravity: 0,
	        bounce: 0.1,
	        jumping: 0,
	        collide: false,
	        maxSpeed: 10,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [478, 478, 478, 478, 478, 478, 478, 478, 477, 478, 478, 478, 478, 478, 477, 477],
	            fps: 3,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [403, 404, 405, 403, 404, 405, 405, 405, 405, 405, 405, 403, 404, 405, 403, 404, 405, 405, 405, 405, 405, 405, 405],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'descend',
	            frames: [405],
	            fps: 15,
	            loop: true
	        }, {
	            name: 'ascend',
	            frames: [403, 404, 405],
	            fps: 15,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [471],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [405, 403, 404],
	            fps: 15,
	            loop: true
	        }]
	    },
	    dragonfly: {
	        mass: 0.5,
	        gravity: 0,
	        bounce: 0.1,
	        jumping: 0,
	        collide: false,
	        maxSpeed: 50,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [337, 338],
	            fps: 12,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [337, 338],
	            fps: 12,
	            loop: true
	        }, {
	            name: 'turn',
	            frames: [339, 340],
	            fps: 12,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [342],
	            fps: 12,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [337, 338],
	            fps: 12,
	            loop: true
	        }]
	    },
	    bat: {
	        mass: 0.5,
	        gravity: 0,
	        bounce: 0.1,
	        jumping: 0,
	        collide: false,
	        maxSpeed: 20,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [351, 352, 351, 351, 351, 351],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [357, 359],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [362],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [357, 359],
	            fps: 10,
	            loop: true
	        }]
	    },
	    spider: {
	        mass: 0.3,
	        jumping: 0,
	        collide: true,
	        bounce: 0,
	        maxSpeed: 50,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [335],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [365, 368, 370, 372],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'move',
	            frames: [299, 302, 305, 309],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'turn',
	            frames: [319],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'climb',
	            frames: [341, 343, 345, 347],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'wait',
	            frames: [332, 335, 372],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [322],
	            fps: 10,
	            loop: false
	        }]
	    },
	    native: {
	        maxSpeed: 100,
	        acceleration: 20,
	        jumping: 0,
	        animations: [{
	            name: 'idle',
	            frames: [373],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [373, 376, 378],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [380],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'spawn',
	            frames: [373, 376, 378],
	            fps: 10,
	            loop: true
	        }]
	    },
	    parrot: {
	        mass: 0.5,
	        gravity: 0,
	        bounce: 0.1,
	        jumping: 0,
	        collide: false,
	        maxSpeed: 100,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [394, 397, 398],
	            fps: 12,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [394, 397, 398],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [400],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'spawn',
	            frames: [394, 397, 398],
	            fps: 10,
	            loop: true
	        }]
	    },
	    insect: {
	        mass: 1,
	        collide: true,
	        bounce: 1.5,
	        jumping: 300,
	        maxSpeed: 50,
	        acceleration: 25,
	        animations: [{
	            name: 'idle',
	            frames: [348, 348, 348, 348, 348, 348, 349],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [323, 348, 349],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'jump',
	            frames: [323, 348, 349],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [348],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [323, 348, 349],
	            fps: 10,
	            loop: true
	        }]
	    },
	    bug: {
	        mass: 1,
	        collide: true,
	        bounce: 1.5,
	        jumping: 300,
	        maxSpeed: 50,
	        acceleration: 25,
	        animations: [{
	            name: 'idle',
	            frames: [344, 344, 344, 344, 344, 344, 344, 344, 346],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [344, 346],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'jump',
	            frames: [344, 346],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [344],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [344, 346],
	            fps: 10,
	            loop: true
	        }]
	    },
	    frog: {
	        mass: 1,
	        collide: true,
	        bounce: 1.5,
	        jumping: 500,
	        maxSpeed: 80,
	        acceleration: 40,
	        animations: [{
	            name: 'idle',
	            frames: [325],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [325, 327, 331, 325],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'jump',
	            frames: [325, 327, 331, 325],
	            fps: 10,
	            loop: false
	        }, {
	            name: 'die',
	            frames: [334],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [325, 327, 331, 325],
	            fps: 10,
	            loop: false
	        }]
	    },
	    turtle: {
	        mass: 2,
	        jumping: 0,
	        collide: true,
	        bounce: 0.3,
	        maxSpeed: 50,
	        acceleration: 10,
	        animations: [{
	            name: 'idle',
	            frames: [390],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [377, 381, 384, 385],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [387, 389, 390, 391],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [392],
	            fps: 10,
	            loop: true
	        }]
	    },
	    jelly: {
	        mass: 2,
	        jumping: 0,
	        collide: true,
	        bounce: 1,
	        maxSpeed: 5,
	        acceleration: 1,
	        animations: [{
	            name: 'idle',
	            frames: [420, 433, 434],
	            fps: 3,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [420, 433, 434],
	            fps: 3,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [420, 433, 434],
	            fps: 3,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [420, 433, 434],
	            fps: 3,
	            loop: true
	        }]
	    },
	    gorilla: {
	        mass: 5,
	        jumping: 300,
	        maxSpeed: 0,
	        acceleration: 0,
	        animations: [{
	            name: 'idle',
	            frames: [411],
	            fps: 5,
	            loop: true
	        }, {
	            name: 'move',
	            frames: [411],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'jump',
	            frames: [411],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'fall',
	            frames: [411],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'die',
	            frames: [411],
	            fps: 10,
	            loop: true
	        }, {
	            name: 'spawn',
	            frames: [411],
	            fps: 10,
	            loop: true
	        }]
	    }
	};
	
	for (var creature in creatureConfigs) {
	    for (var prop in creatureDefaults) {
	        if (creatureConfigs[creature][prop] === undefined) {
	            creatureConfigs[creature][prop] = creatureDefaults[prop];
	        }
	    }
	}
	
	exports.default = creatureConfigs;

/***/ }),
/* 10 */
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
/* 11 */
/*!******************************!*\
  !*** ./client/src/config.js ***!
  \******************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    entryPoint: {
	        x: 100,
	        y: 100
	    },
	    width: 546,
	    height: 368,
	    blocks: 3,
	    domElement: 'app',
	    backgroundPath: 'backgrounds/',
	    tilesetPath: 'tilesets/',
	    levelPath: 'levels/',
	    textureAtlasPath: 'spritesheets/',
	    textureAtlasName: 'pre2atlas',
	    textureAtlasImage: 'pre2atlas.png',
	    textureAtlasJson: 'pre2atlas.json'
	};
	
	exports.default = config;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map