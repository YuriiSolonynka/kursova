export class DiscountStrategy {
    apply(price) {
        return price;
    }
}

export class PhoneDiscountStrategy extends DiscountStrategy {
    apply(price) {
        return +(price * 0.95).toFixed(2);
    }
}

export class NoDiscountStrategy extends DiscountStrategy {
    apply(price) {
        return price;
    }
}
