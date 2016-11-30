(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/index.js", function(exports, require, module) {
'use strict';

var _Game = require('src/objects/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Game2.default();
});

require.register("src/objects/BodyPart.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyPart = function (_Phaser$Sprite) {
    _inherits(BodyPart, _Phaser$Sprite);

    function BodyPart(game, x, y) {
        _classCallCheck(this, BodyPart);

        var _this = _possibleConstructorReturn(this, (BodyPart.__proto__ || Object.getPrototypeOf(BodyPart)).call(this, game, x, y, 'square'));

        _this.width = x;
        _this.height = y;
        return _this;
    }

    return BodyPart;
}(_phaser2.default.Sprite);

exports.default = BodyPart;
});

require.register("src/objects/Game.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BootState = require('../states/BootState');

var _BootState2 = _interopRequireDefault(_BootState);

var _LoadState = require('../states/LoadState');

var _LoadState2 = _interopRequireDefault(_LoadState);

var _GameState = require('../states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 500, 500, _phaser2.default.AUTO, 'content', null));

        _this.state.add('BootState', _BootState2.default, false);
        _this.state.add('LoadState', _LoadState2.default, false);
        _this.state.add('GameState', _GameState2.default, false);
        _this.state.start('BootState');
        return _this;
    }

    return Game;
}(_phaser2.default.Game);

Game.PLAYER_MOVEMENT_SPEED = 1;
Game.directions = {
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left'
};

exports.default = Game;
});

require.register("src/objects/Player.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

var _BodyPart = require('./BodyPart');

var _BodyPart2 = _interopRequireDefault(_BodyPart);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Phaser$Group) {
    _inherits(Player, _Phaser$Group);

    function Player(game, gridSize) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game));

        _this._gridSize = gridSize;
        _this._direction = 'right';
        _this.expandBody();
        return _this;
    }

    _createClass(Player, [{
        key: 'expandBody',
        value: function expandBody() {
            var bodyPart = new _BodyPart2.default(this.game, this._gridSize.width, this._gridSize.height);
            this.add(bodyPart);
        }
    }, {
        key: 'setDirection',
        value: function setDirection(newDirection) {
            this._direction = newDirection;
        }
    }, {
        key: 'move',
        value: function move() {
            console.log('move');

            if (this._direction === _Game2.default.directions.LEFT) {
                this.x += -_Game2.default.PLAYER_MOVEMENT_SPEED;
            } else if (this._direction === _Game2.default.directions.RIGHT) {
                this.x += _Game2.default.PLAYER_MOVEMENT_SPEED;
            } else if (this._direction === _Game2.default.directions.UP) {
                this.y += -_Game2.default.PLAYER_MOVEMENT_SPEED;
            } else {
                this.y += _Game2.default.PLAYER_MOVEMENT_SPEED;
            }
        }
    }]);

    return Player;
}(_phaser2.default.Group);

exports.default = Player;
});

require.register("src/objects/RainbowText.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RainbowText = function (_Phaser$Text) {
    _inherits(RainbowText, _Phaser$Text);

    function RainbowText(game, x, y, text) {
        _classCallCheck(this, RainbowText);

        var _this = _possibleConstructorReturn(this, (RainbowText.__proto__ || Object.getPrototypeOf(RainbowText)).call(this, game, x, y, text, { font: "45px Arial", fill: "#ff0044", align: "center" }));

        _this._speed = 10; //ms
        _this._colorIndex = 0;
        _this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];

        _this.colorize();
        _this.startTimer();

        _this.game.stage.addChild(_this);

        return _this;
    }

    _createClass(RainbowText, [{
        key: "startTimer",
        value: function startTimer() {
            //this.game.time.events.loop(this._speed, this.colorize, this).timer.start();
            this.game.time.events.loop(this._speed, this.log, this).timer.start();
        }
    }, {
        key: "log",
        value: function log() {
            console.log('haha');
        }
    }, {
        key: "colorize",
        value: function colorize() {

            for (var i = 0; i < this.text.length; i++) {

                if (this._colorIndex === this._colors.length) {
                    this._colorIndex = 0;
                }

                this.addColor(this._colors[this._colorIndex], i);
                this._colorIndex++;
            }
        }
    }]);

    return RainbowText;
}(Phaser.Text);

exports.default = RainbowText;
});

require.register("src/states/BootState.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = function (_Phaser$State) {
    _inherits(BootState, _Phaser$State);

    function BootState() {
        _classCallCheck(this, BootState);

        return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
    }

    _createClass(BootState, [{
        key: 'preload',
        value: function preload() {
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
    }, {
        key: 'create',
        value: function create() {
            console.log('Entered boot state');
            //Initial GameSystem (Arcade, P2, Ninja)
            this.game.physics.startSystem(_phaser2.default.Physics.ARCADE);

            this.game.stage.setBackgroundColor('#dedede');

            //Initial Load State
            this.game.state.start('LoadState');
        }
    }]);

    return BootState;
}(_phaser2.default.State);

exports.default = BootState;
});

require.register("src/states/GameState.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('../objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

var _Game = require('../objects/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Phaser$State) {
    _inherits(GameState, _Phaser$State);

    function GameState() {
        _classCallCheck(this, GameState);

        return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {
            this.game.load.image('square', 'images/square.png');
            this.game.load.image('fruit', 'images/fruit.png');
        }
    }, {
        key: 'create',
        value: function create() {
            console.log('Entered game state!');

            var gridSize = {
                width: 10,
                height: 10
            };

            this._player = new _Player2.default(this.game, gridSize);

            this._cursors = this.game.input.keyboard.createCursorKeys();
        }
    }, {
        key: 'update',
        value: function update() {
            console.log('Update function');

            if (this._cursors.left.isDown) {
                this._player.setDirection(_Game2.default.directions.LEFT);
            } else if (this._cursors.right.isDown) {
                this._player.setDirection(_Game2.default.directions.RIGHT);
            } else if (this._cursors.up.isDown) {
                this._player.setDirection(_Game2.default.directions.UP);
            } else if (this._cursors.down.isDown) {
                this._player.setDirection(_Game2.default.directions.DOWN);
            }

            this._player.move();
        }
    }]);

    return GameState;
}(_phaser2.default.State);

exports.default = GameState;
});

require.register("src/states/LoadState.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = require('phaser');

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadState = function (_Phaser$State) {
    _inherits(LoadState, _Phaser$State);

    function LoadState() {
        _classCallCheck(this, LoadState);

        return _possibleConstructorReturn(this, (LoadState.__proto__ || Object.getPrototypeOf(LoadState)).apply(this, arguments));
    }

    _createClass(LoadState, [{
        key: 'preload',
        value: function preload() {
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
    }, {
        key: 'create',
        value: function create() {
            console.log('Entered load!');
            this.game.scale.fullScreenScaleMode = _phaser2.default.ScaleManager.EXACT_FIT;
            this.game.state.start('GameState');
        }
    }]);

    return LoadState;
}(_phaser2.default.State);

exports.default = LoadState;
});

require.alias("node-browser-modules/node_modules/buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.PIXI = require("phaser/build/custom/pixi");
window.p2 = require("phaser/build/custom/p2");
window.Phaser = require("phaser/build/custom/phaser-split");


});})();require('___globals___');


//# sourceMappingURL=app.js.map