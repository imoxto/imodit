import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import CircularIndeterminate from "../../components/Loading";
import { PostDetails } from "../../components/post/PostDetails";
import { RowStack } from "../../components/RowStack";
import { client } from "../../utils/config";
import { useFindOnePostQuery } from "../../utils/generates";

export default function PostPage() {
  const router = useRouter();
  const postId = router.query.postId as string;
  const { data, isLoading } = useFindOnePostQuery(client, { postId });

  return (
    <Stack alignItems="center" justifyContent="center">
      <RowStack>
        {isLoading && <CircularIndeterminate />}
        {data?.findOnePost && <PostDetails post={data.findOnePost} />}
      </RowStack>
    </Stack>
  );
}
