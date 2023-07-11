import {ValidationHelper} from "@/utilities/ValidationHelper";

export class NumbersHelper {

    validationHelper;
    constructor() {
        this.validationHelper = new ValidationHelper();
    }
    getNum(input) {
        console.log(input);
        if (this.validationHelper.isNullOrEmpty(input) || isNaN(input)) {
            console.log("will return 0");
            return 0;
        }

        return parseFloat(input);
    }

    round(input) {
        input = Math.round(this.getNum(input));
        return parseFloat(input);
    }
}