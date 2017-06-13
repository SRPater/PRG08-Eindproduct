// Subject interface: OBSERVER & INTERFACE
interface Subject {
    observers: Array<Observer>;

    subscribe(o: Observer): void;
}