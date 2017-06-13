// NAMESPACE
namespace GameObjects {
    // GameObject class: ABSTRACT
    export abstract class GameObject {
        // Private properties: ENCAPSULATION
        private _x:         number;
        private _y:         number;
        private _width:     number;
        private _height:    number;
        private _speedX:    number = 0;
        private _speedY:    number = 0;
        private _div:       HTMLElement;

        // Getters and setters: ENCAPSULATION
        public get x(): number          { return this._x; }
        public set x(x: number)         { this._x = x; }

        public get y(): number          { return this._y; }
        public set y(y: number)         { this._y = y; }

        public get width(): number      { return this._width; }
        public set width(w: number)     { this._width = w; }

        public get height(): number     { return this._height; }
        public set height(h: number)    { this._height = h; }

        public get speedX(): number     { return this._speedX; }
        public set speedX(s: number)    { this._speedX = s;}

        public get speedY(): number     { return this._speedY; }
        public set speedY(s: number)    { this._speedY = s; }

        public get div(): HTMLElement   { return this._div; }

        constructor(tag: string) {
            // Create a div and append it to the container
            let container   = document.getElementById("container");
            this._div       = document.createElement(tag);
            container.appendChild(this._div);
        }

        // Method for drawing the GameObject
        protected draw(): void {
            this._div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
        }

        // Move method: ABSTRACT
        abstract move(): void;
    }
}