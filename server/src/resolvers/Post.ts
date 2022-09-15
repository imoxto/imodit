import { Resolver, Query, Ctx, Arg } from "type-graphql";

import { Post } from "../entities";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  findAllPosts(@Ctx() { prisma }: Context) {
    return prisma.post.findMany({
      where: { visibility: "public" },
    });
  }

  @Query(() => Post)
  findOnePost(@Ctx() { prisma }: Context, @Arg("id") id: number) {
    return prisma.post.findFirst({ where: { id, visibility: "public" } });
  }
}
