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
        if(Math.random() < 0.001){ this.dispatch('AN EVENT'); }
        if(Math.random() < 0.001){ this.dispatch('BOOT:INIT'); }
        if(Math.random() < 0.001){ this.dispatch('MENU:INIT'); }
        if(Math.random() < 0.001){ this.dispatch('GAME:INIT', { time: new Date() }); }
        if(Math.random() < 0.001){ this.dispatch('GAME:PRELOAD'); }
        if(Math.random() < 0.001){ this.dispatch('GAME:CREATE'); }
    }
    subscribe(eventName, callback, priority, args){
        if(!this.EVENTS[eventName]){
            this.EVENTS[eventName] = new Phaser.Signal();
        };
        this.EVENTS[eventName].add(callback, this, priority, args);
    }
    dispatch(eventName, args){
        this.EVENTS[eventName] && this.EVENTS[eventName].dispatch(args);
    }
    subscribeAll(eventMap){
        Object.keys(eventMap).forEach(eventName => {
            this.subscribe(eventName, eventMap[eventName]);
        });
    }
};

export default GameState;
