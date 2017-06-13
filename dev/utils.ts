class Utils {
    // Method for checking collision: STATIC
    public static checkCollision(m: GameObjects.GameObject, n: GameObjects.GameObject): boolean {
        return (m.x < n.x + n.width &&
            m.x + m.width > n.x &&
            m.y < n.y + n.height &&
            m.height + m.y > n.y);
    }
}