namespace GameScreens {
    // One of the screens: STRATEGY
    export class EndScreen implements GameScreen {
        public game: Game;

        constructor(g: Game) {
            // Pause the animations
            this.game = g;
            this.game.pauseAnimations();

            // Stop playing the music: HOWLER LIBRARY
            this.game.sound.stop();

            // Remove the plane and all clouds
            for (let g of this.game.gameObjects) {
                g.div.remove();
            }
            this.game.gameObjects = [];

            // Clear the interval which spawns new clouds
            window.clearInterval(this.game.timer);

            // Set the game over message
            let message = document.getElementById("message");
            message.innerHTML = "GAME OVER!<br/>Your score is: " + this.game.score +
                "<br/>Press SPACE to play again!";
        }

        public onKeyDown(e: KeyboardEvent) {
            // Set the active screen to a StartScreen if the spacebar is pressed
            if (e.key == " ") {
                this.game.setScreen(Screens.START);
            }
        }
    }
}