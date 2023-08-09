import moment from 'moment'

export default function momentDateFormat (date: Date, format: string) {
    return moment(date).format(format)
}
