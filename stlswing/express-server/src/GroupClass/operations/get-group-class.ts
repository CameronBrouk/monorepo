import { prisma } from '../../index.js'

export const eagerGetGroupClass = async (id: number) => {
  const groupClassResponse = await prisma.groupClass.findFirstOrThrow({
    where: { id },
    include: {
      danceMoves: {
        include: { danceMove: true }
      },
      teachers: { include: { teacher: true } },
      createdBy: true,
      updatedBy: true,
      attendees: true,
      product: {
        include: {
          orders: {
            include: {
              ticket: true,
              user: true
            }
          }
        }
      },
      _count: true
    }
  })

  const { teachers, ...analytics } = groupClassResponse

  return {
    ...analytics,
    teachers: teachers.map(({ teacher }) => teacher)
  }
}

export const lazyGetGroupClass = async (id: number) => {
  const { teachers, ...groupClass } = await prisma.groupClass.findFirstOrThrow({
    where: { id },
    include: {
      teachers: { include: { teacher: true } },
      danceMoves: {
        include: {
          danceMove: true
        }
      }
    }
  })
  return {
    ...groupClass,
    teachers: teachers.map(({ teacher }) => teacher)
  }
}
