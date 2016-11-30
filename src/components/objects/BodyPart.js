import Phaser from 'phaser';

class BodyPart extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'square');

        this.game.physics.enable(this);
        this.body.collideWorldBounds = true;
        this.width = x;
        this.height = y;
    }
}

export default BodyPart;