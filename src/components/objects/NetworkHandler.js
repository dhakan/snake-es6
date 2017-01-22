import io from 'socket.io-client'

import PlayerModel from 'src/components/models/PlayerModel';

const YOU_CONNECTED = 'you-connected';

class NetworkHandler {

    /**
     * NetworkHandler constructor
     */
    constructor() {
        this._onPlayersChangedCallbacks = [];
        this._onConnectionCallbacks = [];

        this._messages = null;

        this._players = [];
    }

    _onConnected(payload) {
        console.log('YOU_CONNECTED');

        this._messages = payload.settings.messages;

        for (const callback of this._onConnectionCallbacks) {
            callback(payload);
        }

        this._socket.on(this._messages.GAME_STARTED, this._onGameStarted.bind(this));
        this._socket.on(this._messages.PLAYERS, this._onPlayersReceived.bind(this));
    }

    _onGameStarted(payload) {
        console.log('GAME STARTED!');
    }

    _onPlayersReceived(payload) {
        const players = new Map(payload);

        this._players = [];

        for (const player of players.values()) {
            this._players.push(new PlayerModel(player));
        }

        this._fireOnPlayersChanged();
    }

    _fireOnPlayersChanged() {
        for (const callback of this._onPlayersChangedCallbacks) {
            callback(this._players);
        }
    }

    connect() {
        this._socket = io();

        this._socket.on(YOU_CONNECTED, this._onConnected.bind(this));
    }

    sendPlayerAction(input) {
        this._socket.emit(this._messages.PLAYER_ACTION, input);
    }

    addOnPlayersChangedListener(callback) {
        this._onPlayersChangedCallbacks.push(callback);
        callback(this._players);
    }

    addOnConnectionListener(callback) {
        this._onConnectionCallbacks.push(callback);
    }
}

export default NetworkHandler;
