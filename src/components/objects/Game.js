import Phaser from 'phaser';
import GameState from '../states/GameState';

class Game extends Phaser.Game {

    /**
     * Game constructor
     */
    constructor() {
        super(800, 500, Phaser.AUTO, 'content', null);
        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }
}

export default Game;