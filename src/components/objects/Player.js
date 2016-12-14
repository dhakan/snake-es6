import Phaser from 'phaser';
import BodyPart from './BodyPart';
import constants from '../utils/constants';

class Player extends Phaser.Group {

    /**
     * Player constructor
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(game) {
        super(game, null, 'Player', true, true);

        this._direction = constants.directions.RIGHT;
        this._moveTimer = 0;

        this.expandBody();
    }

    _onBodyPartCollision() {
        const bodyPart = this.children[this.children.length - 1],
            oldPos = bodyPart.oldPos;

        this.expandBody(oldPos);
    }

    /**
     * Expands the player body by adding a new body part
     */
    expandBody(pos = { x: 0, y: 0 }) {
        const bodyPart = new BodyPart(this.game, pos.x, pos.y);

        bodyPart.addOnCollisionListener(this._onBodyPartCollision.bind(this));

        this.add(bodyPart);
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
        if (this.game.time.now > this._moveTimer) {
            for (let bodyPart of this.children) {
                if (this._direction === constants.directions.LEFT) {
                    bodyPart.xPos += -constants.GRID_SIZE;
                } else if (this._direction === constants.directions.RIGHT) {
                    bodyPart.xPos += constants.GRID_SIZE;
                } else if (this._direction === constants.directions.UP) {
                    bodyPart.yPos += -constants.GRID_SIZE;
                } else {
                    bodyPart.yPos += constants.GRID_SIZE;
                }
            }

            this._moveTimer = this.game.time.now + constants.PLAYER_MOVE_TIMER;
        }
    }
}

export default Player;