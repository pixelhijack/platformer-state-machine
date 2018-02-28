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

const game = new Phaser.Game(config);

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
            game.scene.start('Menu', true, true, {
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
