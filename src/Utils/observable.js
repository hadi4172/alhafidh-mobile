/** Observer class observer boss */
export default class Observable {

    observers = [];

    
    /** 
     * Add an observer to the observer list
     * @param observer
     */
    addObserver(observer) {
        observers.add(observer);
        return this;
    }

    
    /** 
     * Remove an observer from the observer list
     * @param observer
     */
    removeObserver(observer) {
        observers.remove(observer);
        return this;
    }

    
    /** 
     * Notify all observers of a change
     * @param message
     */
    notifyAllObservers(message) {
        for (let observer of this.observers) {
            observer.update(message);
        }
    }
}