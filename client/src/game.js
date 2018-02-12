import GameState from './gamestate';
import { gameEvents } from './events';

class Game extends GameState {
    constructor() {
        super();
        this.subscribeAll(gameEvents);
    }
    init(config){
        console.log('[GAME] init', config);

        // event params can be bound beforehand:
        this.subscribe('AN EVENT', (config) => {
            console.log('[AN EVENT] from init', config);
        }, null, config);
    }
    preload(){
        console.log('[GAME] preload');
    }
    create(){
        console.log('[GAME] create');
    }
};

export default Game;
