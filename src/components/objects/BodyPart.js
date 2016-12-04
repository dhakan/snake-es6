import Phaser from 'phaser';
import constants from '../utils/constants';

class BodyPart extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'snake');

        this.width = constants.GRID_SIZE;
        this.height = constants.GRID_SIZE;
        this.game.physics.enable(this);
        this.body.collideWorldBounds = true;
    }
}

export default BodyPart;
