import { Resolver, Query, Ctx, Arg, Mutation, InputType, Field } from "type-graphql";
import { authenticate, authenticateWithComment, notAuthenticatedErr, notAuthorizedErr } from "../utils";

import { Comment, CommentResponse, DeleteResponse } from "../entities";
import { Context } from "../types";

@InputType()
class CreateCommentInput {
  @Field()
  postId!: string;

  @Field()
  content!: string;
}

@InputType()
class UpdateCommentInput {
  @Field()
  content!: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  findAllComments(@Ctx() { prisma }: Context) {
    return prisma.comment.findMany({});
  }

  @Query(() => Comment)
  findOneComment(@Ctx() { prisma }: Context, @Arg("id") id: string) {
    return prisma.comment.findFirst({ where: { id } });
  }

  @Mutation(() => CommentResponse)
  async updateComment(
    @Ctx() context: Context,
    @Arg("UpdateCommentInput") input: UpdateCommentInput,
    @Arg("CommentId") id: string
  ) {
    try {
      const commentToUpdate = await authenticateWithComment(context, id);
      const comment = await context.prisma.comment.update({
        data: {
          ...input,
        },
        where: { id: commentToUpdate.id },
        include: { author: true, post: true },
      });
      return { comment };
    } catch (err) {
      return notAuthorizedErr(context.res);
    }
  }

  @Mutation(() => DeleteResponse)
  async deleteComment(@Ctx() context: Context, @Arg("CommentId") id: string) {
    try {
      const commentToUpdate = await authenticateWithComment(context, id);
      const comment = await context.prisma.comment.delete({
        where: { id: commentToUpdate.id },
      });
      return { id: comment.id };
    } catch (err) {
      return notAuthorizedErr(context.res);
    }
  }

  @Mutation(() => CommentResponse)
  async createComment(
    @Ctx() context: Context,
    @Arg("CreateCommentInput") input: CreateCommentInput
  ) {
    try {
      const user = await authenticate(context);
      const comment = await context.prisma.comment.create({
        data: {
          ...input,
          authorId: user!.id,
        },
        include: { author: true, post: true },
      });
      return { comment };
    } catch (err) {
      return notAuthenticatedErr(context.res);
    }
  }
}
