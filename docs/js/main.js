var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Screens;
(function (Screens) {
    Screens[Screens["START"] = 0] = "START";
    Screens[Screens["PLAYING"] = 1] = "PLAYING";
    Screens[Screens["END"] = 2] = "END";
})(Screens || (Screens = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this._gameObjects = new Array();
        this._sound = new Howl({
            src: ['music.mp3'],
            autoplay: false,
            loop: true
        });
        this.setScreen(Screens.START);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Object.defineProperty(Game.prototype, "score", {
        get: function () { return this._score; },
        set: function (s) { this._score = s; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gameObjects", {
        get: function () { return this._gameObjects; },
        set: function (a) { this._gameObjects = a; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "timer", {
        get: function () { return this._timer; },
        set: function (t) { this._timer = t; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "sound", {
        get: function () { return this._sound; },
        enumerable: true,
        configurable: true
    });
    Game.prototype.onKeyDown = function (e) {
        this.activeScreen.onKeyDown(e);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.activeScreen instanceof GameScreens.PlayingScreen) {
            this.activeScreen.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.setScreen = function (screen) {
        switch (screen) {
            case Screens.START:
                this.activeScreen = new GameScreens.StartScreen(this);
                break;
            case Screens.PLAYING:
                this.activeScreen = new GameScreens.PlayingScreen(this);
                break;
            case Screens.END:
                this.activeScreen = new GameScreens.EndScreen(this);
                break;
        }
    };
    Game.prototype.playAnimations = function () {
        var sky = document.getElementById("sky");
        sky.classList.remove("paused");
        var forest = document.getElementById("forest");
        forest.classList.remove("paused");
    };
    Game.prototype.pauseAnimations = function () {
        var sky = document.getElementById("sky");
        sky.classList.add("paused");
        var forest = document.getElementById("forest");
        forest.classList.add("paused");
    };
    Game.prototype.removeCloud = function (c) {
        c.div.remove();
        var i = this._gameObjects.indexOf(c);
        this._gameObjects.splice(i, 1);
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (m, n) {
        return (m.x < n.x + n.width &&
            m.x + m.width > n.x &&
            m.y < n.y + n.height &&
            m.height + m.y > n.y);
    };
    return Utils;
}());
var GameObjects;
(function (GameObjects) {
    var GameObject = (function () {
        function GameObject(tag) {
            this._speedX = 0;
            this._speedY = 0;
            var container = document.getElementById("container");
            this._div = document.createElement(tag);
            container.appendChild(this._div);
        }
        Object.defineProperty(GameObject.prototype, "x", {
            get: function () { return this._x; },
            set: function (x) { this._x = x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "y", {
            get: function () { return this._y; },
            set: function (y) { this._y = y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "width", {
            get: function () { return this._width; },
            set: function (w) { this._width = w; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () { return this._height; },
            set: function (h) { this._height = h; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "speedX", {
            get: function () { return this._speedX; },
            set: function (s) { this._speedX = s; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "speedY", {
            get: function () { return this._speedY; },
            set: function (s) { this._speedY = s; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "div", {
            get: function () { return this._div; },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.draw = function () {
            this._div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
        };
        return GameObject;
    }());
    GameObjects.GameObject = GameObject;
})(GameObjects || (GameObjects = {}));
var GameObjects;
(function (GameObjects) {
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            var _this = _super.call(this, "cloud") || this;
            _this.observers = new Array();
            _this.x = 1152;
            _this.y = Math.floor(Math.random() * 248 + 1);
            _this.width = 100;
            _this.height = 52;
            _this.speedX = (Math.floor(Math.random() * 6 + 1));
            _this.draw();
            return _this;
        }
        Cloud.prototype.subscribe = function (o) {
            this.observers.push(o);
        };
        Cloud.prototype.move = function () {
            this.x -= this.speedX;
            if (this.x + this.width < 0) {
                for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                    var o = _a[_i];
                    o.notify();
                }
                var g = Game.getInstance();
                g.removeCloud(this);
            }
            this.draw();
        };
        return Cloud;
    }(GameObjects.GameObject));
    GameObjects.Cloud = Cloud;
})(GameObjects || (GameObjects = {}));
var GameObjects;
(function (GameObjects) {
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.x = 40;
            _this.y = 123;
            _this.width = 100;
            _this.height = 55;
            window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
            _this.draw();
            return _this;
        }
        Plane.prototype.move = function () {
            if (this.x > 0 && this.speedX < 0 || this.x + this.width < 1152 && this.speedX > 0) {
                this.x += this.speedX;
            }
            if (this.y > 0 && this.speedY < 0 || this.y + this.height < 300 && this.speedY > 0) {
                this.y += this.speedY;
            }
            var game = Game.getInstance();
            for (var _i = 0, _a = game.gameObjects; _i < _a.length; _i++) {
                var g = _a[_i];
                if (g != this && Utils.checkCollision(this, g)) {
                    game.setScreen(Screens.END);
                }
            }
            this.draw();
        };
        Plane.prototype.onKeyDown = function (e) {
            switch (e.keyCode) {
                case 37:
                case 65:
                    this.speedX = -5;
                    break;
                case 38:
                case 87:
                    this.speedY = -5;
                    break;
                case 39:
                case 68:
                    this.speedX = 5;
                    break;
                case 40:
                case 83:
                    this.speedY = 5;
                    break;
            }
        };
        Plane.prototype.onKeyUp = function (e) {
            if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68) {
                this.speedX = 0;
            }
            else if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 87 || e.keyCode == 83) {
                this.speedY = 0;
            }
        };
        Plane.prototype.notify = function () {
            var g = Game.getInstance();
            g.score += 10;
        };
        return Plane;
    }(GameObjects.GameObject));
    GameObjects.Plane = Plane;
})(GameObjects || (GameObjects = {}));
var GameScreens;
(function (GameScreens) {
    var EndScreen = (function () {
        function EndScreen(g) {
            this.game = g;
            this.game.pauseAnimations();
            this.game.sound.stop();
            for (var _i = 0, _a = this.game.gameObjects; _i < _a.length; _i++) {
                var g_1 = _a[_i];
                g_1.div.remove();
            }
            this.game.gameObjects = [];
            window.clearInterval(this.game.timer);
            var message = document.getElementById("message");
            message.innerHTML = "GAME OVER!<br/>Your score is: " + this.game.score +
                "<br/>Press SPACE to play again!";
        }
        EndScreen.prototype.onKeyDown = function (e) {
            if (e.key == " ") {
                this.game.setScreen(Screens.START);
            }
        };
        return EndScreen;
    }());
    GameScreens.EndScreen = EndScreen;
})(GameScreens || (GameScreens = {}));
var GameScreens;
(function (GameScreens) {
    var PlayingScreen = (function () {
        function PlayingScreen(g) {
            var _this = this;
            this.game = g;
            this.game.sound.play();
            if (this.game.sound.playing()) {
                console.log("Playing music!");
            }
            var message = document.getElementById("message");
            message.innerHTML = "";
            this.game.gameObjects.push(new GameObjects.Plane());
            this.game.timer = window.setInterval(function () { return _this.createCloud(); }, 2000);
        }
        PlayingScreen.prototype.onKeyDown = function (e) {
            for (var _i = 0, _a = this.game.gameObjects; _i < _a.length; _i++) {
                var g = _a[_i];
                if (g instanceof GameObjects.Plane) {
                    g.onKeyDown(e);
                }
            }
        };
        PlayingScreen.prototype.update = function () {
            for (var _i = 0, _a = this.game.gameObjects; _i < _a.length; _i++) {
                var g = _a[_i];
                g.move();
            }
            var score = document.getElementById("score");
            score.innerHTML = "Score: " + this.game.score;
        };
        PlayingScreen.prototype.createCloud = function () {
            var cloud = new GameObjects.Cloud();
            for (var _i = 0, _a = this.game.gameObjects; _i < _a.length; _i++) {
                var g = _a[_i];
                if (g instanceof GameObjects.Plane) {
                    cloud.subscribe(g);
                }
            }
            this.game.gameObjects.push(cloud);
        };
        return PlayingScreen;
    }());
    GameScreens.PlayingScreen = PlayingScreen;
})(GameScreens || (GameScreens = {}));
var GameScreens;
(function (GameScreens) {
    var StartScreen = (function () {
        function StartScreen(g) {
            this.game = g;
            this.game.score = 0;
            this.game.playAnimations();
            var message = document.getElementById("message");
            message.innerHTML = "Try to dodge the clouds for as long as you can!<br/>Press SPACE to start!";
            var score = document.getElementById("score");
            score.innerHTML = "Score: " + this.game.score;
        }
        StartScreen.prototype.onKeyDown = function (e) {
            if (e.key == " ") {
                this.game.setScreen(Screens.PLAYING);
            }
        };
        return StartScreen;
    }());
    GameScreens.StartScreen = StartScreen;
})(GameScreens || (GameScreens = {}));
//# sourceMappingURL=main.js.map