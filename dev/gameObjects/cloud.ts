/// <reference path="gameObject.ts" />

namespace GameObjects {
    // Cloud is GameObject: INHERITANCE
    // Cloud is a subject: OBSERVER
    export class Cloud extends GameObject implements Subject {
        public observers: Array<Observer> = new Array<Observer>();

        constructor() {
            super("cloud");

            this.x      = 1152;
            this.y      = Math.floor(Math.random() * 248 + 1);
            this.width  = 100;
            this.height = 52;
            this.speedX = (Math.floor(Math.random() * 6 + 1));

            // Draw the cloud
            this.draw();
        }

        // Method for subscribing observers to this subject
        public subscribe(o: Observer) {
            this.observers.push(o);
        }

        public move(): void {
            // Move the cloud to the left
            this.x -= this.speedX;

            // If the cloud goes off screen, notify the observers and remove the cloud
            if (this.x + this.width < 0) {
                for (let o of this.observers) {
                    o.notify();
                }

                let g = Game.getInstance();
                g.removeCloud(this);
            }

            // Draw the cloud again
            this.draw();
        }
    }
}