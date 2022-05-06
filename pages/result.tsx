import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Result: NextPage = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>Results</title>
      </Head>
      <div className="flex">
        {data.map((actor: any) => {
          if (!actor.movie_id) return actor.name;
          return <div key={actor.name}> {actor.name} -&gt;&nbsp; </div>;
        })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  const uri = `http://localhost:3001/api/path?firstActor=${encodeURIComponent(
    query.firstActor as string
  )}&secondActor=${encodeURIComponent(query.secondActor as string)}`;

  console.log(uri);
  const res = await fetch(uri);

  const data = await res.json();
  console.log(data);
  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Result;
