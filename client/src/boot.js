import GameState from './gamestate';

class Boot extends GameState {
    constructor() {
        super({
            key: 'Boot'
        });
    }
    init(config){
        console.log('[BOOT] init', config);
    }
    preload(){
        console.log('[BOOT] preload');
    }
    create(){
        console.log('[BOOT] create');
    }
};

export default Boot;
