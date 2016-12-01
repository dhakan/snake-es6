import Phaser from 'phaser';
import Player from '../objects/Player';
import Debugger from '../objects/Debugger';
import constants from '../utils/constants';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('square', 'images/square.png');
        this.game.load.image('fruit', 'images/fruit.png');
        this.game.load.spritesheet('snake', 'images/snakes.png', 79, 87, 11);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.setBackgroundColor(constants.BACKGROUND_COLOR);
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this._player = new Player(this.game);

        this._cursorKeys = this.game.input.keyboard.createCursorKeys();

        this._debugger = new Debugger(this.game, this._player.children[0]);
    }

    update() {
        if (this._cursorKeys.left.isDown) {
            this._player.setDirection(constants.directions.LEFT);
        } else if (this._cursorKeys.right.isDown) {
            this._player.setDirection(constants.directions.RIGHT);
        } else if (this._cursorKeys.up.isDown) {
            this._player.setDirection(constants.directions.UP);
        } else if (this._cursorKeys.down.isDown) {
            this._player.setDirection(constants.directions.DOWN);
        }

        this._player.move();
    }

    render() {
        this._debugger.render();
    }

}

export default GameState;
