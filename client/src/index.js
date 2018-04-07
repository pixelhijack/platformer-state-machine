// serializable config per level = Phaser2 GameState
const config = {
    game: {
        width: 546,
        height: 368,
        blocks: 3,
        domElement: 'game'
    }, 
    levels: [
        {
            key: 'menu',
            exit: 'level 1',
            keyboard: {
                '*': 'LEVEL:NEXT',
                'SPACE': 'PLAYER:HIT'
            }
        },
        {
            key: 'level 1',
            exit: 'level 2',
            keyboard: {
                'SPACE': 'PLAYER:HIT',
                'ARROWUP': 'PLAYER:JUMP',
                'ARROWDOWN': 'PLAYER:DUCK',
                'ARROWLEFT': 'PLAYER:LEFT',
                'ARROWRIGHT': 'PLAYER:RIGHT'
            }
        },
        {
            key: 'level 2',
            exit: 'level 3'
        },
        {
            key: 'game over',
            exit: 'menu'
        }
    ]
};

const events = [
    {
        type: 'LEVEL:NEXT',
        action: ({state, game, e}) => {
            game.state.start('level 1');
        }
    },{
        type: 'PLAYER:HIT',
        action: (payload) => {
            console.log('[ EVENT ] ', payload);
        }
    }
];

class GameState extends Phaser.State {
    constructor(key, config) {
        super();
        this.config = {
            game: config.game,
            level: config.levels.find(level => level.key === key),
            events: events
        };
        this.EVENTS = {};
        this.KEYS = {};
        this.STATE = {};
    }
    init(adHocConfig){
        console.log('[ GAMESTATE ] %s init', this.config.level.key, adHocConfig);
    }
    preload(){
        console.log('[ GAMESTATE ] %s preload', this.config.level.key);
    }
    create(){
        console.log('[ GAMESTATE ] %s create', this.config.level.key);
        // subscribe events
        this.config.events.forEach(event => {
            this.subscribe(event.type, event.action);
        });

        // setup keyboard events
        this.KEYS = this.config.level.keyboard;
        this.game.input.keyboard.onDownCallback = (e) => {
            const payload = { 
                e: e, 
                game: this.game,
                state: this.STATE
            };
            // 1. any key pressed: 
            this.KEYS['*'] &&
            this.dispatch(this.KEYS['*'], payload);
            
            // 2. single key pressed: 
            this.KEYS[e.code.toUpperCase()] &&
            this.dispatch(this.KEYS[e.code.toUpperCase()], payload);

            // 3. combo keys pressed
            // WIP
        };
    }
    update(){
        console.log('[ GAMESTATE ] %s update', this.config.level.key);
    }

    subscribe(type, action, priority, args){
        if(!this.EVENTS[type]){
            this.EVENTS[type] = new Phaser.Signal();
        };
        this.EVENTS[type].add(action, this, priority, args);
    }
    dispatch(type, args){
        if(this.EVENTS[type]){
            this.EVENTS[type].dispatch(args);
            console.log('[ EVENTS ] %s dispatched', type, args);
        } else {
            console.warn('[ GameState.dispatch ] %s event fired, missing a handler!', type);
        };
    }
    nextLevel(data) {
        this.game.state.start(this.config.level.exit, true, true, data);
    }
};

const game = new Phaser.Game(
    config.game.width,
    config.game.height,
    Phaser.AUTO,
    config.game.domElement
);

const levels = config.levels.map(
    level => game.state.add(level.key, new GameState(level.key, config))
);

game.state.start('menu', true, true, { someData: 'state from previous level' });


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
