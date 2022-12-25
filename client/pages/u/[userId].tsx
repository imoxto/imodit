import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import CircularIndeterminate from "../../components/Loading";
import { RowStack } from "../../components/RowStack";
import { UserDetails } from "../../components/UserDetails";
import { client } from "../../utils/config";
import { useFindOneUserQuery } from "../../utils/generates";

export default function UserPage() {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { data, isLoading } = useFindOneUserQuery(client, { userId });

  return (
    <Stack alignItems="center" justifyContent="center">
      <RowStack>
        {isLoading && <CircularIndeterminate />}
        {data?.findOneUser && <UserDetails user={data.findOneUser} />}
      </RowStack>
    </Stack>
  );
}
