import Phaser from 'phaser';

class BodyPart extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'fruit');

        this.width = x;
        this.height = y;
        this.game.physics.enable(this);
        this.body.collideWorldBounds = true;
    }
}

export default BodyPart;