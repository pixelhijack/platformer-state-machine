import GameState from './gamestate';

class Menu extends GameState {
    constructor() {
        super();
    }
    init(config){
        console.log('[MENU] init', config);
    }
    preload(){
        console.log('[MENU] preload');
    }
    create(){
        console.log('[MENU] create');
    }
};

export default Menu;
