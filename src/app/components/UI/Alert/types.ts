export type TAlertSeverity = 'error' | 'success'

export type TAlertProps = {
  open: boolean
  title: string
  severity: TAlertSeverity
}
