import Game from 'src/components/objects/Game';
import NetworkHandler from 'src/components/objects/NetworkHandler';

const networkHandler = new NetworkHandler();
let game;

networkHandler.on(NetworkHandler.events.CONNECTED, payload => {
    if (!game) {
        game = new Game(payload.settings, networkHandler);
    }
});

networkHandler.connect();