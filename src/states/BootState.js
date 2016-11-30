import Phaser from 'phaser';

class BootState extends Phaser.State {

    preload() {
        /*
         Load all game assets
         Place your load bar, some messages.
         In this case of loading, only text is placed...
         */

        //Load your images, spritesheets, bitmaps...


        //Load your sounds, efx, music...
        //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');

        //Load your data, JSON, Querys...
        //Example: game.load.json('version', 'http://phaser.io/version.json');
    }

    create() {
        console.log('Entered boot state');
        //Initial GameSystem (Arcade, P2, Ninja)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.stage.setBackgroundColor('#E43AF1');

        //Initial Load State
        this.game.state.start('LoadState');
    }
}

export default BootState;