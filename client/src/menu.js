import GameState from './gamestate';

class Menu extends GameState {
    constructor() {
        super('Menu');
    }
    preload(){
        console.log('[MENU] preload');
        super.preload();
    }
    create(){
        console.log('[MENU] create');
        super.create();
    }
};

export default Menu;
