// config per level = Phaser2 GameState
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
            exit: 'level 1'
        },
        {
            key: 'level 1',
            exit: 'level 2'
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

class GameState extends Phaser.State {
    constructor(config) {
        super();
    }
    init(config){
        console.log('[ GAMESTATE ] init', config);
    }
    preload(){
        console.log('[ GAMESTATE ] preload');
    }
    create(){
        console.log('[ GAMESTATE ] create');
    }
    update(){
        console.log('[ GAMESTATE ] update');
    }
};

const game = new Phaser.Game(
    config.game.width,
    config.game.height,
    Phaser.AUTO,
    config.game.domElement
);

const levels = config.levels.map(
    level => game.state.add(level.key, new GameState(config))
);

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
