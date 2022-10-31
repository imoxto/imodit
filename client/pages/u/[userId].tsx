import { useRouter } from "next/router";
import CircularIndeterminate from "../../components/Loading";
import { RowStack } from "../../components/RowStack";
import { UserDetailsPage } from "../../components/UserDetailsPage";
import { client } from "../../utils/config";
import { useFindOneUserQuery } from "../../utils/generates";

export default function UserPage() {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { data, isLoading } = useFindOneUserQuery(client, { userId: userId });

  return (
    <RowStack>
      {isLoading && <CircularIndeterminate />}
      {data?.findOneUser && <UserDetailsPage user={data.findOneUser} />}
    </RowStack>
  );
}
