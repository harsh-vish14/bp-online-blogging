import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const { token } = router.query;

  return <div>Reset Password: {token}</div>;
};
