import Phaser from 'phaser';

import GameState from '../states/GameState';
import constants from '../utils/constants';

class Game extends Phaser.Game {

    /**
     * Game constructor
     */
    constructor() {
        super(constants.world.WIDTH, constants.world.HEIGHT, Phaser.AUTO, 'content', null);
        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }

    /**
     * Generate random position based on grid size.
     */
    getRandomGridPosition() {
        const randomValueInRange = this.rnd.integerInRange(0, constants.world.WIDTH - constants.GRID_SIZE),
            result = Math.round(randomValueInRange / constants.GRID_SIZE) * constants.GRID_SIZE;

        return result;
    }
}

export default Game;