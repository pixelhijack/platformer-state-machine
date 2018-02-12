class GameState extends Phaser.State {
    constructor() {
        super();
        this.EVENTS = {};
    }
    init(config){
        console.log('[GAMESTATE] init', config);
    }
    preload(){
        console.log('[GAMESTATE] preload');
    }
    create(){
        console.log('[GAMESTATE] create');
    }
    update(){
        console.log('[GAMESTATE] update');
        if(Math.random() < 0.001){
            this.dispatch('AN EVENT');
        }
        if(Math.random() < 0.001){
            this.dispatch('ANOTHER EVENT');
        }
    }
    subscribe(eventName, callback){
        if(!this.EVENTS[eventName]){
            this.EVENTS[eventName] = new Phaser.Signal();
        };
        this.EVENTS[eventName].add(callback, this);
    }
    dispatch(eventName){
        this.EVENTS[eventName] && this.EVENTS[eventName].dispatch();
    }
};

export default GameState;
