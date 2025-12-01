export class DiscountContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    apply(price) {
        return this.strategy.apply(price);
    }
}
