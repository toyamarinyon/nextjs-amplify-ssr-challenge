import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { withSSRContext } from "aws-amplify";
import Link from "next/link";

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
