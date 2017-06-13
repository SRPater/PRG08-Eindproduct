namespace GameObjects {
    // Plane is a GameObject: INHERITANCE
    // Plane is an observer: OBSERVER
    export class Plane extends GameObject implements Observer {
        constructor() {
            super("plane");

            this.x = 40;
            this.y = 123;
            this.width = 100;
            this.height = 55;

            // Add an event listener for when a key is released
            window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

            // Draw the plane
            this.draw();
        }

        public move(): void {
            // Only move horizontally when not touching the left and right edges
            if (this.x > 0 && this.speedX < 0 || this.x + this.width < 1152 && this.speedX > 0) {
                this.x += this.speedX;
            }

            // Only move vertically when not touching the upper and lower edges
            if (this.y > 0 && this.speedY < 0 || this.y + this.height < 300 && this.speedY > 0) {
                this.y += this.speedY;
            }

            // Check for collision and set the active screen to and EndScreen when there is
            let game = Game.getInstance();
            for (let g of game.gameObjects) {
                if (g != this && Utils.checkCollision(this, g)) {
                    game.setScreen(Screens.END);
                }
            }
            
            // Draw the plane again
            this.draw();
        }

        public onKeyDown(e: KeyboardEvent) {
            // Set the horizontal or vertical speed based on which key is pressed
            switch (e.keyCode) {
                case 37: // Left Arrow
                case 65: // A
                    this.speedX = -5;
                    break;
                case 38: // Up Arrow
                case 87: // W
                    this.speedY = -5;
                    break;
                case 39: // Right Arrow
                case 68: // D
                    this.speedX = 5;
                    break;
                case 40: // Down Arrow
                case 83: // S
                    this.speedY = 5;
                    break;
            }
        }

        public onKeyUp(e: KeyboardEvent) {
            // Set the horizontal speed back to 0 based on which key is released
            if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 68) {
                // Left or Right Arrow or A or D
                this.speedX = 0;
            } else if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 87 || e.keyCode == 83) {
                // Up or Down Arrow or W or S
                this.speedY = 0;
            }
        }

        public notify(): void {
            // Update the score
            let g = Game.getInstance();
            g.score += 10;
        }
    }
}