import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import dynamic from "next/dynamic";
import Link from "next/link";
const ForceGraph = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

const Home: NextPage = () => {
  const graphRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement | null>(
    null
  );

  const [firstActor, setFirstActor] = useState("");
  const [secondActor, setSecondActor] = useState("");

  const [graphWidth, setGraphWidth] = useState<number | undefined>(0);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    document.body.className = "h-full";
    document.documentElement.className = "h-full bg-white";
    setGraphWidth(graphRef?.current?.offsetWidth);
    if (data.nodes) return;
    fetch("http://localhost:3001/api/names/graph2")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [data]);

  if (!(data && data.nodes && data.links)) return <> </>;

  const animatedComponents = makeAnimated();

  const getActors = async (query: string) => {
    const res = await fetch(`http://localhost:3001/api/names?search=${query}`);
    return await res.json();
  };
  return (
    <>
      <Head>
        <title>Actor Search</title>
      </Head>
      <div className="min-h-screen flex max-w-full overflow-hidden">
        <div
          className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gradient-to-br
        from-[#00ded3] to-[#891de0]"
        >
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Actors Degree&apos;s of Seperation
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Actor 1
                    </label>
                    <div className="mt-1">
                      <AsyncSelect
                        id="actor-one-select"
                        instanceId="actor-one-select"
                        cacheOptions
                        defaultOptions
                        components={animatedComponents}
                        loadOptions={getActors}
                        onChange={(newValue: any) =>
                          setFirstActor(newValue.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Actor 2
                    </label>
                    <div className="mt-1">
                      <AsyncSelect
                        id="actor-two-select"
                        instanceId="actor-two-select"
                        cacheOptions
                        defaultOptions
                        components={animatedComponents}
                        loadOptions={getActors}
                        onChange={(newValue: any) => {
                          setSecondActor(newValue.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Link
                      href={{
                        pathname: "/result",
                        query: {
                          firstActor: firstActor,
                          secondActor: secondActor,
                        },
                      }}
                    >
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Find Path
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div ref={graphRef} className="hidden lg:block relative w-full">
          <div className="absolute inset-0 h-full w-full">
            {graphWidth && (
              <ForceGraph
                width={graphWidth}
                graphData={data}
                backgroundColor={"black"}
                nodeAutoColorBy={"name"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
