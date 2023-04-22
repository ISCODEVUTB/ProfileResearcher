import Head from "next/head";
import ResearcherProfile from "./_ResearcherProfile";

export default function Home() {
  return (
    <>
      <Head>
        <title>Researcher Profile</title>
        <meta name="description" content="Researcher Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <ResearcherProfile />
      </main>
    </>
  );
}
