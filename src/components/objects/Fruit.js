import Phaser from 'phaser';
import constants from '../utils/constants';

class Fruit extends Phaser.Sprite {

    /**
     * Fruit constructor
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(game, x, y) {
        super(game, x, y, 'fruit');

        this.width = constants.GRID_SIZE;
        this.height = constants.GRID_SIZE;
        this.game.physics.enable(this);
        game.add.existing(this);
    }
}

export default Fruit;