import GameState from './gamestate';
import ExtendedSprite from './extendedsprite';
import creatureConfig from './creatureconfig';

class Game extends GameState {
    constructor() {
        super();
        this.ENTITIES = {/*
            'bear': [],
            'dino': []
        */};
        this.PLAYER = undefined;
        this.levelConfig = undefined;
        this.creatureConfig = creatureConfig;
    }
    init(level){
        console.log('[GAME] init', level);
        super.init(level);

        this.levelConfig = level.config;

        // event params can be bound beforehand:
        this.subscribe('AN EVENT', (level) => {
            console.log('[AN EVENT] from init', level);
        }, null, level);
    }
    preload(){
        console.log('[GAME] preload');
        super.preload();
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.load.atlas(
            'pre2atlas',
            'assets/pre2atlas.png',
            'assets/pre2atlas.json',
            Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        );
    }
    create(){
        console.log('[GAME] create');
        super.create();

        this.PLAYER = new ExtendedSprite(
            this.game,
            this.levelConfig.entryPoint.x,
            this.levelConfig.entryPoint.y,
            this.levelConfig.textureAtlasName,
            this.creatureConfig.man
        );
    }
};

export default Game;
