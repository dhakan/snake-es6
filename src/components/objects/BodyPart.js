import Phaser from 'phaser';

class BodyPart extends Phaser.Sprite {

    /**
     * BodyPart constructor
     * @param {Phaser.Game} game the game by which to spawn the player
     */
    constructor(game, x, y, color) {
        super(game, x, y, 'snake');

        this.oldPos = {
            x: x,
            y: y
        };

        this.tint = Phaser.Color.hexToColor(color).color;

        this.width = this.game.settings.GRID_SIZE;
        this.height = this.game.settings.GRID_SIZE;
        this.game.physics.enable(this);
        // this.body.collideWorldBounds = true;
        this.body.onCollide = new Phaser.Signal();
    }

    get xPos() {
        return this.x;
    }

    set xPos(x) {
        this.oldPos.x = this.x;
        this.oldPos.y = this.y;
        this.x = x;
    }

    get yPos() {
        return this.y;
    }

    set yPos(y) {
        this.oldPos.x = this.x;
        this.oldPos.y = this.y;
        this.y = y;
    }

    addOnCollisionListener(callback) {
        this.body.onCollide.add(callback, this);
    }
}

export default BodyPart;
