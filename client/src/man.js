import ExtendedSprite from './extendedsprite';

class Man extends ExtendedSprite {
    constructor(game, x, y, sprite, props) {
        super(game, x, y, sprite, props);
    }
    preload(){
        super.preload();
    }
    create(){
        super.create();
    }
    update(){
        super.update();
    }
    hit(){
        console.log('[ MAN ] hit');
    }
    jump(){
        console.log('[ MAN ] jump');
    }
    duck(){
        console.log('[ MAN ] duck');
    }
    moveLeft(){
        console.log('[ MAN ] moveLeft');
    }
    moveRight(){
        console.log('[MAN] moveRight');
    }
};

export default Man;
