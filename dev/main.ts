/// <reference types="howler" />

// ENUMERATIONS
enum Screens {
    START,
    PLAYING,
    END
}

class Game {
    // Instance property: SINGLETON & STATIC
    private static instance: Game;
    
    // Private properties: ENCAPSULATION
    // Game has GameObjects: COMPOSITION
    private activeScreen:   GameScreens.GameScreen;
    private _gameObjects:   Array<GameObjects.GameObject> = new Array<GameObjects.GameObject>();
    private _score:         number;
    private _timer:         number;
    private _sound:         Howl;

    // Getters and setters: ENCAPSULATION
    public get score(): number  { return this._score; }
    public set score(s: number) { this._score = s; }

    public get gameObjects(): Array<GameObjects.GameObject>     { return this._gameObjects; }
    public set gameObjects(a: Array<GameObjects.GameObject>)    { this._gameObjects = a; }

    public get timer(): number  { return this._timer; }
    public set timer(t: number) { this._timer = t; }

    public get sound(): Howl    { return this._sound; }

    private constructor() {
        // Set the source for the music: HOWLER LIBRARY
        this._sound = new Howl({
            src:        ['music.mp3'],
            autoplay:   false,
            loop:       true
        });

        // Set the active screen to a start screen
        this.setScreen(Screens.START);

        // Add an event listener for key presses
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));

        // Call the game loop
        requestAnimationFrame(() => this.gameLoop());
    }

    private onKeyDown(e: KeyboardEvent) {
        // Call the event handler for the active screen
        this.activeScreen.onKeyDown(e);
    }

    // GAMELOOP
    private gameLoop(): void {
        // Update if the active screen is a PlayingScreen
        if (this.activeScreen instanceof GameScreens.PlayingScreen) {
            this.activeScreen.update();
        }

        // Call the game loop again
        requestAnimationFrame(() => this.gameLoop());
    }

    // Method for retrieving instance: SINGLETON & STATIC
    public static getInstance(): Game {
        // Create a new instance if there isn't one yet
        if (!Game.instance) {
            Game.instance = new Game();
        }

        return Game.instance;
    }

    public setScreen(screen: Screens): void {
        // Set the active screen to the right one
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
    }

    // Method for starting the sky and forest animations
    public playAnimations(): void {
        let sky = document.getElementById("sky");
        sky.classList.remove("paused");

        let forest = document.getElementById("forest");
        forest.classList.remove("paused");
    }

    // Method for pausing the sky and forest animations
    public pauseAnimations(): void {
        let sky = document.getElementById("sky");
        sky.classList.add("paused");

        let forest = document.getElementById("forest");
        forest.classList.add("paused");
    }

    // Method for removing clouds
    public removeCloud(c: GameObjects.Cloud): void {
        c.div.remove();
        let i = this._gameObjects.indexOf(c);
        this._gameObjects.splice(i, 1);
    }
}

// Start the game
window.addEventListener("load", function() {
    Game.getInstance();
})