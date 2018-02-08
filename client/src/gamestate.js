class GameState {
    init(config){
        console.log('[PHASER] init', config);
    }
    preload(){
        console.log('[PHASER] preload');
    }
    create(){
        console.log('[PHASER] create');
    }
    update(){
        console.log('[PHASER] update');
    }
};

export default GameState;
