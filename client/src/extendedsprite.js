class ExtendedSprite extends Phaser.Sprite {
    constructor(game, x, y, sprite, props) {
        super(game, x, y, sprite);
        this.props = props || { animations: [] };
        
        this.props.animations.forEach(animation => {
            this.animations.add(
                animation.name,
                animation.frames.map(frame => frame.toString()),
                animation.fps,
                animation.loop
            );
        });
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.gravity.y = this.props.gravity;
        this.anchor.setTo(0.5, 1);
        this.body.collideWorldBounds = true;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
    update(){
        this.animations.play('idle');
    }
};

export default ExtendedSprite;
