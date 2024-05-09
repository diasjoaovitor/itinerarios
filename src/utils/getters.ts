import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const getTimestamp = () => dayjs().utc().format('YYYY-MM-DDTHH:mm:ss')

export const getInsertIds = ({
  id,
  length
}: {
  id: number
  length: number
}) => {
  const ids = []
  for (let i = 0; i < length; i++) ids.push(id++)
  return ids
}
