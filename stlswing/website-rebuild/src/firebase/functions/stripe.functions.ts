import { prop } from 'ramda'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { firebaseApp } from '../../firebaseConfig'

type CreateCheckoutSessionParams = {
  productId: string
  successUrl: string
  cancelUrl: string
  customerId: string
  customerEmail: string
  metadata: PaymentMetadata
  isStudent?: boolean
}
type CreateCheckoutSessionResponse = {
  url: string
  id: string
}

type CreatePortalSessonResponse = {
  id: string
  object: string
  configuration: string
  created: number
  customer: string
  livemode: boolean
  locale?: any
  on_behalf_of?: any
  return_url: string
  url: string
}

type CreatePortalSessionRequest = {
  customer: string
  return_url: string
}

export const paymentTypes = [
  'A La Carte',
  'First Half Of Class',
  'Full Class',
  'Discounted Class',
  'Single Class',
  'Remaining Classes',
  'Second Half Of Class',
  'Monthly Event',
  'Weekly Event',
  'Membership',
  'Member Signup',
  'Volunteer',
  'Teacher Added',
  'Single Photo',
  'Bulk Private Lesson',
  'Single Private Lesson'
] as const

export type PaymentType = typeof paymentTypes[number]

export type ProductType =
  | 'groupClasses'
  | 'events'
  | 'privateLessons'
  | 'assets'
export type PaymentMetadata = {
  credits: number
  stripePriceId: string
  quantity: number
  internalProductId: string
  internalUserId: string
  internalProductUrl: string
  internalProductType: ProductType
  internalPaymentType: PaymentType
  date: string
}

export const createPortalSession = async (params: CreatePortalSessionRequest) =>
  await httpsCallable<CreatePortalSessionRequest, CreatePortalSessonResponse>(
    getFunctions(firebaseApp),
    'createPortalSession'
  )(params).then(prop('data'))

export const createCheckoutSession = async (
  params: CreateCheckoutSessionParams
) =>
  await httpsCallable<
    CreateCheckoutSessionParams,
    CreateCheckoutSessionResponse
  >(
    getFunctions(firebaseApp),
    'createCheckoutSession'
  )(params).then(prop('data'))
