import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const getTimestamp = () => dayjs().utc().format('YYYY-MM-DDTHH:mm:ss')
