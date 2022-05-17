// @ts-ignore
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const reactions: Prisma.ReactionCreateInput[] = [
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-2/sticker_1.webp?3e0ee81f5655e415b363c2ab3d4ee4ea&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-2/sticker_2.webp?3e0ee81f5655e415b363c2ab3d4ee4ea&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-2/sticker_3.webp?3e0ee81f5655e415b363c2ab3d4ee4ea&d=200x200',
  },
];

const situations: Prisma.SituationCreateInput[] = [
  {
    value: 'When you match with your therapist on Tinder',
  },
  {
    value: 'When u realize that song u always skip is actually fire',
  },
];
async function main() {
  await prisma.situation.deleteMany();
  await prisma.reaction.deleteMany();

  console.log('Seeding...');

  const resS = await prisma.situation.createMany({
    data: situations,
  });

  const resR = await prisma.reaction.createMany({
    data: reactions,
  });

  console.log({ resS, resR });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
