import BootState from '../states/BootState';
import LoadState from '../states/LoadState';
import GameState from '../states/GameState';
import Phaser from 'phaser';


class Game extends Phaser.Game {

    constructor() {
        super(500, 500, Phaser.AUTO, 'content', null);
        this.state.add('BootState', BootState, false);
        this.state.add('LoadState', LoadState, false);
        this.state.add('GameState', GameState, false);
        this.state.start('BootState');
    }
}

Game.PLAYER_MOVEMENT_SPEED = 1;
Game.directions = {
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left'
};

export default Game;