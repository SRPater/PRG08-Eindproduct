namespace GameScreens {
    // One of the screens: STRATEGY
    export class StartScreen implements GameScreen {
        public game: Game;

        constructor(g: Game) {
            // Set the score to 0 and play the animations
            this.game = g;
            this.game.score = 0;
            this.game.playAnimations();

            // Set the start message
            let message = document.getElementById("message");
            message.innerHTML = "Try to dodge the clouds for as long as you can!<br/>Press SPACE to start!";

            // Set the score div
            let score = document.getElementById("score");
            score.innerHTML = "Score: " + this.game.score;
        }

        public onKeyDown(e: KeyboardEvent): void {
            // Set the active screen to a PlayingScreen if the spacebar is pressed
            if (e.key == " ") {
                this.game.setScreen(Screens.PLAYING);
            }
        }
    }
}