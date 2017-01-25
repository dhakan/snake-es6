class GameStateModel {

    /**
     * GameStateModel constructor
     */
    constructor(data) {
        this._players = data.players;
        this._fruits = data.fruits;
    }

    get players() {
        return this._players;
    }

    get fruits() {
        return this._fruits;
    }
}

export default GameStateModel;