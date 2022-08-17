import { httpsCallable, getFunctions } from 'firebase/functions'
import { prop } from 'ramda'
import { toast } from 'react-toastify'
import { firebaseApp } from '../../../firebaseConfig'

type Request = {
  to: string[] // can take emails OR UIDS
  bcc?: string[] // can take emails OR UIds
  cc?: string[] // can take emails OR UIds
  subject: string
  text: string
  // This is the html part that uses handlebar templates
  html?: string // uses handlebar templates
}

type Response = {}

export const sendEmails = async (params: Request) =>
  await httpsCallable<Request, Response>(
    getFunctions(firebaseApp),
    'sendEmails'
  )(params)
    .then(prop('data'))
    .catch((err) => toast.error(err))
