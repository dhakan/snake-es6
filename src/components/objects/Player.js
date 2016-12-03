import Phaser from 'phaser';
import constants from '../utils/constants';

class Player extends Phaser.Group {

    /**
     * Player constructor
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(game) {
        super(game, null, 'Player', true, true);

        this._direction = constants.directions.RIGHT;

        this.expandBody();

        this.setAll('body.collideWorldBounds', true);
    }

    /**
     * Expands the player body by adding a new body part
     */
    expandBody() {
        const bodyPart = this.create(constants.GRID_SIZE, constants.GRID_SIZE, 'snake');

        // bodyPart.width = constants.GRID_SIZE;
        // bodyPart.height = constants.GRID_SIZE;

        bodyPart.animations.add('walk');
        bodyPart.animations.play('walk', constants.PLAYER_FRAMERATE, true);
    }

    /**
     * Sets the direction of the player
     * @param newDirection the new direction
     */
    setDirection(newDirection) {
        this._direction = newDirection;
    }

    /**
     * Moves the player
     */
    move() {
        for (let bodyPart of this.children) {
            bodyPart.body.velocity.set(0, 0);

            if (this._direction === constants.directions.LEFT) {
                bodyPart.body.velocity.x = -constants.PLAYER_VELOCITY;
            } else if (this._direction === constants.directions.RIGHT) {
                bodyPart.body.velocity.x = constants.PLAYER_VELOCITY;
            } else if (this._direction === constants.directions.UP) {
                bodyPart.body.velocity.y = -constants.PLAYER_VELOCITY;
            } else {
                bodyPart.body.velocity.y = constants.PLAYER_VELOCITY;
            }
        }
    }
}

export default Player;