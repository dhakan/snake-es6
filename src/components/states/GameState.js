import Player from '../objects/Player';
import Phaser from 'phaser';
import Game from '../objects/Game';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('square', 'images/square.png');
        this.game.load.image('fruit', 'images/fruit.png');
    }

    create() {
        console.log('Entered game state!');

        const gridSize = {
                width: 10,
                height: 10
            };

        this._player = new Player(this.game, gridSize);

        this._cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        console.log('Update function');

        if (this._cursors.left.isDown) {
            this._player.setDirection(Game.directions.LEFT);
        } else if (this._cursors.right.isDown) {
            this._player.setDirection(Game.directions.RIGHT);
        } else if (this._cursors.up.isDown) {
            this._player.setDirection(Game.directions.UP);
        } else if (this._cursors.down.isDown) {
            this._player.setDirection(Game.directions.DOWN);
        }

        this._player.move();
    }

}

export default GameState;
