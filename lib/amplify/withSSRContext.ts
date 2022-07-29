import { Auth } from "@aws-amplify/auth";
import {
  Amplify,
  AmplifyClass,
  Credentials,
  UniversalStorage,
} from "@aws-amplify/core";

type Context = any;

/**
 * SSR時に Amplify の認証情報を取得するための関数
 *
 * aws-amplify パッケージの実装を元に必要なものだけを抽出している
 * @link https://github.com/aws-amplify/amplify-js/blob/e56aba642acc7eb3482f0e69454a530409d1b3ac/packages/aws-amplify/src/withSSRContext.ts#L24
 * @param context
 * @returns
 */
export function withSSRContext(context: Context) {
  const { req } = context;
  const previousConfig = Amplify.configure();
  const amplify = new AmplifyClass();
  const storage = new UniversalStorage({ req });

  // @ts-ignore This expression is not constructable.
  // Type 'Function' has no construct signatures.ts(2351)
  amplify.register(new Auth.constructor());
  // @ts-ignore This expression is not constructable.
  // Type 'Function' has no construct signatures.ts(2351)
  amplify.register(new Credentials.constructor());

  // Configure new Amplify instances with previous configuration
  amplify.configure({ ...previousConfig, storage });

  return amplify;
}
