import StateMachine from 'javascript-state-machine';

class ExtendedSprite extends Phaser.GameObjects.Sprite {
    constructor(game, x, y, sprite, props) {
        super(game, x, y, sprite);
        this.props = props || { animations: [] };

        this.states = new StateMachine({
            init: 'unborn',
            transitions: [
                { 
                    name: 'spawn', 
                    from: 'unborn', 
                    to: 'idle' 
                },
                { 
                    name: 'move', 
                    from: ['idle', 'move'], 
                    to: 'move' 
                },
                { 
                    name: 'hurt', 
                    from: ['idle', 'move', 'hit'], 
                    to: 'hurt' 
                },
                { 
                    name: 'stop', 
                    from: '', 
                    to: '' 
                },
                { 
                    name: 'jump', 
                    from: ['idle', 'move', 'hit'], 
                    to: '' 
                },
                { 
                    name: 'die', 
                    from: '*', 
                    to: 'dead' 
                }
            ],
            data: {},
            methods: []
        });

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

        this.states.spawn();
    }
    update(){
        this.animations.play(this.states.state);
    }
};

export default ExtendedSprite;
