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
        this.expandBody();
    }

    _onBodyPartCollision() {
        const bodyPart = this.children[this.children.length - 1];

        this.expandBody(bodyPart.position);
    }

    /**
     * Expands the player body by adding a new body part
     */
    expandBody(pos = {x: 0, y: 0}) {
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
        if (this.game.time.now < this._moveTimer) {
            return;
        }

        const tail = this.children.pop(),
            head = this.children[0];

        let newHeadX = head.position.x,
            newHeadY = head.position.y;

        if (this._direction === constants.directions.LEFT) {
            newHeadX += -constants.GRID_SIZE;
        } else if (this._direction === constants.directions.RIGHT) {
            newHeadX += constants.GRID_SIZE;
        } else if (this._direction === constants.directions.UP) {
            newHeadY += -constants.GRID_SIZE;
        } else {
            newHeadY += constants.GRID_SIZE;
        }

        this.children.unshift(tail);

        tail.xPos = newHeadX;
        tail.yPos = newHeadY;

        this._moveTimer = this.game.time.now + constants.PLAYER_MOVE_TIMER;
    }
}

export default Player;