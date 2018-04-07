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
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// config per level = Phaser2 GameState
	var config = {
	    game: {
	        width: 546,
	        height: 368,
	        blocks: 3,
	        domElement: 'game'
	    },
	    levels: [{
	        key: 'menu',
	        exit: 'level 1'
	    }, {
	        key: 'level 1',
	        exit: 'level 2'
	    }, {
	        key: 'level 2',
	        exit: 'level 3'
	    }, {
	        key: 'game over',
	        exit: 'menu'
	    }]
	};
	
	var GameState = function (_Phaser$State) {
	    _inherits(GameState, _Phaser$State);
	
	    function GameState(config) {
	        _classCallCheck(this, GameState);
	
	        return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));
	    }
	
	    _createClass(GameState, [{
	        key: 'init',
	        value: function init(config) {
	            console.log('[ GAMESTATE ] init', config);
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
	        }
	    }]);
	
	    return GameState;
	}(Phaser.State);
	
	;
	
	var game = new Phaser.Game(config.game.width, config.game.height, Phaser.AUTO, config.game.domElement);
	
	var levels = config.levels.map(function (level) {
	    return game.state.add(level.key, new GameState(config));
	});
	
	game.state.start('menu', true, true, config);
	
	/////////////////////////////////////////////
	/*
	import StateMachine from 'javascript-state-machine';

	import Boot from './boot';
	import Menu from './menu';
	import Game from './game';
	import GameOver from './gameover';
	import GameState from './gamestate';
	import ExtendedSprite from './extendedsprite';
	import config from './config';

	const events = [
	    {
	        event: 'PLAYER:MOVE',
	        action: (state, props) => {
	            state.player.x += props.velocity
	        }
	    },{

	    }
	];

	const store = new StateMachine({
	    init: 'boot',
	    transitions: [
	        { name: 'initialize', from: 'boot', to: 'menu' },
	        { name: 'play',       from: 'menu', to: 'game' },
	        { name: 'abandon',    from: 'game', to: 'menu' },
	        { name: 'lose',       from: 'game', to: 'menu' }
	    ],
	    data: {

	    },
	    methods: {
	        onAbandon: () => { console.log('[STATE] onAbandon'); },
	        onLose: () => { console.log('[STATE] onLose'); },
	        onPlay: (lifecycle, level) => {
	            console.log('[STATE] onPlay');
	            game.state.start('Game', true, true, {
	                config: config,
	                keyboardEvents: {
	                    'SPACE': 'PLAYER:HIT',
	                    'ARROWUP': 'PLAYER:JUMP',
	                    'ARROWDOWN': 'PLAYER:DUCK',
	                    'ARROWLEFT': 'PLAYER:LEFT',
	                    'ARROWRIGHT': 'PLAYER:RIGHT'
	                },
	                events: [
	                    {
	                        type: 'GAME:ABANDON',
	                        action: function() {
	                            store.abandon();
	                        }
	                    },{
	                        type: 'GAME:OVER',
	                        action: function() {
	                            store.lose();
	                        }
	                    },{
	                        type: 'PLAYER:HIT',
	                        action: function(event) {
	                            this.PLAYER.hit();
	                        }
	                    },{
	                        type: 'PLAYER:JUMP',
	                        action: function(event) {
	                            this.PLAYER.jump();
	                        }
	                    },{
	                        type: 'PLAYER:DUCK',
	                        action: function(event) {
	                            this.PLAYER.duck();
	                        }
	                    },{
	                        type: 'PLAYER:LEFT',
	                        action: function(event) {
	                            this.PLAYER.moveLeft();
	                        }
	                    },{
	                        type: 'PLAYER:RIGHT',
	                        action: function(event) {
	                            this.PLAYER.moveRight();
	                        }
	                    }
	                ]
	            });
	        },
	        onInitialize: (lifecycle, config) => {
	            console.log('[STATE] onInitialize', lifecycle, config);
	            game.state.add('Boot', Boot);
	            game.state.add('Menu', Menu);
	            game.state.add('Game', Game);
	            game.state.add('GameOver', GameState);
	            game.state.start('Menu', true, true, {
	                config: config,
	                keyboardEvents: {
	                    'SPACE': 'GAME:START'
	                },
	                events: [
	                    { type: 'GAME:START', action: function() { store.play()} }
	                ]
	            });
	        }
	    }
	});

	store.initialize(config);
	*/

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map