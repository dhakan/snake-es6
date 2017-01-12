import Phaser from 'phaser';

class Fruit extends Phaser.Sprite {

    /**
     * Fruit constructor
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(game, x, y) {
        super(game, x, y, 'fruit');

        // this.width = constants.GRID_SIZE;
        // this.height = constants.GRID_SIZE;
        this.game.physics.enable(this);
        this.body.onCollide = new Phaser.Signal();
        this.addOnCollisionListener(this._handleCollision, this);

        game.add.existing(this);
    }

    _handleCollision() {
        this.kill();
    }

    addOnCollisionListener(callback) {
        this.body.onCollide.add(callback, this);
    }
}

export default Fruit;