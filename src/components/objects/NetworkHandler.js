import io from 'socket.io-client';
import EventEmitter from 'eventemitter3';

import utils from 'src/components/utils/utils';

import PlayerModel from 'src/components/models/PlayerModel';
import FruitModel from 'src/components/models/FruitModel';
import GameStateModel from 'src/components/models/GameStateModel';

const YOU_CONNECTED = 'you-connected';

class NetworkHandler extends EventEmitter {

    /**
     * NetworkHandler constructor
     */
    constructor() {
        super();

        this._socket = null;
        this._messages = null;

        this._players = [];
        this._fruits = [];
    }

    get id() {
        return this._socket.id;
    }

    _onConnected(payload) {
        console.log('YOU_CONNECTED');

        this._messages = payload.settings.messages;

        this._socket.on(this._messages.GAME_STATE, this._onGameStateReceived.bind(this));
        this._socket.on(this._messages.GAME_ROUND_INITIATED, this._onGameRoundInitiated.bind(this));
        this._socket.on(this._messages.GAME_ROUND_COUNTDOWN, this._onGameRoundCountdown.bind(this));

        this.emit(NetworkHandler.events.CONNECTED, payload);
    }

    _onGameStateReceived(payload) {
        console.log('GAME STATE!');
        const players = payload.players;
        const fruits = payload.fruits;

        this._players = [];
        this._fruits = [];

        for (const player of players) {
            this._players.push(new PlayerModel(player));
        }

        for (const fruit of fruits) {
            this._fruits.push(new FruitModel(fruit));
        }

        const gameState = new GameStateModel({
            players: this._players,
            fruits: this._fruits,
        });

        this.emit(NetworkHandler.events.GAME_STATE, gameState);
    }

    _onGameRoundInitiated() {
        this.emit(NetworkHandler.events.GAME_ROUND_INITIATED);
    }

    _onGameRoundCountdown(payload) {
        this.emit(NetworkHandler.events.GAME_ROUND_COUNTDOWN, payload);
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

    emitClientLoaded() {
        this._socket.emit(this._messages.CLIENT_LOADED);
    }
}

NetworkHandler.events = {
    CONNECTED: 'on-connected',
    GAME_STATE: 'on-game-state',
    GAME_ROUND_INITIATED: 'on-game-round-initiated',
    GAME_ROUND_COUNTDOWN: 'on-game-round-countdown',
};

export default NetworkHandler;
