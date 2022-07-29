import { Auth } from "@aws-amplify/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { isErrorWithMessage } from "../src/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <main>
      {error && <p>{error}</p>}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await Auth.signIn(email, password);
            router.push("/");
          } catch (e) {
            if (isErrorWithMessage(e)) {
              setError(e.message);
            } else {
              setError("Unknown error");
            }
          }
        }}
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
