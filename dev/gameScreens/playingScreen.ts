namespace GameScreens {
    // One of the screens: STRATEGY
    export class PlayingScreen implements GameScreen {
        public game:    Game;

        constructor(g: Game) {
            this.game = g;

            // Start playing the sound: HOWLER LIBRARY
            this.game.sound.play();

            if (this.game.sound.playing()) {
                console.log("Playing music!");
            }

            // Clear the message
            let message = document.getElementById("message");
            message.innerHTML = "";

            // Storing Plane in GameObjects array: POLYMORPHISM
            this.game.gameObjects.push(new GameObjects.Plane());

            // Set an interval to spawn a new cloud every two seconds
            this.game.timer = window.setInterval(() => this.createCloud(), 2000);
        }

        public onKeyDown(e: KeyboardEvent): void {
            // Call the event listener of the plane
            for (let g of this.game.gameObjects) {
                if (g instanceof GameObjects.Plane) {
                    g.onKeyDown(e);
                }
            }
        }

        public update(): void {
            // Move all GameObjects
            for (let g of this.game.gameObjects) {
                g.move();
            }

            // Update the score div
            let score = document.getElementById("score");
            score.innerHTML = "Score: " + this.game.score;
        }

        private createCloud(): void {
            // Create a new cloud and subscribe the plane to it
            let cloud = new GameObjects.Cloud();
            for (let g of this.game.gameObjects) {
                if (g instanceof GameObjects.Plane) {
                    cloud.subscribe(g);
                }
            }

            // Storing Cloud in GameObjects array: POLYMORPHISM
            this.game.gameObjects.push(cloud);
        }
    }
}