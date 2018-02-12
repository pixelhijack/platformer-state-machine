import GameState from './gamestate';

class Game extends GameState {
    constructor() {
        super();
    }
    init(config){
        console.log('[GAME] init', config);
        this.subscribe('AN EVENT', () => {
            console.log('[AN EVENT] from init', this);
        });
    }
    preload(){
        console.log('[GAME] preload');
        this.subscribe('AN EVENT', () => {
            console.log('[AN EVENT] from preload', this);
        });
        this.subscribe('ANOTHER EVENT', () => {
            console.log('[ANOTHER EVENT] from preload', this);
        });
    }
    create(){
        console.log('[GAME] create');
    }
};

export default Game;
