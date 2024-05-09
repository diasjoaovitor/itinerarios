import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const localToUTC = (date: string) =>
  dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
