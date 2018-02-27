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
    stop(){
        this.body.velocity.x /= 1.1;
    }
    moveLeft(){
        console.log('[ MAN ] moveLeft');
        this.scale.x = -1;
        if(this.body.velocity.x > -this.props.maxSpeed){
            this.body.velocity.x -= this.props.acceleration;
        };
        this.states.move();
    }
    moveRight(){
        console.log('[MAN] moveRight');
        this.scale.x = 1;
        if(this.body.velocity.x < this.props.maxSpeed){
            this.body.velocity.x += this.props.acceleration;
        }
        this.states.move();
    }
};

export default Man;
