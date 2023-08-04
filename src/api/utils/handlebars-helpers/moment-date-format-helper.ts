import moment from 'moment'

export default function momentDateFormatHelper (date: Date, format: string) {
    return moment(date).format(format)
}
