import { getTestClient } from '../../../../utils/getTestClient'

test('aggregations', async () => {
  const PrismaClient = await getTestClient()
  const prisma = new PrismaClient()
  const result = await prisma.user.aggregate({
    where: {
      age: {
        gt: -1,
      },
    },
    skip: 0,
    take: 10000,
    avg: {
      age: true,
    },
    count: true,
    max: {
      age: true,
    },
    min: {
      age: true,
    },
    sum: {
      age: true,
    },
  })

  expect(result).toMatchObject({
    count: 10,
    avg: { age: 80 },
    max: { age: 163 },
    min: { age: 5 },
    sum: { age: 800 },
  })

  prisma.$disconnect()
})
