import { ResponsiveIconButton } from "./Buttons";
import { RowStack } from "./RowStack";
import TwitterIcon from "@mui/icons-material/Twitter";

function getTwitterOauthUrl() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options = {
    redirect_uri: "http://www.localhost:3001/oauth/twitter", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: "T1dLaHdFSWVfTnEtQ2psZThTbnI6MTpjaQ",
    state: "state",
    response_type: "code",
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

export function OAuthBar() {
  return (
    <RowStack spacing={1}>
      <ResponsiveIconButton href={getTwitterOauthUrl()} icon={<TwitterIcon />} label="Twitter" />
    </RowStack>
  );
}
