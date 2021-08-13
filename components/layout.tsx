import Head from "next/head";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Head>
        <title>Datsun 240z</title>
        <meta name="description" content="the history of the Datsun 240z" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header></header>
      {children}
      <footer></footer>
    </div>
  );
};

export default Layout;
