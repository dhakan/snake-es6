import Phaser from 'phaser';
import Player from '../objects/Player';
import Debugger from '../objects/Debugger';
import constants from '../utils/constants';

class GameState extends Phaser.State {

    /**
     * NOTE: Called by the Phaser engine
     * Preloads the game
     */
    preload() {
        this.game.load.image('square', 'images/square.png');
        this.game.load.image('fruit', 'images/fruit.png');
        this.game.load.image('snake', 'images/snake_body.png');
    }

    /**
     * NOTE: Called by the Phaser engine
     * Creates the game
     */
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.setBackgroundColor(constants.BACKGROUND_COLOR);
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this._player = new Player(this.game);

        this._cursorKeys = this.game.input.keyboard.createCursorKeys();

        this._debugger = new Debugger(this.game, this._player.children[0]);
    }

    /**
     * NOTE: Called by the Phaser engine
     * Updates the game
     */
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

    /**
     * NOTE: Called by the Phaser engine
     * Renders the game
     */
    render() {
        this._debugger.render();
    }

}

export default GameState;
