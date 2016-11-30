import Phaser from 'phaser';
import Game from './Game';

class Player extends Phaser.Group {

    constructor(game, gridSize) {
        super(game, null, 'Player', true, true);

        this._gridSize = gridSize;
        this._direction = 'right';

        this.expandBody();

        this.setAll('body.collideWorldBounds', true);
    }

    expandBody() {
        const bodyPart = this.create(this._gridSize.width, this._gridSize.height, 'snake');
        bodyPart.width = this._gridSize.width;
        bodyPart.height = this._gridSize.height;
    }

    setDirection(newDirection) {
        this._direction = newDirection;
    }

    move() {
        for (let bodyPart of this.children) {
            bodyPart.body.velocity.set(0, 0);

            if (this._direction === Game.directions.LEFT) {
                bodyPart.body.velocity.x = -Game.PLAYER_VELOCITY;
            } else if (this._direction === Game.directions.RIGHT) {
                bodyPart.body.velocity.x = Game.PLAYER_VELOCITY;
            } else if (this._direction === Game.directions.UP) {
                bodyPart.body.velocity.y = -Game.PLAYER_VELOCITY;
            } else {
                bodyPart.body.velocity.y = Game.PLAYER_VELOCITY;
            }
        }
    }
}

export default Player;