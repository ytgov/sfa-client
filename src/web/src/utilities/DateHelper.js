import moment from "moment";

export class DateHelper {
        
    getDateFromUTC(input) {        
        return moment.utc(input).format("YYYY-MM-DD");
    }
}