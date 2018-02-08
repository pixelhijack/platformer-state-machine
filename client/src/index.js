import GameState from './gamestate';
import StateMachine from 'javascript-state-machine';

const initConfig = {
    device: navigator.userAgent
};

const configs = {
    WIDTH: 1000,
    HEIGHT: 1000,
    DOM_ELEMENT: 'app'
};

const store = new StateMachine({
    init: 'boot',
    transitions: [
        { name: 'initialize', from: 'boot', to: 'menu' },
        { name: 'play',       from: 'menu', to: 'game' },
        { name: 'abandon',    from: 'game', to: 'menu' },
        { name: 'lose',       from: 'game', to: 'menu' }
    ],
    data: {
        game: new Phaser.Game(
            configs.WIDTH,
            configs.HEIGHT,
            Phaser.AUTO,
            configs.DOM_ELEMENT
        )
    },
    methods: {
        onAbandon: () => { console.log('[STATE] onAbandon'); },
        onLose: () => { console.log('[STATE] onLose'); },
        onPlay: () => { console.log('[STATE] onPlay'); },
        onInitialize: (lifecycle, initConfig) => {
            console.log('[STATE] onPlay', lifecycle, initConfig);
            store.game.state.add('Boot', GameState);
            store.game.state.add('Menu', GameState);
            store.game.state.add('Game', GameState);
            store.game.state.add('GameOver', GameState);
            store.game.state.start('Game', true, true, initConfig);
        }
    }
});

store.initialize(initConfig);
