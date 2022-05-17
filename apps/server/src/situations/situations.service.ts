import { Injectable } from '@nestjs/common';
// @ts-ignore
import { Prisma, Situation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SituationsService {
  constructor(private prisma: PrismaService) {}

  async situation(id: number): Promise<Situation | null> {
    return this.prisma.situation.findUnique({
      where: {
        id,
      },
    });
  }

  async situations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SituationWhereUniqueInput;
    where?: Prisma.SituationWhereInput;
    orderBy?: Prisma.SituationOrderByWithRelationInput;
  }): Promise<Situation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.situation.findMany({
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
