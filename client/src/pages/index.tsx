import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { CreatePostForm } from "../components/post/PostForm";
import CircularIndeterminate from "../components/Loading";
import { PostList } from "../components/post/PostList";
import { client } from "../utils/config";
import { useFindAllPostsQuery } from "../utils/generates";

const Home: NextPage = () => {
  const { data, isLoading } = useFindAllPostsQuery(client);
  const posts = data?.findAllPosts ?? [];
  return (
    <Stack>
      <CreatePostForm />
      {isLoading ? <CircularIndeterminate /> : <PostList posts={posts} />}
    </Stack>
  );
};

export default Home;
