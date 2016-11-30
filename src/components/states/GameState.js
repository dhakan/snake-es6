import Player from '../objects/Player';
import Phaser from 'phaser';
import Game from '../objects/Game';
import Debugger from '../objects/Debugger';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('square', 'images/square.png');
        this.game.load.image('fruit', 'images/fruit.png');
        this.game.load.image('snake', 'images/snake.png');
    }

    create() {
        const gridSize = {
            width: 50,
            height: 50
        };

        this._player = new Player(this.game, gridSize);

        this._cursors = this.game.input.keyboard.createCursorKeys();

        this._debugger = new Debugger(this.game, this._player.children[0]);
    }

    update() {
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

    render() {
        this._debugger.render();
    }

}

export default GameState;
