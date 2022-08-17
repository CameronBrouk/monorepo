import { callFirebaseFunction } from '../firestore/firestore.helpers'
import { User } from '../user'

type GetAttendeesParams = {
  productType: 'groupClasses' | 'events'
  productId: string
}
type GetAttendeesResponse = {
  users: User[]
}
export const getAttendees = (params: GetAttendeesParams) =>
  callFirebaseFunction<GetAttendeesParams, GetAttendeesResponse>(
    'getAttendees',
    params
  )

type GetClassTeachersParams = {
  classId: string
}
type GetClassTeachersResponse = {
  users: User[]
}
export const getClassTeachers = (params: GetClassTeachersParams) =>
  callFirebaseFunction<GetClassTeachersParams, GetClassTeachersResponse>(
    'getGroupClassTeachers',
    params
  )

export type StartReaderTransactionParams = {
  readerId: string
  total: number
  cartItems: {
    amount: number
    description: string
    quantity: number
  }[]
  tax?: number
}
type StartReaderTransactionResponse = {
  reader: any
}
export const startReaderTransaction = (params: StartReaderTransactionParams) =>
  callFirebaseFunction<
    StartReaderTransactionParams,
    StartReaderTransactionResponse
  >('startReaderTransaction', params)

export type ProcessReaderPaymentRequest = {
  readerId: string
  amount: number
  description?: string
}
type ProcessReaderPaymentResponse = {
  reader: any
}
export const processReaderPayment = (params: ProcessReaderPaymentRequest) =>
  callFirebaseFunction<
    ProcessReaderPaymentRequest,
    ProcessReaderPaymentResponse
  >('processReaderPayment', params)

type CancelReaderRequest = {
  readerId: string
}
type CancelReaderResponse = {
  reader: any
}
export const cancelReaderTransaction = (params: CancelReaderRequest) =>
  callFirebaseFunction<CancelReaderRequest, CancelReaderResponse>(
    'cancelReaderTransaction',
    params
  )
