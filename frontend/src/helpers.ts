import { format } from 'date-fns'

export const formatDate = (date: string | Date) => format(new Date(date), 'dd/MM/yyyy')
