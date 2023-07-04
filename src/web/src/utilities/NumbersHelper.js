import {ValidationHelper} from "@/utilities/ValidationHelper";

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
}