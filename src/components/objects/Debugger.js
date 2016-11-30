import Phaser from 'phaser';

class Debugger {

    constructor(game, sprite) {
        this._game = game;
        this._sprite = sprite;
        this._KEY_DEBUG = this._game.input.keyboard.addKey(Phaser.Keyboard.D);
        this._showDebug = false;

        this._KEY_DEBUG.onDown.add(this._toggle.bind(this), this);
    }

    _toggle() {
        this._showDebug = (this._showDebug) ? false : true;

        if (!this._showDebug) {
            this._game.debug.reset();
        }
    }

    render() {
        if (this._showDebug) {
            this._game.debug.bodyInfo(this._sprite, 20, 20);
            this._game.debug.body(this._sprite, 20, 20);
        }
    }
}

export default Debugger;
