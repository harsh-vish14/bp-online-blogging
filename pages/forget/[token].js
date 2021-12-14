import { useRouter } from "next/router";
import { Forget } from "../../components/forget/forgetWithToken.componet";

export default () => {
  const router = useRouter();
  const { token } = router.query;

  return <Forget />;
};
