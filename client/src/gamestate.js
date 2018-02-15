class GameState extends Phaser.State {
    constructor() {
        super();
        this.EVENTS = {};
        this.KEYS = {};
    }
    init({ config, keyboardEvents, events }){
        console.log('[ GAMESTATE ] init', config, keyboardEvents, events);
        this.setupKeys(keyboardEvents);
        this.subscribeAll(events);
    }
    preload(){
        console.log('[ GAMESTATE ] preload');
    }
    create(){
        console.log('[ GAMESTATE ] create');
    }
    update(){
        console.log('[ GAMESTATE ] update');
        if(Math.random() < 0.001){ this.dispatch('AN EVENT'); }
        if(Math.random() < 0.001){ this.dispatch('GAME:INIT', { time: new Date() }); }
    }
    setupKeys(keyboardEvents){
        this.KEYS = keyboardEvents;
        this.game.input.keyboard.onDownCallback = (event) => {
            if(this.KEYS[event.code.toUpperCase()]){
                this.dispatch(this.KEYS[event.code.toUpperCase()], event);
            }
        };
    }
    subscribe(type, action, priority, args){
        if(!this.EVENTS[type]){
            this.EVENTS[type] = new Phaser.Signal();
        };
        this.EVENTS[type].add(action, this, priority, args);
    }
    dispatch(type, args){
        if(this.EVENTS[type]){
            this.EVENTS[type].dispatch(args);
            console.log('[ EVENTS ] %s dispatched', type, args);
        } else {
            console.warn('[ GameState.dispatch ] %s type not found', type);
        };
    }
    subscribeAll(events){
        events.forEach(event => {
            this.subscribe(event.type, event.action);
        });
    }
};

export default GameState;
