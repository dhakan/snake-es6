import Phaser from 'phaser';
import BodyPart from './BodyPart';
import Game from './Game';

class Player extends Phaser.Group {

    constructor(game, gridSize) {
        super(game, null, 'Player', true, true);

        this._gridSize = gridSize;
        this._direction = 'right';
        this.expandBody();
    }

    expandBody() {
        const bodyPart = new BodyPart(this.game, this._gridSize.width, this._gridSize.height);
        this.add(bodyPart);
    }

    setDirection(newDirection) {
        this._direction = newDirection;
    }

    move() {
        if (this._direction === Game.directions.LEFT) {
            this.x += -Game.PLAYER_MOVEMENT_SPEED;
        } else if (this._direction === Game.directions.RIGHT) {
            this.x += Game.PLAYER_MOVEMENT_SPEED;
        } else if (this._direction === Game.directions.UP) {
            this.y += -Game.PLAYER_MOVEMENT_SPEED;
        } else {
            this.y += Game.PLAYER_MOVEMENT_SPEED;
        }
    }
}

export default Player;