export class ValidationHelper {
    isNullOrEmpty(input) {
        return (input === "" || input === undefined || input === null);
    }
}