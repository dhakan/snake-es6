import Game from 'src/components/objects/Game';
import NetworkHandler from 'src/components/objects/NetworkHandler';

const networkHandler = new NetworkHandler();
let game;

networkHandler.addOnConnectionListener((payload) => {
    if (!game) {
        game = new Game(payload.settings, networkHandler);
    }
});

networkHandler.connect();