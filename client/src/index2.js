import 'phaser';
import StateMachine from 'javascript-state-machine';

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


const bootScene = {
    key: 'boot',
    active: false,
    init: function (config) {
        console.log('[BOOT] init', config, this);
    },
    preload: function () {
        console.log('[BOOT] preload');
    },
    create: function (config) {
        console.log('[BOOT] create', config, this);
        game.scene.start('game', { data: '...arbitrary data from BOOT' });
        
    },
    update: () => {
        console.log('[BOOT] update');
    }, 
    extend: {
        data: {
            lives: 0,
            score: 0
        }
    }
};

const gameScene = {
    key: 'game',
    active: false,
    renderToTexture: true,
    x: 64,
    y: 64,
    width: 320,
    height: 200,
    init: function(config) {
        console.log('[GAME] init', config, this);
    },
    preload: function() {
        console.log('[GAME] preload');
    },
    create: function(config) {
        console.log('[GAME] create', config, this);
    },
    update: function() {
        console.log('[GAME] update');
    }, 
    extend: {
        data: {
            lives: 3,
            score: 100
        }
    }
};

class GameState extends Phaser.Scene {
    constructor(key) {
        super({
            key: key
        });
        this.EVENTS = {};
        this.KEYS = {};
    }
    init(data){
        console.log('[ GAMESTATE ] init', data, this);
    }
    preload(){
        console.log('[ GAMESTATE ] preload', this);
        // load assets
    }
    create(data){
        console.log('[ GAMESTATE ] create', data, this);
        // create entities
        // subscribe events
    }
    update(){
        console.log('[ GAMESTATE ] update', this);
    }
};

const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600
};

const boot = new GameState('class-boot');

const game = new Phaser.Game(gameConfig);
game.scene.add('class-boot', boot, false);
//game.scene.add('game', gameScene, false);
game.scene.start('class-boot', { data: '...arbitrary data from BOOT' });

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
            game.scene.start('Menu', {
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

//store.initialize(config);


