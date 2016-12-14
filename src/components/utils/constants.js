/**
 * Main constant values of the game
 * @type {{BACKGROUND_COLOR: string, GRID_SIZE: number, PLAYER_VELOCITY: number, PLAYER_FRAMERATE: number, directions: {UP: string, DOWN: string, RIGHT: string, LEFT: string}}}
 */
const constants = {
    BACKGROUND_COLOR: '#E43AF1',
    GRID_SIZE: 20,
    PLAYER_MOVE_TIMER: 50,
    directions: {
        UP: 'up',
        DOWN: 'down',
        RIGHT: 'right',
        LEFT: 'left'
    },
    world: {
        WIDTH: 800,
        HEIGHT: 500
    }
};

export default constants;
