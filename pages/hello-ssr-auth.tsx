import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Amplify, withSSRContext } from "aws-amplify";

import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps<{
  username: string;
}> = async (context) => {
  const { Auth } = withSSRContext(context);
  try {
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
        destination: "/hello-auth",
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
    </main>
  );
}

export default Page;
