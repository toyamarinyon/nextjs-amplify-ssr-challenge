import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { withSSRContext } from "../lib/amplify/withSSRContext";
import Link from "next/link";
import { Amplify } from "@aws-amplify/core";
import awsconfig from "../src/aws-exports";

export const getServerSideProps: GetServerSideProps<{
  username: string;
}> = async (context) => {
  Amplify.configure({ ...awsconfig, ssr: true });

  const { Auth } = withSSRContext({ req: context.req });
  try {
    await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();
    const username = user.username as string;
    return {
      props: {
        username,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
      props: {
        username: "",
      },
    };
  }
};

export function Page({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <h1>Hello {username}</h1>
      <Link href="/sign-out">
        <a>Sign out</a>
      </Link>
    </main>
  );
}

export default Page;
