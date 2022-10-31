import { Stack } from "@mui/material";
import type { NextPage } from "next";
import { PostForm } from "../components/form/PostForm";
import CircularIndeterminate from "../components/Loading";
import { PostList } from "../components/PostList";
import { client } from "../utils/config";
import { useFindAllPostsQuery } from "../utils/generates";

const Home: NextPage = () => {
  const { data, isLoading } = useFindAllPostsQuery(client);
  const posts = data?.findAllPosts ?? [];
  return (
    <Stack>
      <PostForm />
      {isLoading ? <CircularIndeterminate /> : <PostList posts={posts} />}
    </Stack>
  );
};

export default Home;
