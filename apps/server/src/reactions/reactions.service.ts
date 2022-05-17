import { Injectable } from '@nestjs/common';
import { Prisma, Reaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async reaction(id: number): Promise<Reaction | null> {
    return this.prisma.reaction.findUnique({
      where: {
        id,
      },
    });
  }

  async reactions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReactionWhereUniqueInput;
    where?: Prisma.ReactionWhereInput;
    orderBy?: Prisma.ReactionOrderByWithRelationInput;
  }): Promise<Reaction[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.reaction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  //   async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //     return this.prisma.user.create({
  //       data,
  //     });
  //   }

  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }): Promise<User> {
  //     const { where, data } = params;
  //     return this.prisma.user.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //     return this.prisma.user.delete({
  //       where,
  //     });
  //   }
}
