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
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_1.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_2.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_3.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_4.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_5.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_6.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_7.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_8.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_9.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_10.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_11.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_12.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_13.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_14.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_15.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_16.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_17.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_18.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_19.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_20.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_21.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_22.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_23.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_24.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_25.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_26.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_27.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_28.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_29.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
  {
    url: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/meme-pack-1/sticker_30.png?363e7ee56d4d8ad53813dae0907ef4c0&d=200x200',
  },
];

const situations: Prisma.SituationCreateInput[] = [
  {
    value: 'When you match with your therapist on Tinder',
  },
  {
    value: 'When u realize that song u always skip is actually fire',
  },
  {
    value: 'Situation 1',
  },
  {
    value: 'Situation 2',
  },
  {
    value: 'Situation 3',
  },
  {
    value: 'Situation 4',
  },
  {
    value: 'Situation 5',
  },
  {
    value: 'Situation 6',
  },
  {
    value: 'Situation 7',
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
