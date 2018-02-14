import StateMachine from 'javascript-state-machine';

import Boot from './boot';
import Menu from './menu';
import Game from './game';
import GameOver from './gameover';
import GameState from './gamestate';
import ExtendedSprite from './extendedsprite';
import config from './config';

const game = new Phaser.Game(
    config.width,
    config.height,
    Phaser.AUTO,
    config.domElement
);

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
                        eventType: 'PLAYER:HIT',
                        action: (event) => {
                            console.log('this', this)
                        }
                    },{
                        eventType: 'PLAYER:JUMP',
                        action: (event) => {}
                    },{
                        eventType: 'PLAYER:DUCK',
                        action: (event) => {}
                    },{
                        eventType: 'PLAYER:LEFT',
                        action: (event) => {}
                    },{
                        eventType: 'PLAYER:RIGHT',
                        action: (event) => {}
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
                    { eventType: 'GAME:START', action: () => { store.play()} }
                ]
            });
        }
    }
});

store.initialize(config);
