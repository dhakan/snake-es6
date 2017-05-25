import Phaser from 'phaser';

import Player from '../objects/Player';
// import Debugger from '../objects/Debugger';
import Fruit from '../objects/Fruit';

import NetworkHandler from 'src/components/objects/NetworkHandler';

class GameState extends Phaser.State {

    _createStageBorder(color) {
        const canvas = document.querySelector('canvas');
        canvas.style.border = `10px solid ${color}`;
    }

    _setCountdownValue(value) {
        const countdown = document.querySelector('.countdown');
        countdown.innerHTML = value;
    }

    _renderPlayers(players) {
        for (const player of this._players) {
            player.destroy();
        }

        this._players = [];

        for (const playerModel of players) {
            const player = new Player(playerModel, this.game);

            this._players.push(player);

            if (playerModel.id === this._networkHandler.id) {
                this._createStageBorder(playerModel.color);
            }
        }
    }

    _killFruits() {
        for (const fruit of this._fruits) {
            fruit.kill();
        }

        this._fruits = [];
    }

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
        this._fruits = [];

        this._networkHandler.emitClientLoaded();

        this._networkHandler.on(NetworkHandler.events.ROOM_STATE, payload => {
            this._killFruits();
            this._renderPlayers(payload.players);
        });

        this._networkHandler.on(NetworkHandler.events.GAME_ROUND_INITIATED, payload => {
            this._killFruits();
            this._renderPlayers(payload.players);
        });

        this._networkHandler.on(NetworkHandler.events.GAME_ROUND_COUNTDOWN, countdownValue => {
            this._setCountdownValue(countdownValue);
        });

        this._networkHandler.on(NetworkHandler.events.GAME_STATE, gameState => {
            this._killFruits();

            for (const fruitModel of gameState.fruits) {
                this._spawnFruit(fruitModel);
            }

            this._renderPlayers(gameState.players);
        });

        this._cursorKeys = this.game.input.keyboard.createCursorKeys();

        this._currentDirection = null;
        this._oldDirection = null;
    }

    /**
     * Spawns a fruit on a random grid position.
     */
    _spawnFruit(fruitModel) {
        const fruit = new Fruit(this.game, fruitModel.x, fruitModel.y);

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
        if (this._cursorKeys.left.isDown) {
            this._currentDirection = this.game.settings.playerActions.LEFT;
        } else if (this._cursorKeys.right.isDown) {
            this._currentDirection = this.game.settings.playerActions.RIGHT;
        } else if (this._cursorKeys.up.isDown) {
            this._currentDirection = this.game.settings.playerActions.UP;
        } else if (this._cursorKeys.down.isDown) {
            this._currentDirection = this.game.settings.playerActions.DOWN;
        }

        if (this._currentDirection !== this._oldDirection) {
            this._networkHandler.sendPlayerAction(this._currentDirection);
        }

        this._oldDirection = this._currentDirection;

        //this._player.move();
        // this._detectCollisions();
    }

    /**
     * NOTE: Called by the Phaser engine
     * Renders the game
     */
    render() {
        // this.game.debug.geom(this._stageBorder);
        // this._debugger.render();
    }
}

export default GameState;
