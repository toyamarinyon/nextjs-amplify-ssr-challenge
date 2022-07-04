import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  try {
    Auth.signOut();
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
      props: {
        username: "",
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

export function Page() {
  return <div></div>;
}

export default Page;
