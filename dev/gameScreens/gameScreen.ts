// NAMESPACE
namespace GameScreens {
    // Interface for different screens: STRATEGY & INTERFACE
    export interface GameScreen {
        game: Game;

        onKeyDown(e: KeyboardEvent): void;
    }
}