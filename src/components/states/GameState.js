import Phaser from 'phaser';

import Player from '../objects/Player';
// import Debugger from '../objects/Debugger';
import Fruit from '../objects/Fruit';

import NetworkHandler from 'src/components/objects/NetworkHandler';

class GameState extends Phaser.State {

    init(networkHandler) {
        this._networkHandler = networkHandler;
    }

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
        this.game.stage.setBackgroundColor(this.game.settings.BACKGROUND_COLOR);
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this._players = [];

        this._networkHandler.addOnPlayersChangedListener((players) => {

            for (const player of this._players) {
                player.destroy();
            }

            this._players = [];

            for (const playerModel of players) {
                const player = new Player(playerModel, this.game);

                this._players.push(player);
            }
        });

        // this._networkHandler.on("playersReceived", (payload) =>{
        //     console.log(paload);
        // });

        // this._networkHandler.connect();

        // this._player = new Player(this.game);

        // this._fruits = [];

        // for (let i = 0; i <= 1; i++) {
        //     this._spawnFruit();
        // }

        // this._cursorKeys = this.game.input.keyboard.createCursorKeys();

        // this._debugger = new Debugger(this.game, this._player.children[0]);
    }

    /**
     * Spawns a fruit on a random grid position.
     */
    _spawnFruit() {
        const fruit = new Fruit(this.game, this.game.getRandomGridPosition(), this.game.getRandomGridPosition());

        this._fruits.push(fruit);
    }

    _detectCollisions() {
        for (let fruit of this._fruits) {
            this.game.physics.arcade.collide(this._player, fruit);
        }
    }

    /**
     * NOTE: Called by the Phaser engine
     * Updates the game
     */
    update() {
        // TODO possibly move this to Player.js?
        // if (this._cursorKeys.left.isDown) {
        //     this._player.setDirection(constants.directions.LEFT);
        // } else if (this._cursorKeys.right.isDown) {
        //     this._player.setDirection(constants.directions.RIGHT);
        // } else if (this._cursorKeys.up.isDown) {
        //     this._player.setDirection(constants.directions.UP);
        // } else if (this._cursorKeys.down.isDown) {
        //     this._player.setDirection(constants.directions.DOWN);
        // }

        //this._player.move();
        // this._detectCollisions();
    }

    /**
     * NOTE: Called by the Phaser engine
     * Renders the game
     */
    render() {
        // this._debugger.render();
    }

}

export default GameState;
