import { History, useFirestore } from '../firestore'

// prettier-ignore
export type Operations = 'CREATE' | 'UPDATE' | 'HARD DELETE' | 'SOFT DELETE' | 'ERROR'

export function useRevert() {
  // const { user } = useContext(CurrentUserContext)
  // const { apiState } = useContext(FirestoreContext)
  // const eventService = useFirestore('events')
  const groupClassService = useFirestore('groupClasses')
  // const assetAssociationsService = useFirestore('assetAssociations')
  // const assetsService = useFirestore('assets')
  // const costsService = useFirestore('costs')
  const usersService = useFirestore('users')
  // const ordersService = useFirestore('orders')
  // const privateLessonsService = useFirestore('privateLessons')
  // const projectionsService = useFirestore('projections')
  const permissionsService = useFirestore('permissions')
  // const faqService = useFirestore('faq')
  // const changelogService = useFirestore('changelog')
  // const transactionsService = useFirestore('changelog')

  // const serviceMap = fromPairs(
  //   keys(apiState).map((key: CollectionNames) => [key, useFirestore(key)]),
  // )

  const serviceMap = {
    // changelog: changelogService,
    // events: eventService,
    // assetAssociations: assetAssociationsService,
    // assets: assetsService,
    groupClasses: groupClassService,
    // costs: costsService,
    users: usersService,
    // orders: ordersService,
    // privateLessons: privateLessonsService,
    permissions: permissionsService
    // projections: projectionsService,
    // faq: faqService,
    // transactions: transactionsService,
  }
  type Collections = keyof typeof serviceMap

  const revertSoftDelete = (collection: Collections, object: any) =>
    serviceMap[collection].update(object.id, { ...object, deleted: false })

  const revertHardDelete = (collection: Collections, object: any) =>
    serviceMap[collection].create(object.id, object)

  const revertCreate = (collection: Collections, object: any) =>
    serviceMap[collection].hardDelete(object.id)

  const revertUpdate = (collection: Collections, object: any) =>
    serviceMap[collection].update(object.id, object)

  const revert = ({
    operation,
    collection,
    previousState,
    metadata
  }: History) => {
    if (operation === 'SOFT DELETE')
      return revertSoftDelete(collection, { deleted: false })

    if (operation === 'HARD DELETE')
      return revertHardDelete(collection, previousState)

    if (operation === 'CREATE')
      // @ts-ignore
      return revertCreate(metadata.id)

    if (operation === 'UPDATE') return revertUpdate(collection, previousState)

    return serviceMap[collection].update(previousState.id, previousState)
  }

  return revert
}
