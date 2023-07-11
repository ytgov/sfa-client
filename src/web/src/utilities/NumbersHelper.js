import { ValidationHelper } from "./ValidationHelper";

export class NumbersHelper {

    validationHelper;
    
    constructor() {
        this.validationHelper = new ValidationHelper();
    }

    getNum(input) {
        if (this.validationHelper.isNullOrEmpty(input) || isNaN(input)) {
            return 0;
        }

        return parseFloat(input);
    }

    round(input) {
        input = Math.round(this.getNum(input));
        return parseFloat(input);
    }
}