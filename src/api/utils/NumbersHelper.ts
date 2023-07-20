export class NumbersHelper {

    isNullOrEmpty(input: string | number) {
        return (input === "" || input === undefined || input === null);
    }

    getNum(input: string | number) {
        if (this.isNullOrEmpty(input) || (typeof input === "number" && isNaN(input))) {
            return 0;
        }

        if (typeof input === "string") {
            return parseFloat(input);
        }

        return input;
    }

    round(value: number, position?: number): number {
        return Math.round(value);
    }
}