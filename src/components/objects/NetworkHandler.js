import io from 'socket.io-client';
import utils from 'src/components/utils/utils';

import PlayerModel from 'src/components/models/PlayerModel';
import FruitModel from 'src/components/models/FruitModel';
import GameStateModel from 'src/components/models/GameStateModel';

const YOU_CONNECTED = 'you-connected';

class NetworkHandler {

    /**
     * NetworkHandler constructor
     */
    constructor() {
        this._socket = null;
        this._onGameStateChangedCallbacks = [];
        this._onConnectionCallbacks = [];
        this._onGameRoundInitiatedCallbacks = [];

        this._messages = null;

        this._gameState = null;
        this._players = [];
        this._fruits = [];
    }

    get id() {
        return this._socket.id;
    }

    _onConnected(payload) {
        console.log('YOU_CONNECTED');

        this._messages = payload.settings.messages;

        for (const callback of this._onConnectionCallbacks) {
            callback(payload);
        }

        this._socket.on(this._messages.GAME_STATE, this._onGameStateReceived.bind(this));
        this._socket.on(this._messages.GAME_ROUND_INITIATED, this._onGameRoundInitiated.bind(this));
    }

    _onGameStateReceived(payload) {
        console.log('GAME STATE!');
        const players = payload.players;
        const fruits = payload.fruits;

        this._gameState = null;
        this._players = [];
        this._fruits = [];

        for (const player of players) {
            this._players.push(new PlayerModel(player));
        }

        for (const fruit of fruits) {
            this._fruits.push(new FruitModel(fruit));
        }

        this._gameState = new GameStateModel({
            players: this._players,
            fruits: this._fruits,
        });

        this._fireOnGameStateChanged();
    }

    _onGameRoundInitiated() {
        for (const callback of this._onGameRoundInitiatedCallbacks) {
            callback();
        }
    }

    _fireOnGameStateChanged() {
        for (const callback of this._onGameStateChangedCallbacks) {
            callback(this._gameState);
        }
    }

    connect() {
        if (utils.SERVER_HOST) {
            this._socket = io(utils.SERVER_HOST);
        } else {
            this._socket = io();
        }

        this._socket.on(YOU_CONNECTED, this._onConnected.bind(this));
    }

    sendPlayerAction(input) {
        this._socket.emit(this._messages.PLAYER_ACTION, input);
    }

    addOnGameStateChangedListener(callback) {
        this._onGameStateChangedCallbacks.push(callback);
    }

    addOnConnectionListener(callback) {
        this._onConnectionCallbacks.push(callback);
    }

    addOnGameRoundInitiatedListener(callback) {
        this._onGameRoundInitiatedCallbacks.push(callback);
    }

    emitClientLoaded() {
        this._socket.emit(this._messages.CLIENT_LOADED);
    }
}

export default NetworkHandler;
