import { Visibility } from "@prisma/client";
import { Resolver, Query, Ctx, Arg, Mutation, InputType, Field } from "type-graphql";
import { authenticate, authenticateWithPost, notAuthenticatedErr, notAuthorizedErr } from "../utils";

import { DeleteResponse, Post, PostResponse } from "../entities";
import { Context } from "../types";

@InputType()
class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Visibility, { nullable: true })
  visibility?: Visibility;
}

@InputType()
class UpdatePostInput {
  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  content!: string;

  @Field({ nullable: true })
  visibility!: Visibility;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  findAllPosts(@Ctx() { prisma }: Context) {
    return prisma.post.findMany({
      where: { visibility: "public" },
      include: {
        author: true,
      },
    });
  }

  @Query(() => Post, {nullable: true})
  findOnePost(@Ctx() { prisma }: Context, @Arg("id") id: string) {
    return prisma.post.findFirst({
      where: { id, visibility: "public" },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  @Mutation(() => PostResponse)
  async updatePost(@Ctx() context: Context, @Arg("UpdatePostInput") input: UpdatePostInput, @Arg("postId") id: string) {
    try {
      const postToUpdate = await authenticateWithPost(context, id);
      const post = await context.prisma.post.update({
        data: {
          ...input,
        },
        where: { id: postToUpdate.id },
        include: { author: true, comments: true },
      });
      return { post };
    } catch (err) {
      return notAuthorizedErr(context.res);
    }
  }

  @Mutation(() => DeleteResponse)
  async deletePost(@Ctx() context: Context, @Arg("postId") id: string) {
    try {
      const postToDelete = await authenticateWithPost(context, id);

      const post = await context.prisma.post.delete({
        where: { id: postToDelete.id },
      });
      return { id: post.id };
    } catch (err) {
      return notAuthorizedErr(context.res);
    }
  }

  @Mutation(() => PostResponse)
  async createPost(@Ctx() context: Context, @Arg("CreatePostInput") input: CreatePostInput) {
    try {
      const user = await authenticate(context);
      const post = await context.prisma.post.create({
        data: {
          ...input,
          authorId: user!.id,
        },
        include: { author: true, comments: true },
      });
      return { post };
    } catch (err) {
      return notAuthenticatedErr(context.res);
    }
  }
}
