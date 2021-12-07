import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const { token } = router.query;

  return <div>Forget Password: {token}</div>;
};
