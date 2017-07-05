import Phaser from 'phaser';
import BodyPart from './BodyPart';

class Player extends Phaser.Group {

    /**
     * Player constructor
     * @param {PlayerModel} playerModel the data by which to base the player on
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(playerModel, game) {
        super(game, null, 'Player', true, true);

        for (const bodyPart of playerModel.bodyParts) {
            this.expandBody({
                x: bodyPart.x,
                y: bodyPart.y,
            }, playerModel.color);
        }

        this._direction = playerModel.direction;
        // this._direction = null;
    }

    get direction() {
        return this._direction;
    }

    set direction(newValue) {
        this._direction = newValue;
    }

    get head() {
        return this.children[0];
    }

    _onBodyPartCollision() {
        const bodyPart = this.children[this.children.length - 1];

        this.expandBody(bodyPart.position);
    }

    /**
     * Expands the player body by adding a new body part
     */
    expandBody(pos = { x: 0, y: 0 }, color) {
        const bodyPart = new BodyPart(this.game, pos.x, pos.y, color);

        // bodyPart.addOnCollisionListener(this._onBodyPartCollision.bind(this));

        this.add(bodyPart);
    }

    /**
     * Moves the player
     */
    move() {
        if (this.game.time.now < this._moveTimer) {
            return;
        }

        const tail = this.children.pop(),
            head = this.head;

        let newHeadX = head.x,
            newHeadY = head.y;

        if (this._direction === this.game.settings.playerActions.LEFT) {
            newHeadX += -this.game.settings.GRID_SIZE;
        } else if (this._direction === this.game.settings.playerActions.RIGHT) {
            newHeadX += this.game.settings.GRID_SIZE;
        } else if (this._direction === this.game.settings.playerActions.UP) {
            newHeadY += -this.game.settings.GRID_SIZE;
        } else {
            newHeadY += this.game.settings.GRID_SIZE;
        }

        this.children.unshift(tail);

        tail.xPos = newHeadX;
        tail.yPos = newHeadY;

        this._moveTimer = this.game.time.now + this.game.settings.GAME_LOOP_TIMER;
    }
}

export default Player;
