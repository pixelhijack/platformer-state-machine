import 'phaser';
import creatureConfig from './creatureconfig';

class ExtendedSprite extends Phaser.GameObjects.Sprite {
    constructor({scene, x, y, key, props}) {
        super(scene, x, y, key);
        this.scene = scene;
        this.props = props || { animations: [] };
        this.states = {};

        this.props.animations.forEach(function(animation){
            this.anims.create({
                key: animation.name,
                frames: animation.frames.map(frame => frame.toString()),
                framerate: animation.fps,
                yoyo: animation.loop
            });
        }.bind(this));
        this.scene.add.existing(this);
        this.scene.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.gravity.y = this.props.gravity;
        this.anchor.setTo(0.5, 1);
        this.body.collideWorldBounds = true;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
    update(){
        this.anims.play('idle');
    }
};

class GameScene extends Phaser.Scene {
    constructor(key, config) {
        super({
            key: key
        });
        this.config = config;
        this.EVENTS = new Phaser.EventEmitter();
        this.KEYS = {};
        this.STATE = config.initialState;
        this.PLAYER = undefined;
    }
    init(data){
        console.log('[ SCENE ] init', data, this);
        this.setupKeys(this.config.keyboard);
        this.config.events.forEach(event => {
            this.EVENTS.on(event.type, event.action.bind(this.STATE), this);
        });
    }
    preload(){
        console.log('[ SCENE ] preload', this);
        // load assets
        this.load.atlas(
            this.config.assets.textureAtlas.name,
            this.config.assets.textureAtlas.img,
            this.config.assets.textureAtlas.json,
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );
    }
    create(data){
        console.log('[ SCENE ] create', data, this);
        // create all animations
        Object.keys(this.config.creatureConfig).forEach(creature => {
            const creatureConfig = this.config.creatureConfig[creature];
            creatureConfig.animations.forEach(
                animation => {
                    this.anims.create({
                        key: creature + ':' + animation.name,
                        frames: animation.frames.map(frame => ({ key: frame.toString() })),
                        frameRate: animation.fps,
                        repeat: animation.loop
                    });
                }
            );
        });

        // create entities
        this.add.sprite(400, 300, 'pre2atlas').play('man:idle');

        // subscribe events
    }
    update(){
        //console.log('[ SCENE ] update', this);
        // update entities by state
        // render entities 
        // collisions -> events
    }
    setupKeys(keyboardEvents){
        this.KEYS = keyboardEvents;
        this.input.keyboard.on('keydown', function(e) {
            const event = this.KEYS[e.code.toUpperCase()];
            if(event){
                this.EVENTS.emit(event, this.STATE);
            } else {
                console.log('[ EVENTS ] %s event is not found in events: ', e.code.toUpperCase(), this.KEYS);
            }
        }.bind(this));
    }
    setState(state) {

    }
};

const gameConfig = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600
};

const config = {
    'boot': {
        assets: {
            background: '',
            textureAtlas: {
                name: 'pre2atlas',
                img: 'assets/spritesheets/pre2atlas.png',
                json: 'assets/spritesheets/pre2atlas.json'
            }
        },
        keyboard: {
            'SPACE': 'PLAYER:HIT',
            'ARROWUP': 'PLAYER:JUMP',
            'ARROWDOWN': 'PLAYER:DUCK',
            'ARROWLEFT': 'PLAYER:LEFT',
            'ARROWRIGHT': 'PLAYER:RIGHT'
        },
        events: [
            { type: 'PLAYER:LEFT', action: function(state) {
                console.log('[ EVENTS ] PLAYER:LEFT ', state);
                state.player.x += 100;
            } },
            { type: 'PLAYER:RIGHT', action: function(state) {} }
        ],
        creatureConfig: creatureConfig,
        initialState: {
            player: {
                x: 0,
                y: 0
            },
            entities: []
        }
    },
    'game': {
        keyboard: {}, 
        events: [],
        initialState: {}
    }
};

const scene = {
    boot: new GameScene('boot', config.boot),
    game: new GameScene('game', config.game)
};

const game = new Phaser.Game(gameConfig);

game.scene.add('boot', scene.boot, false);
game.scene.add('game', scene.game, false);
game.scene.start('boot', { data: '...arbitrary data from BOOT' });